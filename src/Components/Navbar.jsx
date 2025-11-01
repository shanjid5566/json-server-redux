import React from "react";
import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-sm font-semibold hover:text-gray-300">
              Home
            </Link>
            <Link to="/users" className="text-sm hover:text-gray-300">
              Users
            </Link>
            <Link to="/add-user" className="text-sm hover:text-gray-300">
              Add User
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
