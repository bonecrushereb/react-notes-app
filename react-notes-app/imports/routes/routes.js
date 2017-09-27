import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router as Router, Switch, Route, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const history = createBrowserHistory();

export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={props => (
          Meteor.userId() ? (
            <Redirect to="/links"/>
          ) : (
            <Login {...props} />
          )
        )}/>
      <Route exact path="/signup" render={props => (
          Meteor.userId() ? (
            <Redirect to="/links"/>
          ) : (
            <Signup {...props} />
          )
        )}/>
      <Route exact path="/links" render={props => (
          !Meteor.userId() ? (
            <Redirect to="/"/>
          ) : (
            <Link {...props}/>
          )
        )}/>
      <Route component={NotFound}/>
    </Switch>
</Router>
);
