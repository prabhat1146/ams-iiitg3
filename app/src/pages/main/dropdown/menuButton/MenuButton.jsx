import React from 'react';
// import {MenuState} from '../MenuState';

const MenuButton = ({handleClick},props) => {
 
  return (
    <div>
      {/* Mobile Menu Button */}
      <div className="block lg:hidden">
        <button
        //   ref={buttonRef}
          onClick={()=>handleClick(props.value)}
          className={`text-white-400 hover:text-yellow-400 focus:outline-none text-2xl ${props.isClicked ? 'bg-blue-500' : ''}`}
        >
          ☰
        </button>
      </div>
    </div>
  );
};

export default MenuButton;
