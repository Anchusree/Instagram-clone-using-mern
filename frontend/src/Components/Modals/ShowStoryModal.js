import axios from 'axios'
import React from 'react'
import Modal from 'react-modal'
import { config } from '../../Utils/Utils'

export default function ShowStoryModal({addStoryModal,setAddStoryModal}) {

    const uploadStory=async(file)=>{
        const data = new FormData()
        await data.append("file",file)
        await data.append("upload_preset","instacone")
        await data.append("cloud_name",process.env.REACT_APP_CLOUDNAME)
        await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`,{
            method:"post", body:data
        })
        .then(res=>res.json())
        .then(async data=>{
            await axios.post('http://localhost:5000/api/addstory',{pic:data.url},config)
            console.log("success")
            await setAddStoryModal(false)

        })
        .catch(err=>{
           console.log(err)
        })

    }
  return (
    <Modal
    isOpen={addStoryModal}
    ariaHideApp={false}
    className="EditModal"
    contentLabel='Create Story'
    >
        <div className='col-12 profileform'>
            <h4>Create a story</h4>
            <br/>
            <div>
                <input type='file' onChange={(e)=>uploadStory(e.target.files[0])}/>
            </div>
        </div>
        <br/>
        <button className='btn btn-primary text-center'
        onClick={()=>setAddStoryModal(false)}
        >Close</button>
      
    </Modal>
  )
}
