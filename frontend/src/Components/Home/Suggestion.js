import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import image1 from '../../assets/icon/post4.jpg'
import { getSuggestions } from '../../Redux/User/UserAction'
import { getUserfromLocalStorage } from '../../Utils/Utils'

export default function Suggestion() {

  const dispatch = useDispatch()

  const currentUser = getUserfromLocalStorage

  const userState = useSelector((state) => state.user)
  const { userSuggestion } = userState


  useEffect(() => {
    async function fetchData() {
      await dispatch(getSuggestions())
    }
    if (currentUser) {
      fetchData()
    }

  }, [currentUser])


  return (
    <div className="mt-10">
      <div className='d-flex align-items-center justify-content-between'>
        <div>
          <Link to="/profile" className='d-flex align-items-center'>
            <img src={currentUser.pic} alt='avatar' className='big-avatar' />&nbsp;
            <div className='ml-1' style={{ transform: 'translateY(-2px)' }}>
              <span className='d-block'>{currentUser.name}</span>
            </div>
          </Link>
        </div>
      </div>

      <div className='d-flex justify-content-between align-items-center my-8'>
        <h6 className='text-secondary suggestnbtn'>Suggestions for you</h6>
        <i className='fa fa-redo' style={{ cursor: 'pointer' }}
        onClick={()=>dispatch(getSuggestions())}
        ></i>
      </div>
      <div className='suggestions'>
        {
          userSuggestion && userSuggestion.map(user=>
            <div className='d-flex justify-content-between' key={user._id}>
            <div>
  
              <Link to={`/profile/${user._id}`} className='d-flex align-items-center'>
                <img src={user.pic} className='sug-avatar' alt='avatarsug' />&nbsp;
                <div className='ml-1' style={{ transform: 'translateY(-2px)' }}>
                  <span className='d-block'>{user.name}</span>
                </div>
              </Link>
            </div>
            <button style={{ margin: '10px' }} className="sug-followbtn">
              Follow
            </button>
          </div>
          )
        }
      
      </div>
    </div>
  )
}
