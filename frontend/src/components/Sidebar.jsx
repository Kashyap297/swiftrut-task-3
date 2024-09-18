import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 h-screen p-5 text-white fixed lg:static">
      <h1 className="text-3xl font-semibold mb-10">Admin Panel</h1>
      <ul>
        <li className="mb-4">
          <Link to="/dashboard" className="text-lg hover:text-gray-400">
            Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/users" className="text-lg hover:text-gray-400">
            Manage Users
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/tasks" className="text-lg hover:text-gray-400">
            Manage Tasks
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/login" className="text-lg hover:text-gray-400">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
