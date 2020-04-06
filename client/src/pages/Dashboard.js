import React from 'react';
import Navbar from '../components/navigation/Navbar';
import BoardIndex from '../components/boards/BoardIndex';

const Dashboard = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <BoardIndex />
    </div>
  );
};

export default Dashboard;
