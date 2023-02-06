import { createSlice } from "@reduxjs/toolkit"
import { getUserfromLocalStorage } from "../../Utils/Utils"
import { login, newPassword, register, resetnewPassword } from "./AuthAction"


const initialState={
    isLoading:false,
    isError: false,
    isRegisterSuccess:false,
    message:'',
    isLoginSuccess:false,
    user:getUserfromLocalStorage,
    isNewPasswordSuccess:false,
    isPasswordSuccess:false,
}

export const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(register.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError=false;
            state.isRegisterSuccess=true;
            state.message = action.payload.msg
        })
        .addCase(register.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isRegisterSuccess=false;
            state.message=''
        })

        //login
        .addCase(login.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(login.fulfilled,(state,action)=>{
            console.log("action",action);
            state.isLoading = false;
            state.isError=false;
            state.isRegisterSuccess=false;
            state.isLoginSuccess = true;
            state.user = action.payload;
            state.message = action.payload.msg
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isRegisterSuccess=false;
            state.isLoginSuccess = false;
            state.message=''
        })
        
        //resetnew-password
        .addCase(resetnewPassword.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(resetnewPassword.fulfilled,(state,action)=>{
            console.log("action",action);
            state.isLoading = false;
            state.isError=false;
            state.isRegisterSuccess=false;
            state.isLoginSuccess = false;
            state.isNewPasswordSuccess = true;
            state.message = action.payload.msg
        })
        .addCase(resetnewPassword.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isRegisterSuccess=false;
            state.isLoginSuccess = false;
            state.isNewPasswordSuccess =false;
            state.message=''
        })

        //newPassword
        .addCase(newPassword.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(newPassword.fulfilled,(state,action)=>{
            console.log("action",action);
            state.isLoading = false;
            state.isError=false;
            state.isRegisterSuccess=false;
            state.isLoginSuccess = false;
            state.isNewPasswordSuccess = false;
            state.isPasswordSuccess = true;
            state.message = action.payload.msg
        })
        .addCase(newPassword.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isRegisterSuccess=false;
            state.isLoginSuccess = false;
            state.isNewPasswordSuccess =false;
            state.isPasswordSuccess = false;
            state.message=''
        })

    }
})

export default authSlice.reducer