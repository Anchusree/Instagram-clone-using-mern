
import axios from 'axios'
import { baseUrl, config } from '../../Utils/Utils'

const logout = async()=>{
    const response = await axios.get(`${baseUrl}/logout`,config)
    //to clear the local storage
    localStorage.clear()
    window.href="/"
    return response.data
}

const getUserDetails = async(userId)=>{
    const response = await axios.get(`${baseUrl}/user/${userId}`,config)
    // console.log(response);
    return response.data
}

const getFollowUser = async(userId)=>{
    const response = await axios.put(`${baseUrl}/follow`,{followId:userId},config)
    console.log(response.data);
    if(response.data){
        localStorage.setItem("user",JSON.stringify(response.data))
    }
    const updateuser = getUserDetails(userId)
    console.log(updateuser);
    return updateuser
}
//unfollowuser
const getUnFollowUser = async(userId)=>{
    const response = await axios.put(`${baseUrl}/unfollow`,{unfollowId:userId},config)
    console.log(response.data);
    if(response.data){
        localStorage.setItem("user",JSON.stringify(response.data))
    }
    const updateuser = getUserDetails(userId)
    return updateuser
}

//getsuggestions
const getSuggestions = async()=>{
    const response = await axios.get(`${baseUrl}/suggestionUser`,config)
    // console.log(response);
    return response.data
}

//searchUser
const searchUser = async(query)=>{
    const response = await axios.post(`${baseUrl}/search-user`,{query},config)
    // console.log(response);
    return response.data
}




export const UserService = {
    logout,
    getUserDetails,
    getFollowUser,
    getUnFollowUser,
    getSuggestions,
    searchUser
   
}