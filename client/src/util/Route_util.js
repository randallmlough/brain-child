import React from 'react';
import { Route, Redirect, withRout } from 'react-router-dom';
import { IS_LOGGED_IN } from '../graphql/queries/user';
import { useQuery } from '@apollo/react-hooks';

export const ProtectedRoute = ({ component: Component, path }) => {
  const { data, loading, error } = useQuery(IS_LOGGED_IN);

  if (loading) return <h1> Loading...</h1>;
  if (error) return <h1> Error </h1>;
  if (data.isLoggedIn) {
    return <Route path={path} component={Component} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export const AuthRoute = ({ component: Component, path }) => {
  const { data, loading, error } = useQuery(IS_LOGGED_IN);

  if (loading) return <h1> Loading...</h1>;
  if (error) return <h1> Error </h1>;
  if (data.isLoggedIn) {
    return <Redirect to="/dashboard" />;
  } else {
    return <Route path={path} component={Component} />;
  }
};
