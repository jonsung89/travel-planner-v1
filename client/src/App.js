import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import { clearCurrentTrip } from './actions/tripActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import NavBar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateTrip from './components/create-trip/CreateTrip';
import CreatePlans from './components/create-plans/CreatePlans';
import DisplayPlans from './components/display-trip/DisplayPlans';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    let logoutUser = store.dispatch.logoutUser();
    store.dispatch(logoutUser());
    // Clear current trips
    store.dispatch(clearCurrentTrip());
    // Redirect to login
    window.location.href = '/';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <NavBar />
            <Route exact path="/" component={ Landing } />
              <div className="auth container mt-5">
                <Route exact path="/register" component={ Register } />
                <Route exact path="/login" component={ Login } />
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={ Dashboard } />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/create-trip" component={ CreateTrip } />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/create-plans/:tripHandle" component={CreatePlans} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/display-plans/:tripHandle" component={DisplayPlans} />
                </Switch>
              </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
