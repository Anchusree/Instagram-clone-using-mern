import React, { useState } from 'react'
import { createPost } from '../../Redux/Post/PostAction'
import  {useDispatch, useSelector} from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'

export default function CreatePost() {

    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")

    const postState = useSelector((state)=>state.post)
    const {isError,isPostSuccess,message} = postState
    // console.log(postState);

    const postData=async()=>{

        const data = new FormData()
        await data.append("file",image)
        await data.append("upload_preset","instacone")
        await data.append("cloud_name",process.env.REACT_APP_CLOUDNAME)
        await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/image/upload`,{
            method:"post", body:data
        })
        .then(res=>res.json())
        .then(async data=>{
           
            let postdata = {
                title,
                body,
                pic:data.url
            }

            await dispatch(createPost(postdata))
            if(isPostSuccess){
                setTitle('')
                setBody('')
                setImage('')
                toast.success(message)
            }
        })
        .catch(err=>{
            if(isError){
                toast.error(message)
            }
        })
    }
    return (
        <div className='container postcontainer'>
            <div className='row postform'>
                <div className='col-sm-12 d-flex'>
                    <div className='login-card card-block'>
                        <div className='login-card card-block'>
                            <div className='authbox'>
                                <div className='col-12'>
                                    <ToastContainer/>
                                    <h2 className='text-center'>Create Post</h2>
                                    <br />
                                    <div className='input-group'>
                                        <input type="text" placeholder="Title" className="form-control" required
                                            autoComplete='off' value={title} onChange={(e)=>setTitle(e.target.value)}/>
                                    </div>
                                    <div className='input-group'>
                                        <input type="text" placeholder="Description" className="form-control" required
                                            autoComplete='off'  value={body} onChange={(e)=>setBody(e.target.value)} />
                                    </div>
                                    <div className='file-field input-field'>
                                        <input type="file" className="form-control" required
                                            autoComplete='off'  onChange={(e)=>setImage(e.target.files[0])}/>
                                    </div>
                                    <br />
                                    <div className='m-t-20'>
                                        <button className='btn btn-primary' type='submit' onClick={postData}>Submit Post</button>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
