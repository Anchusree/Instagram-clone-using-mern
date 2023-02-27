import { PostService } from "./PostService"
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createPost = createAsyncThunk("post/createpost",
async(postdata,thunkAPI)=>{
    try {
        return PostService.createPost(postdata)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
//getPosts
export const getPosts = createAsyncThunk("post/getPosts",
async(thunkAPI)=>{
    try {
        return PostService.getPosts()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
//likePost
export const likePost = createAsyncThunk("post/likePost",
async(postId,thunkAPI)=>{
    try {
        return PostService.likePost(postId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
//unLikePost
export const unLikePost = createAsyncThunk("post/unLikePost",
async(postId,thunkAPI)=>{
    try {
        return PostService.unLikePost(postId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
//savePost
export const savePost = createAsyncThunk("post/savePost",
async(post,thunkAPI)=>{
    try {
        return PostService.savePost(post)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
//unSavePost
export const unSavePost = createAsyncThunk("post/unSavePost",
async(post,thunkAPI)=>{
    try {
        return PostService.unSavePost(post)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
//createComment
export const createComment = createAsyncThunk("post/createComment",
async(comment,thunkAPI)=>{
    try {
        return PostService.createComment(comment)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
//deleteComment
export const deleteComment = createAsyncThunk("post/deleteComment",
async(comment,thunkAPI)=>{
    try {
        return PostService.deleteComment(comment)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

//deletePost
export const deletePost = createAsyncThunk("post/deletePost",
async(postId,thunkAPI)=>{
    try {
        return PostService.deletePost(postId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
