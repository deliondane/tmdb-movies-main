import React from 'react';
import {Link} from "react-router-dom";
import { BiSolidCameraMovie } from "react-icons/bi";

const Navbar = () => {
  return (
    <div className='navbar'>
      <h1 className="logo"><Link to="/"><BiSolidCameraMovie/></Link></h1>
    </div>
  );
};

export default Navbar;