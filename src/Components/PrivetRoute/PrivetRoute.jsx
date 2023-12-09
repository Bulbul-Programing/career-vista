import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Lottie from 'lottie-react';
import loadingGif from '../../../public/infinite-loader.json';
import { Navigate, useLocation } from "react-router-dom";

const PrivetRoute = ({children}) => {
    const location = useLocation()
    const {loading, user} = useContext(AuthContext)

    if(loading){
        return (
        <div className="flex justify-center"> <Lottie className="w-[200px] " animationData={loadingGif}></Lottie></div>)
    }

    if(user){
        return children
    }

    return <Navigate state={location.pathname} to='/login'></Navigate>

};

export default PrivetRoute;