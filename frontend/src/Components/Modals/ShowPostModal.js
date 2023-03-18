import React, { useState } from 'react'
import { getUserfromLocalStorage, timeSince } from '../../Utils/Utils'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import image2 from '../../assets/icon/comment.svg'
import image3 from '../../assets/icon/share.svg'
import image4 from '../../assets/icon/emoji.svg'
import { createComment, likePost, savePost, unLikePost, unSavePost } from '../../Redux/Post/PostAction'
import { useDispatch } from 'react-redux'



export default function ShowPostModal({ postModal, setPostModal, currentPost,handleComment }) {

    const state = getUserfromLocalStorage

    const dispatch = useDispatch()

    // const handleComment=()=>{}

    const [comment,setComment] = useState('')

    const makeComment =(text,postId)=>{
        const comment={
            text, postId
        }
        dispatch(createComment(comment))

    }


    return (
        <Modal
            isOpen={postModal}
            ariaHideApp={false}
            className="showPostModal"
            contentLabel='View Post'
        >
            <div className='col-12 profileform'>
                <button className='btn text-center' onClick={() => setPostModal(false)}>
                    <i className='fa fa-times' style={{ fontSize: "20px" }}></i>
                </button>
                <div className='row'>
                    <div className='col-md-4' style={{ overflow: 'hidden' }}>
                        <img src={currentPost && currentPost.photo} className='modalpostedimg' alt=''/>
                    </div>
                    <div className='col-md-8'>
                        <div className='post-list-modal'>
                            <div className='post-modal'>
                                <div className='p_d_modal'>
                                    <div className='p_inner'>
                                        <img className='p_p' alt='' src={currentPost && currentPost.postedBy.pic} />
                                        <Link>
                                            <p className='p_name'>{currentPost && currentPost.postedBy.name}</p>
                                        </Link>
                                    </div>
                                    <i className='fa fa-ellipsis-h threedots'></i>
                                </div>
                                <div className='p_image_modal' style={{overflow:'scroll', maxHeight:'341px', paddingTop:'10px'}}>
                                    {
                                        currentPost && currentPost.comments.length > 0
                                        ?
                                        currentPost.comments.map((record,index)=>{
                                            return(
                                                <div key={index} style={{display:'flex', justifyContent:'space-between'}}>
                                                    <h6>
                                                        <Link style={{paddingLeft:'10px'}}>
                                                            <img src={record.postedBy.pic} alt="" style={{
                                                                    width: "25px", height: "25px",
                                                                    borderRadius: '50px'
                                                                }}/>
                                                            <span style={{fontWeight:'600'}}>{record.postedBy.name}</span>
                                                        </Link>&nbsp;
                                                        {record.text} &nbsp;
                                                    </h6>
                                                    {
                                                        record.postedBy._id === state._id
                                                        ?
                                                        <i className='fa fa-times'></i>
                                                        :
                                                        null
                                                    }
                                                </div>
                                            )

                                        })
                                        :
                                        <h2>No Comments Yet</h2>
                                    }
                                </div>
                                <div className='reaction_icon'>
                                    <div className='left_i'>
                                        {
                                            currentPost && currentPost.likes.includes(state._id)
                                                ?
                                                <button className='reactionbtn'>
                                                    <i className='fa fa-heart hearticon' style={{ fontSize: '22px', color: 'red' }}
                                                        onClick={() => dispatch(unLikePost(currentPost._id))}
                                                    ></i>
                                                </button>
                                                :
                                                <button className='reactionbtn'>
                                                    <i className='fa fa-heart hearticon' style={{ fontSize: '22px' }}
                                                        onClick={() => dispatch(likePost(currentPost._id))}
                                                    ></i>
                                                </button>
                                        }

                                        <button className='reactionbtn' onClick={handleComment}>
                                            <img src={image2} alt='img3' />
                                        </button>
                                        <button className='reactionbtn'>
                                            <img src={image3} alt='img3' />
                                        </button>
                                    </div>
                                    <div className='right_i'>

                                        {
                                           currentPost && currentPost.saved.length > 0 && currentPost.saved.find(save => save.postId === currentPost._id)
                                                ?
                                                <button className='reactionbtn' onClick={() => dispatch(unSavePost(currentPost))}>
                                                    <i className='fa fa-bookmark' style={{ fontSize: '22px', color: '#12129a' }}
                                                    ></i>
                                                </button>
                                                :
                                                <button className='reactionbtn' onClick={() => dispatch(savePost(currentPost))}>
                                                    <i className='fa fa-bookmark' style={{ fontSize: '22px' }}></i>
                                                </button>

                                        }

                                    </div>
                                </div>
                                <h6 style={{fontWeight:600, paddingLeft:'12px', paddingTop:'10px'}}>
                                    {currentPost && currentPost.likes.length} likes
                                </h6>
                                <span style={{fontWeight:600, paddingLeft:'12px'}}>{currentPost && currentPost.title}</span>
                                <span style={{display:'inline', color:'black', fontSize:'14px'}}>{currentPost && currentPost.body}</span>
                                <br/>
                                <p style={{color:'grey',paddingLeft:'12px', fontSize:'10px'}}>
                                    {timeSince(new Date(currentPost && currentPost.createdAt))} AGO
                                </p>
                                <div className='comment_section'>
                                    <div className='input_box'>
                                        <img src={image4} alt='' />
                                        <input type="text" className='input_c'
                                            placeholder='Add a comment...' value={comment} onChange={(e) => setComment(e.target.value)} />
                                    </div>
                                    <div className='c_text'>
                                        <button onClick={() => makeComment(comment, currentPost && currentPost._id)}>Post</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </Modal>

    )
}
