import React from 'react';
import Icon from '../components/ui/Icon';

const Error = () => {
  return (
    <div className="bg-danger-400 w-full h-full min-h-screen flex items-center">
      <div className="mt-10 w-full">
        <div className="text-center">
          <Icon className="text-white text-6xl" icon="times" />
        </div>
        <div className="text-center text-white text-2xl"> Page Not Found </div>
      </div>
    </div>
  );
};

export default Error;
