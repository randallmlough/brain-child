import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { SIGNUP_USER, LOGIN_USER } from '../../graphql/mutations/user';
import { IS_LOGGED_IN, CURRENT_USER } from '../../graphql/queries/user';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [signupUser, { loading, error }] = useMutation(SIGNUP_USER, {
    variables: {
      email,
      password,
    },
    update(cache, { data: { signUp } }) {
      if (!signUp) setErrorMessage('Invalid Credentials');
      else {
        localStorage.setItem('token', signUp.token);
      }
    },
    onError() {
      setErrorMessage('Something went wrong');
    },
    refetchQueries: [{ query: CURRENT_USER }, { query: IS_LOGGED_IN }],
  });

  const [demoLogin] = useMutation(LOGIN_USER, {
    variables: {
      email: 'demo@example.com',
      password: 'password',
    },
    update(cache, { data: { login } }) {
      if (!login) setErrorMessage('Invalid Credentials');
      else {
        localStorage.setItem('token', login.token);
      }
    },
    onError() {
      setErrorMessage('Something went wrong');
    },
    refetchQueries: [{ query: CURRENT_USER }, { query: IS_LOGGED_IN }],
  });

  return (
    <>
      <div className="w-full text-center mb-1">
        <h1 className="text-danger-600 text-sm">{errorMessage}</h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signupUser();
        }}
      >
        <div className="mb-3">
          <label className="sr-only" htmlFor="inputEmail">
            Email
          </label>
          <input
            id="inputEmail"
            className="bg-gray-100 border-2 focus:border-primary-300 focus:outline-none p-2 placeholder-gray-600 rounded text-sm w-full"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div className="mb-5">
          <label className="sr-only" htmlFor="inputPassword">
            Password
          </label>
          <input
            id="inputPassword"
            className="bg-gray-100 border-2 focus:border-primary-300 focus:outline-none p-2 placeholder-gray-600 rounded text-sm w-full"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button
          className="bg-success-600 duration-150 hover:bg-success-400 py-2 rounded text-white transition-all w-full"
          type="submit"
          disabled={loading}
        >
          Sign up
        </button>
      </form>
      <button
        className="bg-success-600 duration-150 hover:bg-success-400 py-2 mt-2 rounded text-white transition-all w-full"
        onClick={() => demoLogin()}
        disabled={loading}
      >
        Demo Login
      </button>
      <div className="text-center text-gray-600 my-3">
        <Link to="/login">Did you mean to login?</Link>
      </div>
    </>
  );
};
