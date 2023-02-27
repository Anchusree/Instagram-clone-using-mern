import { createSlice } from "@reduxjs/toolkit"
import { createComment, createPost, deleteComment, deletePost, getPosts, likePost, savePost, unLikePost, unSavePost } from "./PostAction";
import { DeleteData, EditData } from "./PostFunction";



const initialState = {
    posts:[],
    isError:false,
    isLoading:false,
    isPostSuccess:true,
    message:""
}
export const postSlice = createSlice({
    name:"post",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createPost.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(createPost.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError=false;
            state.isPostSuccess=true;
            state.posts = action.payload.result
            state.message= action.payload.msg
       })
        .addCase(createPost.rejected,(state,action)=>{
            console.log("err", action);
            state.isLoading=false;
            state.isError=true;
            state.isPostSuccess=false;
            state.message='error'
        })
        //getposts
        .addCase(getPosts.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getPosts.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError=false;
            state.isPostSuccess=true;
            state.posts = action.payload.posts
            state.message= "Success"
       })
        .addCase(getPosts.rejected,(state,action)=>{
            console.log("err", action);
            state.isLoading=false;
            state.isError=true;
            state.isPostSuccess=false;
            state.message='error'
        })
        //likepost
        .addCase(likePost.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(likePost.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError=false;
            state.isPostSuccess=true;
            state.posts = EditData(state.posts,action.payload.data._id,action.payload.data)
            state.message= "Success"
       })
        .addCase(likePost.rejected,(state,action)=>{
            console.log("err", action);
            state.isLoading=false;
            state.isError=true;
            state.isPostSuccess=false;
            state.message='error'
        })
        //unlikepost
        .addCase(unLikePost.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(unLikePost.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError=false;
            state.isPostSuccess=true;
            state.posts = EditData(state.posts,action.payload.data._id,action.payload.data)
            state.message= "Success"
       })
        .addCase(unLikePost.rejected,(state,action)=>{
            console.log("err", action);
            state.isLoading=false;
            state.isError=true;
            state.isPostSuccess=false;
            state.message='error'
        })
        //savepost
        .addCase(savePost.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(savePost.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError=false;
            state.isPostSuccess=true;
            state.posts = EditData(state.posts,action.payload.data._id,action.payload.data)
            state.message= "Success"
       })
        .addCase(savePost.rejected,(state,action)=>{
            console.log("err", action);
            state.isLoading=false;
            state.isError=true;
            state.isPostSuccess=false;
            state.message='error'
        })
        //unsavedpost
        .addCase(unSavePost.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(unSavePost.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError=false;
            state.isPostSuccess=true;
            state.posts = EditData(state.posts,action.payload.data._id,action.payload.data)
            state.message= "Success"
       })
        .addCase(unSavePost.rejected,(state,action)=>{
            console.log("err", action);
            state.isLoading=false;
            state.isError=true;
            state.isPostSuccess=false;
            state.message='error'
        })
        //createComment
        .addCase(createComment.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(createComment.fulfilled,(state,action)=>{
            console.log(action);
            state.isLoading = false;
            state.isError=false;
            state.isPostSuccess=true;
            state.posts = EditData(state.posts,action.payload.data._id,action.payload.data)
            state.message= "Success"
       })
        .addCase(createComment.rejected,(state,action)=>{
            console.log("err", action);
            state.isLoading=false;
            state.isError=true;
            state.isPostSuccess=false;
            state.message='error'
        })
        //deleteComment
        .addCase(deleteComment.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteComment.fulfilled,(state,action)=>{
            console.log(action);
            state.isLoading = false;
            state.isError=false;
            state.isPostSuccess=true;
            state.posts = EditData(state.posts,action.payload.data._id,action.payload.data)
            state.message= "Success"
       })
        .addCase(deleteComment.rejected,(state,action)=>{
            console.log("err", action);
            state.isLoading=false;
            state.isError=true;
            state.isPostSuccess=false;
            state.message='error'
        })

        //deletepost
        .addCase(deletePost.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deletePost.fulfilled,(state,action)=>{
            console.log(action);
            state.isLoading = false;
            state.isError=false;
            state.isPostSuccess=true;
            state.posts = DeleteData(state.posts,action.payload.data.result._id)
            state.message= "Success"
       })
        .addCase(deletePost.rejected,(state,action)=>{
            console.log("err", action);
            state.isLoading=false;
            state.isError=true;
            state.isPostSuccess=false;
            state.message='error'
        })

    }
})

export default postSlice.reducer