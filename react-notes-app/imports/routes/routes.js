import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router as Router, Switch, Route, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Session } from 'meteor/session';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const history = createBrowserHistory();

export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" privacy="unauth" render={props => (
          Meteor.userId() ? (
            <Redirect to="/Dashboard"/>
          ) : (
            <Login {...props} />
          )
        )}/>
      <Route exact path="/signup" privacy="unauth" render={props => (
          Meteor.userId() ? (
            <Redirect to="/Dashboard"/>
          ) : (
            <Signup {...props} />
          )
        )}/>
      <Route exact path="/Dashboard" privacy="auth" render={props => (
          !Meteor.userId() ? (
            <Redirect to="/"/>
          ) : (
            <Dashboard {...props}/>
          )
        )}/>
      <Route exact path="/Dashboard/:id" privacy="auth" render={props => (
            !Meteor.userId() ? (
              <Redirect to="/"/>
            ) : (
              Session.set('selectedNoteId', props.match.params.id),
              <Dashboard {...props}/>
            )
          )}/>
        <Route path="*" component={NotFound}/>
    </Switch>
</Router>
);
