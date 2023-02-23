import { createSlice } from "@reduxjs/toolkit"
import { getfollowUser, getunfollowUser, getUserDetails, logout } from "./UserAction";



const initialState = {
    user:[],
    isError:false,
    isLoading:false,
    isSuccess:true,
    message:"",
    userProfile:[]
}
export const userSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(logout.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(logout.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError=false;
            state.isSuccess=true;
            state.user = action.payload
            state.message= action.payload.msg
       })
        .addCase(logout.rejected,(state,action)=>{
     
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message='error'
        })
        //get user details
        .addCase(getUserDetails.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getUserDetails.fulfilled,(state,action)=>{
            // console.log("actn",action);
            state.isLoading = false;
            state.isError=false;
            state.isSuccess=true;
            state.userProfile = action.payload
            state.message= "Success"
       })
        .addCase(getUserDetails.rejected,(state,action)=>{
     
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message='error'
        })
        //followuser
        .addCase(getfollowUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getfollowUser.fulfilled,(state,action)=>{
            console.log("actn",action);
            state.isLoading = false;
            state.isError=false;
            state.isSuccess=true;
            state.userProfile = action.payload;
            // state.userPosts = action.payload.posts
            state.message= "Success"
       })
        .addCase(getfollowUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message='error'
        })
        //unfollow
        .addCase(getunfollowUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getunfollowUser.fulfilled,(state,action)=>{
            console.log("actn",action);
            state.isLoading = false;
            state.isError=false;
            state.isSuccess=true;
            state.userProfile = action.payload;
            // state.userPosts = action.payload.posts
            state.message= "Success"
       })
        .addCase(getunfollowUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message='error'
        })
       
    }
})

export default userSlice.reducer