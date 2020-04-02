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
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Login" disabled={loading} />
      </form>
    </>
  );
};
