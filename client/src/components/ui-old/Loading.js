import React from 'react';
import Icon from './Icon';

const Loading = () => {
  return (
    <div className="bg-primary-200 h-full w-full min-h-screen flex items-center">
      <div className="w-full text-center">
        <Icon className="text-white text-6xl" icon="circle-notch" spin />
      </div>
    </div>
  );
};

export default Loading;
