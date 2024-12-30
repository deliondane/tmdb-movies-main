import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const activeStyle={
    color:'red'
  }
  return (
    <div className='footer'>
      <div className="footerInner">
        <ul>
          <li>
            <NavLink to="/" style={({isActive})=>(isActive ? activeStyle : undefined)}>Home</NavLink>
            <NavLink to="/movies" style={({isActive})=>(isActive ? activeStyle : undefined)}>Movies</NavLink>
            <NavLink to="/event" style={({isActive})=>(isActive ? activeStyle : undefined)}>Event</NavLink>
            <NavLink to="/users" style={({isActive})=>(isActive ? activeStyle : undefined)}>Users</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;