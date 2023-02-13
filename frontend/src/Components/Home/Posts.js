import React from 'react'
import image1 from '../../assets/icon/post4.jpg'
import image2 from '../../assets/icon/comment.svg'
import image3 from '../../assets/icon/share.svg'
import image4 from '../../assets/icon/emoji.svg'
import { timeSince } from '../../Utils/Utils'
import { useDispatch } from 'react-redux'
import { likePost, savePost, unLikePost, unSavePost } from '../../Redux/Post/PostAction'

export default function Posts({ post, currentUser }) {

  const dispatch = useDispatch()





  return (
    <div className='post-list'>
      <div className='post'>
        <div className='p_d'>
          <div className='p_inner'>
            <img className='p_p' alt='' src={post.postedBy.pic} />
            <a href=''>
              <p className='p_name'>{post.postedBy.name}</p>
            </a>
          </div>
          <i className='fas fa-ellipsis-h threedots'></i>
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
            
            <button className='reactionbtn'>
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
        <button type="button" className='btn viewcommentbtn'>
          View all {post.comments.length} comments</button>
        <div style={{ overflowY: "scroll", maxHeight: '85px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h6>
              <a href='' className='comment'>
                <img src={image1} alt="" className='commentview' />
                <span style={{ fontWeight: '400' }}>Jeo</span>
              </a>
              &nbsp;
              Nice!!
            </h6>
          </div>
        </div>
        <p className='postdate'>
          {timeSince(new Date())} Ago
        </p>
        <div className='comment_section'>
          <div className='input_box'>
            <img src={image4} alt='' />
            <input type="text" className='input_c'
              placeholder='Add a comment...' />
          </div>
          <div className='c_text'>
            <button>Post</button>
          </div>
        </div>
      </div>
    </div>
  )
}
