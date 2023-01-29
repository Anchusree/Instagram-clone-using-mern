import React from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  return (
    <div classname="container">
    <div className='row w-530'>
        <div className='col-sm-12 d-flex'>
            <div className='login-card card-block auth-body'>
                <div className='authbox'>
                    <h1 className='brand-logo text-center'>Instagram</h1>
                    <br/>
                    <div className='col-12'>
                        <form className='w-100'>
                            <div className='input-group'>
                                <span className='input-group-addon'>
                                    <i className='icofont icofont-email'></i>
                                </span>
                                <input type="email" placeholder="Email Address" className="form-control" required autoComplete='off'/>
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
