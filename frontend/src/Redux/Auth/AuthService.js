
import axios from 'axios'
import { baseUrl } from '../../Utils/Utils'

const register = async(user)=>{
    const response = await axios.post(`${baseUrl}/signup`,user)
    return response.data
}

const login =async(user)=>{
    const response = await axios.post(`${baseUrl}/signin`,user)
    //if logined, we need to store the token and user in local storage
    if(response.data){
        await localStorage.setItem("token",JSON.stringify(response.data.access_token))
        await localStorage.setItem("user",JSON.stringify(response.data.user))
        
    }
    return response.data
}
const resetnewPassword =async(email)=>{
    const response = await axios.post(`${baseUrl}/reset-passsword`,{email});
    return response.data
}
const newPassword =async(tokenData)=>{
    const response = await axios.post(`${baseUrl}/new-password`,{password:tokenData.password, token:tokenData.token});
    return response.data
}


export const AuthService = {
    register,
    login,
    resetnewPassword,
    newPassword
}