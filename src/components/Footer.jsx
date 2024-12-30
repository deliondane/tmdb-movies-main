import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import { BiSolidCameraMovie } from "react-icons/bi";
import { BsCalendar2EventFill } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";


const Footer = () => {
  const activeStyle = {
    color: '#ff547e'
  }
  return (
    <div className='footer'>
      <div className="footerInner">
        <ul>
          <li>
            <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)}><IoHome /></NavLink>
            <NavLink to="/movies" style={({ isActive }) => (isActive ? activeStyle : undefined)}><BiSolidCameraMovie /></NavLink>
            <NavLink to="/event" style={({ isActive }) => (isActive ? activeStyle : undefined)}><BsCalendar2EventFill /></NavLink>
            <NavLink to="/search" style={({ isActive }) => (isActive ? activeStyle : undefined)}><IoSearch /></NavLink>
          </li>
        </ul>
      </div>
    </div >
  );
};

export default Footer;