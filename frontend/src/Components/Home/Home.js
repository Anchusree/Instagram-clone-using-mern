import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getPosts } from '../../Redux/Post/PostAction'
import { getUserfromLocalStorage } from '../../Utils/Utils'
import Posts from './Posts'
import Story from './Story'
import Suggestion from './Suggestion'

export default function Home() {

  const dispatch = useDispatch()

  const postState = useSelector((state)=>state.post)
  const {posts,isError,isPostSuccess,message} = postState
  //console.log(postState);

  const currentUser = getUserfromLocalStorage


  useEffect(()=>{
     async function fetchData(){
      await dispatch(getPosts())
     }
     fetchData()

  },[])

  return (
    <section className='main-container'>
      <div className='inner-container'>

        <div className='left-section'>
            <Story/>
            {
              posts && posts.length > 0
              ?
              posts.map((post,index)=>
              <Posts key={index} post={post} currentUser={currentUser} />
              )
              :
              <h2>Loading</h2>
            }
         
            
        </div>
        <div className='right-section'>
            <Suggestion/>
        </div>
      </div>
      
    </section>
  )
}
