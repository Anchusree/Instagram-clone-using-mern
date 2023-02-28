import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  {useDispatch, useSelector} from 'react-redux'
import * as yup from 'yup'
import {useFormik} from 'formik'
import { login } from '../../Redux/Auth/AuthAction'
import { useEffect } from 'react'
import { toast } from 'react-toastify'


//validation
let schema = yup.object().shape({
    email:yup.string()
    .email("Email should be valid").required("Email is required"),
    password:yup.string().required("Password is required")
})
export default function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const authState = useSelector(state=>state.auth)

    const {user,isError,isLoading,isLoginSuccess} = authState

    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema:schema,
        onSubmit:async (values)=>{
            await dispatch(login(values)) 
            window.location.reload(true)
        }
    })
    useEffect(() => {
        if (isLoginSuccess) {
            navigate("/home");
        }
        else {
            navigate("/");
        }
    }, [isLoginSuccess]);


  return (
    <div className="container">
        <div className='row w-530'>
            <div className='col-sm-12 d-flex'>
                <div className='login-card card-block auth-body'>
                    <div className='authbox'>
                        <h1 className='brand-logo text-center'>Instagram</h1>
                        <br/>
                        <div className='col-12'>
                            <form className='w-100' onSubmit={formik.handleSubmit}>
                                <div className='input-group'>
                                    <span className='input-group-addon'>
                                        <i className='icofont icofont-email'></i>
                                    </span>
                                    <input type="email" placeholder="Email Address" className="form-control" required 
                                    autoComplete='off' value={formik.values.email} onChange={formik.handleChange("email")}/>
                                </div>
                                <div className='input-group'>
                                    <span className='input-group-addon'>
                                        <i className='icofont icofont-email'></i>
                                    </span>
                                    <input type="password" placeholder="Password" className="form-control" required 
                                    autoComplete='off' value={formik.values.password} onChange={formik.handleChange("password")}/>
                                </div>
                                <div className="m-t-10 text-left d-flex">
                                    <div className='forgot-password'>
                                        <Link to="/forgotpassword" className="text-right f-w-600 text-inverse">
                                        <i className="icofont icofont-lock"></i> Forgot Password?</Link>
                                    </div>
                                </div>
                                <br/>
                                <div className='m-t-20'>
                                    <button className='btn btn-primary btn-md btn-block m-b-10 signupbtn' type='submit'>Sign In</button>
                                    <br/>
                                    Don't have an account yet? <Link to="/register" className="w-400px">Register</Link>
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
