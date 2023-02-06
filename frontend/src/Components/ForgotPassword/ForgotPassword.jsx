import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { resetnewPassword } from '../../Redux/Auth/AuthAction'
import { validEmail } from '../../Utils/Utils'

export default function ForgotPassword() {

    const [email,setEmail] = useState("")

    const dispatch = useDispatch();

    const authState = useSelector(state=>state.auth)
    const {isError,isNewPasswordSuccess,message} = authState


    const resetPassword = async(e)=>{
        e.preventDefault()
        if(validEmail(email)){
            await dispatch(resetnewPassword(email));

            if(isNewPasswordSuccess){
                await toast.success(message)
                setEmail('')
            }
            else if(isError){
                await toast.error("Something went wrong")
            }
        }
        else{
            toast.error("Invalid Email")
            return;
        }

    }


  return (
    <div className="container">
    <div className='row w-530'>
        <div className='col-sm-12 d-flex'>
            <div className='login-card card-block auth-body'>
                <div className='authbox'>
                    <h1 className='brand-logo text-center'>Instagram</h1>
                    <br/>
                    <ToastContainer/>
                    <div className='col-12'>
                        <form className='w-100' onSubmit={resetPassword}>
                            <div className='input-group'>
                                <span className='input-group-addon'>
                                    <i className='icofont icofont-email'></i>
                                </span>
                                <input type="email" placeholder="Email Address" className="form-control" required 
                                autoComplete='off' onChange={(e)=>setEmail(e.target.value)} value={email}/>
                            </div>
                            <br/>
                            <div className='m-t-20'>
                                <button className='btn btn-primary btn-md btn-block m-b-10 signupbtn' type='submit'>Reset</button>
                                <br/>
                                Go Back to login? <Link to="/" className="w-400px">Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
</div>
  )
}
