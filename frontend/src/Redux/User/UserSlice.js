import { createSlice } from "@reduxjs/toolkit"
import { getfollowUser, getSuggestions, getunfollowUser, getUserDetails, logout, searchUser } from "./UserAction";



const initialState = {
    user:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
    userProfile:[],
    userSuggestion:[],
    isSearchSuccess: "",
    isSuggestionSuccess:false,
    userSearch: [],
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


         //suggestion user
         .addCase(getSuggestions.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getSuggestions.fulfilled,(state,action)=>{
            console.log("actn",action);
            state.isLoading = false;
            state.isError=false;
            state.isSuggestionSuccess=true;
            state.userSuggestion = action.payload.users;
            state.message= "Success"
       })
        .addCase(getSuggestions.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuggestionSuccess=false;
            state.message='error'
        })

        //search user
        .addCase(searchUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(searchUser.fulfilled,(state,action)=>{
            console.log("actn",action);
            state.isLoading = false;
            state.isError=false;
            state.isSearchSuccess=true;
            state.userSearch = action.payload.user;
            state.message= "Success"
       })
        .addCase(searchUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSearchSuccess=false;
            state.message='error'
        })

       
    }
})

export default userSlice.reducer