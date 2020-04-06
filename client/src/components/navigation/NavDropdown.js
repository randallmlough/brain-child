import React from 'react';
import LogoutButton from '../users/LogoutButton';

const NavDropdown = (props) => {
  return (
    <div className={props.className}>
      <ul>
        <li>
          <LogoutButton className="w-full bg-danger-500 text-white rounded p-1 hover:bg-danger-400 transition-all duration-150" />
        </li>
      </ul>
    </div>
  );
};

export default NavDropdown;
