
import axios from 'axios'
import { baseUrl, config } from '../../Utils/Utils'

const getProfile = async()=>{
    const response = await axios.get(`${baseUrl}/mypost`,config)
    console.log(response.data);
    return response.data
}
//getSavedPosts
const getSavedPosts = async()=>{
    const response = await axios.get(`${baseUrl}/mySavedPosts`,config)
    console.log(response.data);
    return response.data
}
//updateprofile
const updateUserProfile = async(userData)=>{
    const response = await axios.put(`${baseUrl}/updateProfile`,
    {name:userData.name,password:userData.password,email:userData.email},
    config)
    // console.log(response);
    if(response.data){
        localStorage.setItem("user",JSON.stringify(response.data.result))
    }
    return response.data
}
export const profileService = {
    getProfile,
    getSavedPosts,
    updateUserProfile
   
}