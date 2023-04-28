const Post = require('../models/posts')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports.logout = async (req, res) => {

    try {
        res.clearCookie('refreshtoken', { path: '/api/refresh_token' })
        return res.json({ msg: "Logout Successfully" })

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

module.exports.getMyPosts = async (req, res) => {
    Post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .populate("saved", "_id postId")
        .then(mypost => {
            res.json({ mypost: mypost })
        })
        .catch(err => {
            res.status(500).json(({ msg: err.message }))
        })
}
exports.getMySavedPosts = async (req, res) => {

    try {
        Post.find({ "saved.savedBy": req.user._id })
            .then(myposts => {
                res.json({ myposts })
            })
            .catch(err => {
                res.status(400).json(({ msg: "Something went wrong" }))
            })
    } catch (error) {
        res.status(500).json(({ msg: error.message }))
    }
}

exports.updateProfile = async (req, res) => {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 12)
    await User.findOneAndUpdate({ _id: req.user._id }, {
        name, email, password: hashedPassword
    }, { new: true })
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({ msg: err.message })
            }
            else {
                res.json({ msg: "Update Success", result: result })
            }
        })

}

exports.followUser = async (req, res) => {
    console.log(req.body.followId);
    const followersUpdate = await User.findOneAndUpdate({_id:req.body.followId},{
        $push:{followers:req.user._id}
    },{
        new:true
    })
    .then(result=>{return result})

    if(followersUpdate){
       await User.findOneAndUpdate(req.user._id,{
            $push:{following:req.body.followId}
            
        },{new:true})
        .select("-password")
        .exec((err,result)=>{
            if(err){
                res.status(400).json(({ msg: err.message }))
            }
            console.log(result);
            res.json(result)
        })
    }
}

exports.unfollowUser = async (req, res) => {
    console.log(req.body.unfollowId);

    const followingUpdate = await User.findOneAndUpdate({_id:req.body.unfollowId},{
        $pull:{followers:req.user._id}
    },{
        new:true
    })
    .then(result=>{return result})

    if(followingUpdate){
       await User.findOneAndUpdate(req.user._id,{
        $pull:{following:req.body.unfollowId}
            
        },{new:true})
        .select("-password")
        .exec((err,result)=>{
            if(err){
                res.status(400).json(({ msg: err.message }))
            }
            console.log(result);
            res.json(result)
        })
    }
}

exports.getUserDetails = async (req, res) => {
    try {
        await User.findOne({ _id: req.params.id })
            .select("-password")
            .then(user => {
                if (!user) return res.status(400).json({ msg: "User does not exist" })

                Post.find({ postedBy: req.params._id })
                    .populate("postedBy", "_id name")
                    .exec((err, posts) => {
                        if (!posts) {
                            return res.status(400).json({ msg: "Post does not exist" })
                        }
                        res.json({ user, posts })
                    })
            })

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

exports.suggestionUser = async(req,res)=>{
    try {
        const newArr = [...req.user.following, req.user._id]

        const num  = req.query.num || 10

        const users = await User.aggregate([
            { $match: { _id: { $nin: newArr } } },
            { $sample: { size: Number(num) } },
            { $lookup: { from: 'users', localField: 'followers', foreignField: '_id', as: 'followers' } },
            { $lookup: { from: 'users', localField: 'following', foreignField: '_id', as: 'following' } },
        ])
        .project("-password")

        return res.json({
            users,
            result: users.length
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

exports.searchUser=(req,res)=>{
    let userPattern = new RegExp("^"+req.body.query)

    User.find({name:{$regex:userPattern}})
    .select("_id name email pic")
    .then(user=>{
        res.json({user})
    })
    .catch(err=>{
        return res.status(500).json({msg:err.message})
    })
}

exports.addStory = async(req,res)=>{

    User.findByIdAndUpdate(req.user._id,{
        $push:{
            stories:{
                user:req.user._id,
                storyPic:req.body.pic,
                storyDate:new Date()
            }
        }
    },{new:true},
    (err,result)=>{
        if(err){
            return res.status(422).json({msg:err.message})
        }
        res.status(200).json(result)
    }
    )
}

exports.getStory =(req,res)=>{

    User.find({"stories.storyDate":{"$lte": new Date(Date.now() +1*24*60*60*1000)}})//less than 24 hours
    .select("_id name pic stories")
    .then(userStories=>{
        res.status(200).json({userStories:userStories})
    })
    .catch(err=>{
        res.status(400).json({err:err.message})
    })
}