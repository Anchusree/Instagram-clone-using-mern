
import {configureStore} from '@reduxjs/toolkit'
import authReducer from './Auth/AuthSlice'
import postReducer from './Post/PostSlice'

export const store =configureStore({
    reducer:{
        auth:authReducer,
        post:postReducer
    },

    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false
        })
    
})