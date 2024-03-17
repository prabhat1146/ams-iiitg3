import React from 'react';
import { Navigate, Outlet,useLocation } from 'react-router-dom';


function StudentsPrivateRoutes(props) {
    const location = useLocation();
    // alert(location.state.logedIn)
    var isLogedIn=false;
    if(location.state && location.state.logedIn)
    {
        isLogedIn=true;
    }
    

    return isLogedIn?<Outlet/>:<Navigate to='/student/login'/>
}

export default StudentsPrivateRoutes;