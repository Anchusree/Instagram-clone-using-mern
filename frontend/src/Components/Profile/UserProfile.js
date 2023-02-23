import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getfollowUser, getunfollowUser, getUserDetails } from '../../Redux/User/UserAction'
import { getUserfromLocalStorage } from '../../Utils/Utils'

export default function UserProfile() {

  const dispatch = useDispatch()
  const currentUser = getUserfromLocalStorage
  const { userid } = useParams()
  const [showFollow, setShowFollow] = useState(
    currentUser && currentUser.following.includes(userid) ? false : true
  )

  const userProfileState = useSelector(state => state.user)
  const { userProfile, isSuccess, userPosts } = userProfileState

  // console.log("usr",userProfileState);

  useEffect(() => {

    async function fetchData() {
      await dispatch(getUserDetails(userid))
    }

    fetchData()
  }, [userid, isSuccess])

  const followUser = async()=>{
    await dispatch(getfollowUser(userid))
    await setShowFollow(false)
  }

  const unFollowUser = async()=>{
    await dispatch(getunfollowUser(userid))
    await setShowFollow(true)
  }





  return (
    <>
      {
        userProfile.user
          ?
          <div style={{ maxWidth: "550px", margin: "0px auto", marginTop: "50px" }}>

            <div style={{ margin: "18px 0px", borderBottom: "1px solid grey" }}>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div>
                  <img src={userProfile.user.pic}
                    alt='profile' width="160px" height="160px" style={{ borderRadius: "80px" }} />
                </div>
                <div>
                  <h4>{userProfile.user.name}</h4>
                  <h5>{userProfile.user.email}</h5>
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <h6 style={{ fontWeight: 500 }}>{userProfile.posts.length} Posts</h6>&nbsp;&nbsp;
                    <h6 style={{ fontWeight: 500 }}>{userProfile.user.followers.length} Followers</h6>&nbsp;&nbsp;
                    <h6 style={{ fontWeight: 500 }}>{userProfile.user.following.length} Following</h6>
                  </div>
                  {
                    showFollow //if true
                      ?
                      <button style={{ margin: '10px' }} className="btn btn-primary" onClick={()=>followUser()}>
                        Follow
                      </button>
                      :
                      <button style={{ margin: '10px' }} className="btn btn-primary" onClick={()=>unFollowUser()}>
                        UnFollow
                      </button>
                  }

                </div>
              </div>
              <br />
              <ul className='nav justify-content-center flex-row profileTabBtns'>
                <li className="nav-item">
                  <button>
                    <i className="fa fa-th" aria-hidden="true"></i>&nbsp;POST
                  </button>

                </li>
                <li className="nav-item">
                  <button><i className='fa fa-bookmark'></i>&nbsp;SAVED</button>
                </li>
                <li className="nav-item">
                  <button><i className='fa fa-tag'></i>&nbsp;Tag</button>
                </li>
              </ul>
            </div>
            <div className='gallery'>
              <div>
                <img className='item' alt="galery" src='data:image/jpeg;base64,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' />
              </div>
            </div>
          </div>
          :
          <h5>Loading</h5>
      }
    </>

  )
}
