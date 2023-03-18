
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ExploreService } from "./ExploreService";


//getExplorePosts
export const getExplorePosts = createAsyncThunk("explore/getExplorePosts",
async(thunkAPI)=>{
    try {
        return ExploreService.getExplorePosts()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


