import React, { useEffect, useState } from 'react'
import { getProfile, getSavedPosts } from '../../Redux/Profile/ProfileAction'
import { getUserfromLocalStorage } from '../../Utils/Utils'
import './profile.css'
import  {useDispatch, useSelector} from 'react-redux'
import ShowEditModal from '../Modals/ShowEditModal'


export default function Profile() {

  const dispatch = useDispatch()

    const currentUser = getUserfromLocalStorage 

    const profileState = useSelector(state=>state.profile)
    const {profile,savedPosts,isSuccess} = profileState
    // console.log(profileState);

    const [postTab,setPostTab] = useState(true)
    const [saveTab,setSaveTab] = useState(false)
    const [tagTab,setTagTab] = useState(false)

    useEffect(() => {

      async function fetchData(){
        await dispatch(getProfile())
        await dispatch(getSavedPosts())
      }
      fetchData()

      return () => { }
    }, [currentUser])
    

    const showPostTab  =()=>{
      setPostTab(true)
      setSaveTab(false)
      setTagTab(false)
    }
    const showSaveTab  =()=>{
      setPostTab(false)
      setSaveTab(true)
      setTagTab(false)
    }
    const showTagTab  =()=>{
      setPostTab(false)
      setSaveTab(false)
      setTagTab(true)
    }

    const [showEditmodal,setEditModal] = useState(false)


  return (
    <div style={{maxWidth:"550px", margin:"0px auto", marginTop:"50px"}}>
      <div style={{margin:"18px 0px",borderBottom:"1px solid grey"}}>
        <div style={{display:"flex", justifyContent:"space-around"}}>
            <div>
                <img src={currentUser && currentUser.pic}
                alt='profile' width="160px" height="160px" style={{borderRadius:"80px"}}/>
            </div>
            <div>
                <h4>{currentUser && currentUser.name}</h4>
                <h5>{currentUser && currentUser.email}</h5>
                <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                    <h6 style={{fontWeight:500}}>{profile && profile.length} Posts</h6>&nbsp;&nbsp;
                    <h6 style={{fontWeight:500}}>{currentUser && currentUser.followers.length} Followers</h6>&nbsp;&nbsp;
                    <h6 style={{fontWeight:500}}>{currentUser && currentUser.following.length} Following</h6>
                </div>
                <button className='btn btn-secondary'onClick={()=>setEditModal(true)}>Edit Profile</button>
            </div>
        </div>
        <br/>
        <ul className='nav justify-content-center flex-row profileTabBtns'>
        <li className="nav-item">
            <button onClick={showPostTab}>
            <i className="fa fa-th" aria-hidden="true"></i>&nbsp;POST
            </button>
           
        </li>
        <li className="nav-item" >
            <button onClick={showSaveTab}><i className='fa fa-bookmark'></i>&nbsp;SAVED</button>
        </li>
        <li className="nav-item">
            <button onClick={showTagTab}><i className='fa fa-tag'></i>&nbsp;TAG</button>
        </li>
      </ul>
      </div>
      <div className='gallery'>
        {
          postTab
          ?
            profile && profile.length > 0
            ?
            profile.map((item,index)=>
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
          saveTab
          ?
          savedPosts && savedPosts.length > 0
            ?
            savedPosts.map((item,index)=>
            <div key={index}>
              <img className='item' src={item.photo} alt={item.title}/>
          </div>
            )
            :
            <h4>No saved posts yet</h4>
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


      <ShowEditModal
      showEditmodal = {showEditmodal}
      setEditModal ={setEditModal}
      currentUser ={currentUser}
      />
    </div>
  )
}
