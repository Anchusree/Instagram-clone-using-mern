import React, { useEffect, useState } from 'react'
import ShowStoryModal from '../Modals/ShowStoryModal'
import axios from 'axios'
import { config } from '../../Utils/Utils'
import ViewStory from '../Modals/ViewStory'

export default function Story() {

    const [addStoryModal,setAddStoryModal] = useState(false)

    const [openStory,setOpenStory] = useState(false)

    const [stories,setStories] = useState([])
    const [currentStory,setCurrentStory] = useState()

    useEffect(()=>{
        async function fetchData(){
            const allStories = await axios.get('http://localhost:5000/api/getStory',config)
            // console.log("allStories",allStories);
            await setStories(allStories.data.userStories)
        }

        fetchData()

    },[])




  return (
    <div className='story'>
      <div className='story-box'>
        {
            stories.length > 0
            ?
            stories && stories.map((story,index)=>
                <React.Fragment key={index}>
                  <div className='story_1'>
                    <button className='storybtn' 
                    onClick={()=>{
                        setOpenStory(true); setCurrentStory(story.stories)
                    }}
                    
                    >
                        <img className='story_image' src={story.pic}/>
                        <p className='story_H'>{story.name}</p>
                    </button>
                </div>
       
                </React.Fragment>
            )
            :
            null
        }
      

        <div className="story_l" style={{marginTop:"-15px", padding:'10px'}}>
        <button className='storybtn' onClick={()=>setAddStoryModal(true)}>
            <i className='fa fa-plus-circle story_image'></i>
            <i className='story_S' style={{display:"flex"}}>Add Story</i>    
        </button>
        </div>
      </div>
      <i className='  fas fa-chevron-circle-left icon-style2 nav-left' 
    style={{ fontSize: '24px' }}></i>
    <i className=' fas fa-chevron-circle-right icon-style1  nav-right' style={{ fontSize: '24px' }}></i>


        {/* create story modal */}
        <ShowStoryModal
        addStoryModal={addStoryModal}
        setAddStoryModal={setAddStoryModal}
        />


        {/* view story modal */}
        <ViewStory
        openStory={openStory}
        setOpenStory={setOpenStory}
        story={currentStory}
        
        />


    </div>
  )
}
