import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import image1 from '../../assets/icon/home.svg'
import image2 from '../../assets/icon/save.svg'
import image3 from '../../assets/icon/profile.jpeg'
import image4 from '../../assets/icon/explore.svg'
import image5 from '../../assets/icon/plus.svg'
import { logout, searchUser } from '../../Redux/User/UserAction'
import { useDispatch, useSelector } from 'react-redux'
import { getUserfromLocalStorage } from '../../Utils/Utils'


const capitalizeTxt =(txt)=>{
  return txt.charAt(0).toUpperCase() + txt.slice(1); 
}

export default function Header() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [search,setSearch] = useState("")
  const currentUser = getUserfromLocalStorage

  const userState = useSelector(state => state.user)
  const { userSearch,isSearchSuccess} = userState

  const [userDetails,setUserDetails] = useState([])




  const fetchUsers = async(query)=>{
    await setSearch(capitalizeTxt(query))
    await dispatch(searchUser(query))
    if(isSearchSuccess){
      await setUserDetails(userSearch)
    }
  } 


  return (
    <header style={{
      height: search.length > 0
        ? "auto" : "50px"
    }}>
      <div className='header_container'>
        <div className="branding">
            <Link to="/home">
            <h1 className='brand-logo-header'>Instagram</h1>
            </Link>
        </div>
        <div className='searchbar'>
            <input className='search' placeholder='Search' type="text" value={search} onChange={(e)=>fetchUsers(e.target.value)} />

        {
          search.length > 0
          ?
          <ul className="collection">
            {
              currentUser && userDetails.length >0
              ?
              userDetails.map(item=>{
                return(
                  <Link key={item._id} to={"/profile/" + item._id}>
                    <li className="collection-item" onClick={()=>setSearch('')}>
                      <img src={item.pic} alt='profile' width="25px" height="25px" style={{ borderRadius: '50%' }}/>&nbsp;
                      {item.name}
                    </li>
                  </Link>
                )
              })
              :
              <p>User not found</p>
            }
          </ul>
          :

          null
        }
       
        </div>
        <div className="iconbar">
            <Link to="/home"><img className='icon_1' src={image1} alt=""/></Link>
            <Link to="/explore"><img className='icon_1' src={image4} alt=""/></Link>
            <Link to="/createPosts"><img className='icon_1' src={image5} alt=""/></Link>
            <Link to="/savePosts"><img className='icon_1' src={image2} alt=""/></Link>
            <Link to="/profile"><img className='icon_11' src={image3}  alt=""/></Link>

            <button className='logoutbtn' type='submit'
            onClick={async()=>{
              await dispatch(logout()); 
              await navigate("/"); 
              await window.location.reload(true)
            }}
            >Logout</button>
        </div>
      </div>

    </header>
  )
}
