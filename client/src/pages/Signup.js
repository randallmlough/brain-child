import React from 'react';
import SignupForm from '../components/users/SignupForm';

const Signup = () => {
  return (
    <div className="lg:bg-gray-100 lg:h-full lg:min-h-screen lg:py-10">
      <div className="w-full md:w-6/12 lg:w-4/12 mx-auto bg-white lg:shadow-lg rounded p-8">
        <div className="flex justify-center mb-5">
          <h1 className="font-bold text-gray-600">Sign up for your account</h1>
        </div>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
