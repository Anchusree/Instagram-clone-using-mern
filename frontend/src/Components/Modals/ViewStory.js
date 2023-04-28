import React from 'react'
import Modal from 'react-modal'
import Stories from 'react-insta-stories'

export default function ViewStory({openStory,setOpenStory,story}) {

    //get all storypics in a array
    const storyline = story && story.map(({storyPic})=>storyPic)
    console.log(storyline)

    const storyStyles={
        width:'auto',
        maxWidth:'100%',
        maxHeight:'100%',
        margin:'auto'
    }

  return (
   <Modal
    isOpen={openStory}
    ariaHideApp={false}
    className="storymodal"
    contentLabel='View Story'
    >
        <div className='col-12 profileform'>
            <Stories
                loop
                stories = {storyline}
                defaultInterval={1500}
                width={432}
                height={490}
                storyStyles={storyStyles}

            
            />
           
        </div>
        <br/>
        <button className='btn btn-primary text-center'
        onClick={()=>setOpenStory(false)}
        >Close</button>
      
    </Modal>
  )
}
