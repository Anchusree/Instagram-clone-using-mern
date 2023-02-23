import React, { useState } from 'react'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import { updateUserProfile } from '../../Redux/Profile/ProfileAction'
import { getUserfromLocalStorage } from '../../Utils/Utils'

export default function ShowEditModal({ showEditmodal,setEditModal }) {

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const currentUser  = getUserfromLocalStorage

    const editProfile = async(e)=>{
        e.preventDefault();
        const userData ={
            name,email,password
        }
        await dispatch(updateUserProfile(userData))

        //await setName('')
        await setPassword('')
        //await setEmail('')
        await setEditModal(false)
        await window.location.reload(true)




    }


    return (
        <Modal
            isOpen={showEditmodal}
            ariaHideApp={false}
            contentLabel="Edit Profile"
            className="EditModal"
        >
            <div className='col-12 profileForm'>
                <form className="w-100" onSubmit={editProfile}>
                    <h2>Edit Profile</h2>

                    <div className='input-group'>
                        <span className='input-group-addon'>
                            <i className='icofont icofont-email'></i>
                        </span>
                        <input type="email" placeholder="Email Address" className="form-control" 
                        autoComplete='off'
                            value={email ? email : currentUser && currentUser.email} onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className='input-group'>
                        <span className='input-group-addon'>
                            <i className='icofont icofont-name'></i>
                        </span>
                        <input type="text" placeholder="Name" className="form-control" autoComplete='off'
                           value={name ? name : currentUser && currentUser.name} onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div className='input-group'>
                        <span className='input-group-addon'>
                            <i className='icofont icofont-password'></i>
                        </span>
                        <input type="password" placeholder="Password" className="form-control" autoComplete='off'
                            value={password} onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <br/>
                    <div className='m-t-20'>
                        <button className='btn btn-secondary btn-md btn-block m-b-10 signupbtn' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
               
            </div>
            <button className='btn btn-primary' onClick={()=>setEditModal(false)}>Close</button>
        </Modal>
    )
}
