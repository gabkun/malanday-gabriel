import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Rooms from './Rooms'; 
import Users from './Users';
import Rent from './Modal/Rent';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <Sidebar />
      <Header />
      <div className="ml-64 p-6">
        <Rooms />
        <Users />
        <Rent />
      </div>
    </div>
  );
};

export default AdminDashboard;
