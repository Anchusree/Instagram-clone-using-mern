import { Navigate, Outlet } from "react-router-dom"
import { getTokenfromLocalStorage, getUserfromLocalStorage } from "./Utils"


const PrivateRoute =()=>{

    const isAuthenticated = getUserfromLocalStorage && getTokenfromLocalStorage

    return (
        isAuthenticated ? <Outlet/> : <Navigate to="/" />
    )
}

export default PrivateRoute