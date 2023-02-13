const Post = require("../models/posts")



exports.createPost = async(req,res)=>{
    const {title,body,pic} = req.body
    if(!title || !body || !pic){
        return res.status(400).json({msg:"Please add all fields"})
    }
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy:req.user
    })
    post.save()
    .then(result=>{
        res.json({result,msg:"Created post successfully"})
    })
    .catch(err=>{
        return res.status(500).json({msg:err.message})
    })

}

exports.getAllPosts =async(req,res)=>{
    await Post.find({})
    .populate("postedBy","_id name pic")
    .populate("comments.postedBy","_id name pic")
    .sort("-createdAt")
    .then((posts)=>{
        res.status(200).json({posts})
    })
    .catch(err=>{
        res.status(500).json({msg:err.message})
    })
}


exports.likePost =async(req,res)=>{
    try {
        await Post.findByIdAndUpdate(req.body.postId,{
            $push:{likes:req.user._id}
        },{
            new :true
        })
        .populate("postedBy","_id name pic")
        .populate("comments.postedBy","_id name pic")
        .exec((err,result)=>{
            if(err){
                return res.status(400).json({msg:"This post does not exists",error:err})
            }
            else{
                res.json(result)
            }
        })
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}
exports.unlikePost =async(req,res)=>{
    try {
        await Post.findByIdAndUpdate(req.body.postId,{
            $pull:{likes:req.user._id}
        },{
            new :true
        })
        .populate("postedBy","_id name pic")
        .populate("comments.postedBy","_id name pic")
        .exec((err,result)=>{
            if(err){
                return res.status(400).json({msg:"This post does not exists",error:err})
            }
            else{
                res.json(result)
            }
        })
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}

exports.savePost = async(req,res)=>{

    const saved={
        savedBy: req.user._id,
        profilePic:req.user.pic,
        postId:req.body.postId
    }
    await Post.findByIdAndUpdate(req.body.postId,{
        $push:{ saved:saved}
    },{
        new :true
    })
    .populate("postedBy","_id name pic")
    .populate("comments.postedBy","_id name pic")
    .exec((err,result)=>{
        if(err){
            return res.status(400).json({msg:"This post does not exists",error:err})
        }
        else{
            res.json(result)
        }
    })
}

exports.unSavePost = async(req,res)=>{
    await Post.findByIdAndUpdate(req.body.postId,{
        $pull:{
            saved:{
                savedBy:req.user._id,
                postId:req.body.postId,
                _id:req.body.savedId
            }
        }
    },{new:true})
    .exec((err,result)=>{
        if(err){
            return res.status(400).json({msg:"This post does not exists",error:err})
        }
        else{
            res.json(result)
        }
    })
}