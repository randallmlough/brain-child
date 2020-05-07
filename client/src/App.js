import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ProtectedRoute, AuthRoute } from './util/Route_util';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Splash from './pages/Splash/';
import Dashboard from './pages/Dashboard';
import BoardDisplay from './pages/BoardDisplay';
// import Loading from './components/ui/Loading';
import Error from './pages/Error';
// import Test from './components/ui/Test';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute path="/login" component={Login} />
        <AuthRoute path="/signup" component={Signup} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/boards/:boardId" component={BoardDisplay} />

        <AuthRoute exact path="/" component={Splash} />
        <Route path="/" component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
