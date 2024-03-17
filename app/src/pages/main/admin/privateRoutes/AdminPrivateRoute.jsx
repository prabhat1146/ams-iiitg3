import React from 'react';
import { useLocation,Outlet,Navigate } from 'react-router-dom';

const AdminPrivateRoutes = () => {
    const location = useLocation();
    // alert(location.state.logedIn)
    var isLogedIn=false;
    if(location.state && location.state.logedIn)
    {
        isLogedIn=true;
    }
    

    return isLogedIn?<Outlet/>:<Navigate to='/admin/login'/>
};

export default AdminPrivateRoutes;