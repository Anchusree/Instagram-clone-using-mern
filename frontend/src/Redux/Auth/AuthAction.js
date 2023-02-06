import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "./AuthService";



export const register = createAsyncThunk("auth/signup",
async(userData,thunkAPI)=>{
    try {
        return AuthService.register(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const login = createAsyncThunk("auth/signin",
async(userData,thunkAPI)=>{
    try {
        return AuthService.login(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const resetnewPassword = createAsyncThunk("auth/reset-password",
async(email,thunkAPI)=>{
    try {
        return AuthService.resetnewPassword(email)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const newPassword = createAsyncThunk("auth/new-password",
async(tokenData,thunkAPI)=>{
    try {
        return AuthService.newPassword(tokenData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})