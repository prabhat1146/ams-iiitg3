import React from 'react';
import  Navbar from '../navbar/Navbar';
import  Footer  from '../footer/Footer';
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Layout(props) {
    return (
        <div>
            {/* <p>Hi</p> */}
            <Navbar/>
            <ToastContainer/>
            <Outlet/>
            <Footer/>
        </div>
    );
}

export default Layout;