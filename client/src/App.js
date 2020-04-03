import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ProtectedRoute, AuthRoute } from './util/Route_util';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute path="/login" component={Login} />
        <AuthRoute path="/signup" component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
