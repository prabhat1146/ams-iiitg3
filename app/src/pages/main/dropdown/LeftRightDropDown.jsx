// LeftRightDropDown.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LinkButton from './link/LinkButton';

const LeftRightDropDown = ({ profilePic, profileName }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const closeDrawerWithDelay = () => {
    setTimeout(() => {
      setDrawerOpen(false);
      
    }, 200); // You can adjust the delay (in milliseconds) based on your animation duration
  };

  const menuItems = [
    { name: 'Home', to: '/' },
    { name: 'Admin', to: '/admin' },
    { name: 'Faculty', to: '/faculty' },
    { name: 'Student Login', to: '/student/login' },
    { name: 'Student SignUp', to: '/student/signup' },
    { name: 'Logout', to: '/' },
  ];

  return (
    <>
      <div className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${
        isDrawerOpen ? '' : '-translate-x-full'
      } bg-white dark:bg-gray-800`} tabIndex="-1">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center overflow-hidden">
          <img src='/images/iiitg-logo.png' alt="Profile" className="w-full h-full object-cover rounded-full" />
          </div>
          {/* <div>
            <p className="text-lg font-semibold">{profileName}</p>
          </div> */}
        </div>
        <h5 className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
        <button
          type="button"
          onClick={toggleDrawer}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              {menuItems.map((menuItem, index) => (
                <LinkButton key={index} name={menuItem.name} to={menuItem.to} onClick={closeDrawerWithDelay} />
              ))}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LeftRightDropDown;
