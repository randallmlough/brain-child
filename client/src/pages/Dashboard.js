import React from 'react';
import Navbar from '../components/navigation/Navbar';
import BoardIndex from '../components/boards/BoardIndex';

const Dashboard = () => {
  return (
    <div className="w-full h-full min-h-screen bg-white">
      <div className="w-full bg-primary-500 px-1 py-1">
        <Navbar />
      </div>
      <BoardIndex />
    </div>
  );
};

export default Dashboard;
