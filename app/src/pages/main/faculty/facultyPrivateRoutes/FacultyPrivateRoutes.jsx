import React from 'react';
import { useLocation,Outlet,Navigate } from 'react-router-dom';

const FacultyPrivateRoutes = () => {
    const location = useLocation();
    // alert(location.state.logedIn)
    var isLogedIn=false;
    if(location.state && location.state.logedIn)
    {
        isLogedIn=true;
    }
    

    return isLogedIn?<Outlet/>:<Navigate to='/faculty/login'/>
};

export default FacultyPrivateRoutes;