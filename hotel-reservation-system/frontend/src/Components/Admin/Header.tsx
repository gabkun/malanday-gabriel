import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="ml-64 h-16 bg-white shadow flex items-center justify-between px-6 fixed w-full">
      <h2 className="text-xl font-semibold">Welcome, Admin</h2>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Logout</button>
    </div>
  );
};

export default Header;