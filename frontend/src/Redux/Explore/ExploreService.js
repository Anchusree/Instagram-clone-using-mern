
import axios from 'axios'
import { baseUrl, config } from '../../Utils/Utils';




const getExplorePosts = async()=>{
    const response = await axios.get(`${baseUrl}/explore`,config)
    return response.data
}

export const ExploreService = {
    getExplorePosts
}