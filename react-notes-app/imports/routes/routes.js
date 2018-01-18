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
      <Route exact path="/" render={props => (
          Meteor.userId() ? (
            <Redirect to="/Dashboard"/>
          ) : (
            <Login {...props} />
          )
        )}/>
      <Route exact path="/signup" render={props => (
          Meteor.userId() ? (
            <Redirect to="/Dashboard"/>
          ) : (
            <Signup {...props} />
          )
        )}/>
      <Route exact path="/Dashboard" render={props => (
          !Meteor.userId() ? (
            <Redirect to="/"/>
          ) : (
            <Dashboard {...props}/>
          )
        )}/>
        <Route exact path="/Dashboard" render={props => (
           !Meteor.userId() ? (
             <Redirect to="/"/>
           ) : (
             <Dashboard {...props}/>
           )
         )}/>
       <Route exact path="/Dashboard/:id" render={props => (
           !Meteor.userId() ? (
             <Redirect to="/"/>
           ) : (
             Session.set('selectedNoteId', props.match.params.id)
           )
         )}/>
      <Route component={NotFound}/>
    </Switch>
</Router>
);
