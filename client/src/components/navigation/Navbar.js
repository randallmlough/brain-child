import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavDropdown from './NavDropdown';
import Icon from '../ui/Icon';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (ref && ref.current) {
      const documentClick = function (e) {
        if (!ref.current.contains(e.target)) {
          setShowDropdown(false);
        }
      };
      document.addEventListener('click', documentClick);
      return () => {
        document.removeEventListener('click', documentClick);
      };
    }
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (!showDropdown) {
      setShowDropdown(true);
    }
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex">
        <div className="rounded transparent-white hover:opacity-75 px-2 py-1">
          <Link to="/">
            <Icon className="text-white text-md" icon="home" />
          </Link>
        </div>
        {/* <div className="bg-gray-400 rounded p-2">
          <Icon className="text-white text-md" icon="th" />
        </div> */}
      </div>
      <div className="relative" onClick={(e) => handleClick(e)} ref={ref}>
        <Icon className="text-white text-3xl hover:opacity-75" icon="circle" />
        <NavDropdown
          className={showDropdown ? 'nav-dd shadow rounded show' : 'nav-dd'}
        />
      </div>
    </div>
  );
};

export default Navbar;
