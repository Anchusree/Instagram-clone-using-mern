import { createSlice } from "@reduxjs/toolkit"
import { getExplorePosts } from "./ExploreAction";



const initialState = {
    explorePosts: [],
    isError:false,
    isLoading:false,
    isSucess:'',
    message:""
}
export const exploreSlice = createSlice({
    name:"explore",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getExplorePosts.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getExplorePosts.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError=false;
            state.isSucess = true;
            state.explorePosts = action.payload
            state.message='Success'
       })
        .addCase(getExplorePosts.rejected,(state,action)=>{
            console.log("err", action);
            state.isLoading=false;
            state.isError=true;
            state.isSucess=false;
            state.message='error'
        })
   

    }
})

export default exploreSlice.reducer