import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed">
      <h1 className="text-2xl font-bold text-center py-4 border-b border-gray-700">Admin Dashboard</h1>
      <nav className="mt-6">
        <NavLink
          to="/users"
          className={({ isActive }) =>
            `block px-6 py-3 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/rooms"
          className={({ isActive }) =>
            `block px-6 py-3 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          Rooms
        </NavLink>
        <NavLink
          to="/renters"
          className={({ isActive }) =>
            `block px-6 py-3 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          Renters
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;