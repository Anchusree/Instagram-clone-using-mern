
import {configureStore} from '@reduxjs/toolkit'
import authReducer from './Auth/AuthSlice'
import postReducer from './Post/PostSlice'
import userReducer from './User/UserSlice'
import profileReducer from './Profile/ProfileSlice'


export const store =configureStore({
    reducer:{
        auth:authReducer,
        post:postReducer,
        user:userReducer,
        profile:profileReducer
    },

    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false
        })
    
})