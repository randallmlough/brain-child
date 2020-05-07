import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from './logo.svg';
import { ReactComponent as Organize } from './organizing.svg';
import cards from './cards.jpg';
import crud from './crud.jpg';
import iphone from './iphone.png';

const Navbar = (props) => {
  return (
    <header className="bg-transparent fixed w-full bg-primary-500">
      <div className="flex justify-between items-center px-6 py-3">
        <div>
          <Link to="/" className="flex items-center">
            <Logo className="fill-current h-12 mr-3" />
            <div className="font-bold text-white text-2xl">BrainChild</div>
          </Link>
        </div>
        <nav className="ml-auto">
          <Link className="self-center text-white mx-3 font-bold" to="/login">
            Login
          </Link>
          <Link
            className="text-primary-500 bg-white p-2 rounded font-bold"
            to="/signup"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};
const Splash = () => {
  return (
    <>
      <Navbar />
      <section className="bg-gradient-splash pt-32 pb-16">
        <div className="max-w-5xl mx-auto px-10">
          <div className="flex">
            <div className="md:w-1/2 text-white">
              <h1 className="font-bold leading-tight lg:text-5xl text-4xl">
                BrainChild provides you with a beautiful space to organize your
                thoughts and ideas
              </h1>
              <p className="mb-12 text-2xl">
                BrainChild boards, lists, and cards enable you to organize and
                prioritize your projects in a fun, flexible, and rewarding way.
              </p>
              <Link
                className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-2xl rounded-md inline-block"
                to="/signup"
              >
                Sign Up - It's Free!
              </Link>
            </div>
            <div className="md:w-1/2">
              <Organize className="fill-current ml-3 hidden md:block" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-10">
          <div className="flex flex-wrap">
            <div className="md:w-1/2 order-2 md:order-1 self-center">
              <h2 className="font-bold leading-tight lg:text-4xl text-4xl text-gray-800 mb-3">
                Organize your cards
              </h2>
              <p className="mb-6 text-2xl text-gray-700">
                BrainChild boards, lists, and cards enable you to organize and
                prioritize your projects in a fun, flexible, and rewarding way.
              </p>
              <Link
                className="px-5 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold text-xl rounded-md inline-block"
                to="/signup"
              >
                Start doing
              </Link>
            </div>
            <div className="md:w-1/2 flex-0 order-1 md:order-2 md:pl-10">
              <img src={cards} alt="" className="rounded shadow-lg" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-10">
          <div className="flex flex-wrap">
            <div className="md:w-1/2 flex-0 md:pr-10">
              <img src={crud} alt="" className="rounded shadow-lg" />
            </div>
            <div className="md:w-1/2 self-center">
              <h2 className="font-bold leading-tight lg:text-4xl text-4xl text-gray-800 mb-3">
                Update, Edit, and Delete
              </h2>
              <p className="mb-6 text-2xl text-gray-700">
                Dive into the details by adding notes, due dates, and labels.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-10">
          <div className="flex flex-wrap">
            <div className="md:w-1/2 order-2 md:order-1 self-center">
              <h2 className="font-bold leading-tight lg:text-4xl text-4xl text-gray-800 mb-3">
                Mobile First Design
              </h2>
              <p className="mb-6 text-2xl text-gray-700">
                Whether you're on the go or at your desk, BrainChild is
                available when and wherever your need it.
              </p>
            </div>
            <div className="md:w-1/2 flex-0 order-1 md:order-2">
              <img src={iphone} alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-10">
          <div className="flex justify-center">
            <div className="md:w-2/3 order-2 md:order-1 text-center">
              <h2 className="font-bold leading-tight lg:text-4xl text-4xl text-gray-800 mb-3">
                Start Organizing Today
              </h2>
              <p className="mb-6 text-2xl text-gray-700">
                Sign up and see how productive you can be.
              </p>
              <Link
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xl rounded-md inline-block"
                to="/signup"
              >
                Get Started - It's Free!
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Splash;
