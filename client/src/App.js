import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./sass/main.scss";
import setAuthToken from "./utils/setAuthToken";

import NoAuthRoute from "./components/routers/NoAuthRoute";
import PrivateRoute from "./components/routers/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import Dashboard from "./components/dashboard/Dashboard";
import Settings from "./components/settings/Settings";
import FriendDash from "./components/friends/FriendDash";

import AuthState from "./context/auth/AuthState";
import NoteState from "./context/notification/NoteState";
import FriendState from "./context/friend/FriendState";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

class App extends Component {
  render() {
    return (
      <AuthState>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <NoAuthRoute exact path="/" component={Landing} />
              <NoAuthRoute exact path="/login" component={Login} />
              <NoAuthRoute exact path="/register" component={Register} />
              <PrivateRoute exact path="/settings" component={Settings} />
              <PrivateRoute
                exact
                path="/dashboard"
                component={Dashboard}
                context={NoteState}
              />
              <PrivateRoute
                exact
                path="/friends"
                component={FriendDash}
                context={FriendState}
              />
            </Switch>
            <Switch />
            <Footer />
          </div>
        </Router>
      </AuthState>
    );
  }
}

export default App;
