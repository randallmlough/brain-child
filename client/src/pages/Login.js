import React from 'react';
import LoginForm from '../components/users/LoginForm';

const Login = () => {
  return (
    <div className="lg:bg-gray-100 lg:h-full lg:min-h-screen lg:py-10">
      <div className="w-full md:w-6/12 lg:w-4/12 mx-auto bg-white lg:shadow-lg rounded p-8">
        <div className="flex justify-center mb-5">
          <h1 className="font-bold text-gray-600">Log in to your account</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
