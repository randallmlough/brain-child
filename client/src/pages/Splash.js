import React from 'react';
import { Link } from 'react-router-dom';

const Splash = () => {
  return (
    <div className="bg-gradient-splash h-full min-h-screen p-4">
      <div className>
        <div className="flex justify-end">
          <Link className="self-center text-white mx-3" to="/login">
            Login
          </Link>
          <Link className="text-primary-500 bg-white p-2 rounded" to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
      <div className="my-10 font-bold lg:text-4xl md:text-4xl sm:text-4xl text-white text-center px-8">
        Branchild provides you with a beautiful space to organize your thoughts,
        leading to more productivity, and in turn,
        <div className="hover:text-purple-300 italic duration-300"> bliss.</div>
      </div>
    </div>
  );
};

export default Splash;
