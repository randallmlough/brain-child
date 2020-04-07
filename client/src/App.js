import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ProtectedRoute, AuthRoute } from './util/Route_util';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Splash from './pages/Splash';
import Modal from './pages/Modal';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute path="/login" component={Login} />
        <AuthRoute path="/signup" component={Signup} />
        <Route path="/modal" component={Modal} />
        <Route path="/" component={Splash} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
