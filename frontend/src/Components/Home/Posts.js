import React, { useState } from 'react'
import image1 from '../../assets/icon/post4.jpg'
import image2 from '../../assets/icon/comment.svg'
import image3 from '../../assets/icon/share.svg'
import image4 from '../../assets/icon/emoji.svg'
import { timeSince } from '../../Utils/Utils'
import { useDispatch } from 'react-redux'
import { createComment, deleteComment, deletePost, likePost, savePost, unLikePost, unSavePost } from '../../Redux/Post/PostAction'
import { Link } from 'react-router-dom'

export default function Posts({ post, currentUser }) {

  const dispatch = useDispatch()

  const [comment,setComment]= useState('')
  const [showComment,setShowComment] = useState(false)

  const makeComment=async(text,postId)=>{
    const comment={ text, postId}
    await dispatch(createComment(comment))
    await setComment('')
  }

  const handleComment=()=>{
    setShowComment(!showComment)
  }
  const removeComment=(record,postId)=>{
    const comment= {record,postId}
    dispatch(deleteComment(comment))
  }


  return (
    <div className='post-list'>
      <div className='post'>
        <div className='p_d'>
          <div className='p_inner'>
            <img className='p_p' alt='' src={post.postedBy.pic} />
            <Link to={post.postedBy._id !== currentUser._id ? "/profile/" + post.postedBy._id : "/profile"}>
              <p className='p_name'>{post.postedBy.name}</p>
            </Link>
          </div>
          {
            post.postedBy._id === currentUser._id
            ?
            <i className='fas fa-trash' style={{float:'right', paddingTop:'16px', fontSize:'16px',paddingRight:'16px'}}
            onClick={()=>dispatch(deletePost(post._id))}
            ></i>
            :
            <i className='fas fa-ellipsis-h threedots'></i>

          }
         
        </div>
        <div className='p_image'>
          <img className='pp_full' src={post.photo} alt="post" />
        </div>
        <div className='reaction_icon'>
          <div className='left_i'>
            {
              post.likes.includes(currentUser._id)
              ?
              <button className='reactionbtn'>
              <i className='fa fa-heart hearticon' style={{ fontSize: '22px', color:'red' }} 
              onClick={()=>dispatch(unLikePost(post._id))}
              ></i>
            </button>
            :
            <button className='reactionbtn'>
              <i className='fa fa-heart hearticon' style={{ fontSize: '22px' }} 
              onClick={()=>dispatch(likePost(post._id))}
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
              post.saved.length > 0 && post.saved.find(save=>save.postId === post._id)
              ?
              <button className='reactionbtn' onClick={()=>dispatch(unSavePost(post))}>
              <i className='fa fa-bookmark' style={{ fontSize: '22px',color:'#12129a'}}
              ></i>
            </button>
            :
            <button className='reactionbtn' onClick={()=>dispatch(savePost(post))}>
            <i className='fa fa-bookmark' style={{ fontSize: '22px' }}></i>
            </button>

            }
          
          </div>
        </div>

        <h6 className='numlikes'>{post.likes.length} likes</h6>
        <span className='posttitle'>{post.title}</span>&nbsp;
        <span className='postbody'>{post.body}</span>
        <br />
        <button type="button" className='btn viewcommentbtn' onClick={handleComment}>
          View all {post.comments.length} comments</button>
        <div style={{ overflowY: "scroll", maxHeight: '85px' }}>

          {
            showComment && post.comments.length >0 
            ?
            post.comments.map((record,index)=>{
              return(
                <div style={{ display: 'flex', justifyContent: 'space-between' }} key={index}>
                <h6>
                  <Link to='' className='comment'>
                    <img src={record.postedBy.pic} alt="" className='commentview' />&nbsp;
                    <span style={{ fontWeight: '600', fontSize:'12px' }}>{record.postedBy.name}</span>
                  </Link>
                  &nbsp;
                 {record.text}
                </h6>
                {
                  record.postedBy._id === currentUser._id
                  ?
                  <i className='fa fa-times' aria-hidden="true" 
                  style={{paddingTop:'6px', fontSize:'16px', paddingRight:'16px',cursor:'pointer'}}
                  onClick={()=>removeComment(record,post._id)}
                  ></i>
                  :
                  null
                }
              </div>
              )
            })
            :
            null
          }
         
        </div>
        <p className='postdate'>
          {timeSince(new Date())} Ago
        </p>
        <div className='comment_section'>
          <div className='input_box'>
            <img src={image4} alt='' />
            <input type="text" className='input_c'
              placeholder='Add a comment...' value={comment} onChange={(e)=>setComment(e.target.value)} />
          </div>
          <div className='c_text'>
            <button onClick={()=>makeComment(comment, post._id)}>Post</button>
          </div>
        </div>
      </div>
    </div>
  )
}
