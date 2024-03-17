import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuButton from '../main/dropdown/menuButton/MenuButton';
import LeftRightDropDown from '../main/dropdown/LeftRightDropDown';

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-indigo-500 p-4 flex w-full md:w-1/1 h-1/10">
      <div className='h-full'>
        <img src="/images/iiitg-logo.png" alt="iiitg-logo"
          className='flex h-1/3 w-1/3 rounded-full bg-slate-600'
        />
      </div>
      <div className="container mx-auto flex justify-between items-center h-full ">
        <div className="text-white text-lg font-bold">
          <Link to="/" className="logo">
            <span className="text-yellow-400">IIITG-</span>Attendance-System
          </Link>
        </div>
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <MenuButton handleClick={handleClick} value={isClicked} />
        </div>

        {/* Navigation Links (Desktop) */}
        {!isClicked && (
          <div className="hidden lg:flex space-x-4">
            <NavLink to="/" label="Home" />
            <NavLink to="/admin" label="Admin" />
            <NavLink to="/faculty" label="Faculty" />
            <StudentDropdown />
          </div>
        )}
      </div>

      {isClicked && <LeftRightDropDown isDrawerOpen={isClicked} />}
    </nav>
  );
};

// Custom NavLink component for consistent styling
const NavLink = ({ to, label, onClick }) => (
  <Link to={to} className="text-white hover:text-yellow-400 mb-2 lg:mb-0 lg:ml-2" onClick={onClick}>
    {label}
  </Link>
);

// Student Dropdown component
const StudentDropdown = ({ onClick }) => (
  <div className="relative group">
    <div className="text-white cursor-pointer group-hover:text-yellow-400">Student</div>
    <div className="absolute hidden bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded transition-transform transform origin-top group-hover:block">
      <DropdownLink to="/student/login" label="Login" onClick={onClick} />
      <DropdownLink to="/student/signup" label="Sign Up" onClick={onClick} />
    </div>
  </div>
);

// Custom DropdownLink component
const DropdownLink = ({ to, label, onClick }) => (
  <Link to={to} className="block hover:text-yellow-400 transition-colors duration-300 px-4" onClick={onClick}>
    {label}
  </Link>
);

export default Navbar;
