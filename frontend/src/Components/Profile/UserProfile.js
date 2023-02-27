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

  const [postTab,setPostTab] = useState(true)
  const [reelTab,setReelTab] = useState(false)
  const [tagTab,setTagTab] = useState(false)
  const showPostTab  =()=>{
    setPostTab(true)
    setReelTab(false)
    setTagTab(false)
  }
  const showReelTab  =()=>{
    setPostTab(false)
    setReelTab(true)
    setTagTab(false)
  }
  const showTagTab  =()=>{
    setPostTab(false)
    setReelTab(false)
    setTagTab(true)
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
                  <button onClick={showPostTab}>
                  <i className="fa fa-th" aria-hidden="true"></i>&nbsp;POST
                  </button>
                
              </li>
              <li className="nav-item" >
                  <button onClick={showReelTab}><i className='fa fa-bookmark'></i>&nbsp;REELS</button>
              </li>
              <li className="nav-item">
                  <button onClick={showTagTab}><i className='fa fa-tag'></i>&nbsp;TAGGED</button>
              </li>
              </ul>
            </div>
            <div className='gallery'>
              {
                postTab
                ?
                 userPosts && userPosts.posts.length > 0
                 ?
                 userPosts.map((item,index)=>
                 <div key={index}>
                   <img className='item' src={item.photo} alt={item.title}/>
               </div>
                 )
                 :
                 <h4>No posts yet</h4>
                :
                null
              }
              {
                
                reelTab
                ?
                <h4>No reels yet</h4>
                :
                null
              }

        {
          tagTab
          ?
          <h5>No tags yet</h5>
          :
          null
        }
            </div>
          </div>
          :
          <h5>Loading</h5>
      }
    </>

  )
}
