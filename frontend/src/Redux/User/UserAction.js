import { UserService } from "./UserService"
import { createAsyncThunk } from "@reduxjs/toolkit";



//logout
export const logout = createAsyncThunk("user/logout",
async(thunkAPI)=>{
    try {
        return UserService.logout()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
//getUserDetails
export const getUserDetails = createAsyncThunk("user/getuserDetails",
async(userId,thunkAPI)=>{
    try {
        return UserService.getUserDetails(userId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getfollowUser = createAsyncThunk("user/getfollowuser",
async(userId,thunkAPI)=>{
    try {
        return UserService.getFollowUser(userId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getunfollowUser = createAsyncThunk("user/getunfollowuser",
async(userId,thunkAPI)=>{
    try {
        return UserService.getUnFollowUser(userId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
//getsuggestionusers
export const getSuggestions = createAsyncThunk("user/getSuggestions",
async(thunkAPI)=>{
    try {
        return UserService.getSuggestions()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
//searchUser
export const searchUser = createAsyncThunk("user/searchUser",
async(query,thunkAPI)=>{
    try {
        return UserService.searchUser(query)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})