import React from 'react';
import Icon from './Icon';

const Loading = () => {
  return (
    <div className="bg-primary-200 h-full w-full flex items-center absolute z-40">
      <div className="w-full text-center">
        <Icon className="text-white text-6xl" icon="circle-notch" spin />
      </div>
    </div>
  );
};

export default Loading;
