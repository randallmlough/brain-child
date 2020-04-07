import React from 'react';
import Navbar from '../navigation/Navbar';

const Test = () => {
  return (
    <div className="w-full h-full min-h-screen bg-primary-500">
      <div className="w-full transparent-black px-1 py-1">
        <Navbar />
      </div>
      <div>
        <p> THIS IS A TEST </p>
      </div>
    </div>
  );
};

export default Test;
