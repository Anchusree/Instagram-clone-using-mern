
import axios from 'axios'
import { baseUrl, config } from '../../Utils/Utils'

const createPost = async(postdata)=>{
    const response = await axios.post(`${baseUrl}/createpost`,{
        title:postdata.title,
        body:postdata.body,
        pic:postdata.pic
    },config)
    // console.log(response);
    return response.data
}

const getPosts = async()=>{
    const response = await axios.get(`${baseUrl}/allpost`,config)
    // console.log(response);
    return response.data
}
const likePost = async(postId)=>{
    const response = await axios.put(`${baseUrl}/like`,{postId:postId},config)
    console.log(response);
    return response
}
const unLikePost = async(postId)=>{
    const response = await axios.put(`${baseUrl}/unlike`,{postId:postId},config)
    console.log(response);
    return response
}
const savePost = async(post)=>{
    const response = await axios.put(`${baseUrl}/saved`,
    {postId:post._id,
    profilepic:post.postedBy.pic
    }
    ,config)
    //console.log(response);
    return response
}

const unSavePost = async(post)=>{

    const savedPost = post.saved.find(save=>{return save.postId === post._id})
    const response = await axios.put(`${baseUrl}/unsaved`,
    {
        postId:post._id,
        savedId:savedPost._id
    }
    ,config)
    console.log(response);
    return response
}

const createComment = async(comment)=>{
    const response = await axios.put(`${baseUrl}/createComment`,{text:comment.text, postId:comment.postId},config)
    //console.log(response);
    return response
}
//deleteComment
const deleteComment=async(comment)=>{
    const response = await axios.put(`${baseUrl}/deleteComment`,{
        commentText:comment.record.text, 
        postId:comment.postId,
        commentPostedBy:comment.record.postedBy._id,
        commentId:comment.record._id
    },config)
    //console.log(response);
    return response
}

//deletepost
const deletePost = async(postId)=>{
    const response = await axios.delete(`${baseUrl}/deletepost/${postId}`,config)
    console.log(response);
    return response
}

export const PostService = {
    createPost,
    getPosts,
    likePost,
    unLikePost,
    savePost,
    unSavePost,
    createComment,
    deleteComment,
    deletePost
}