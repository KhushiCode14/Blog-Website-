// import React from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="m-auto max-w-7xl ">
      <div className="text-orange-600 bg-white navbar ">
        <div className="flex-1">
          <a className="text-2xl btn btn-ghost">daisyUI</a>
        </div>
        <div className="flex-none">
          <ul className="gap-4 px-1 menu menu-horizontal">
            <li className="text-white bg-orange-600 border-none btn hover:bg-white hover:text-orange-600 hover:border-orange-600 hover:shadow-xl">
              <Link to="/login">Login</Link>
            </li>
            <li className="text-orange-600 bg-white border border-orange-600 outline-none btn hover:bg-orange-600 hover:text-white hover:border-white hover:shadow-xl">
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
