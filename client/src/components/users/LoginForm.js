import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../../graphql/mutations/user';
import { IS_LOGGED_IN, CURRENT_USER } from '../../graphql/queries/user';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
    variables: {
      email,
      password,
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginUser();
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
          className="bg-success-600 duration-150 hover:bg-success-400 py-2 rounded  transition-all text-white w-full"
          type="submit"
          disabled={loading}
        >
          Login
        </button>
      </form>
    </>
  );
};
