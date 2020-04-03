import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { SIGNUP_USER } from '../../graphql/mutations/user';
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
      debugger;
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

  return (
    <>
      <h1> {errorMessage} </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signupUser();
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
        <input type="submit" value="Signup" disabled={loading} />
      </form>
    </>
  );
};
