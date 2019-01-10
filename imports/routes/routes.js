//NPM imports:
import {Meteor} from 'meteor/meteor';
import React from 'react';
// import { Router , Route , browserHistory} from 'react-router';

import { Router , Route , Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

export const browserHistory = createHistory();

//Project imports:
import Signup from './../ui/Signup';
import Dashboard from './../ui/Dashboard';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';

import PrivateRoute from '../routes/PrivateRoute';
import PublicRoute from '../routes/PublicRoute';
import NoteRoute from '../routes/NoteRoute';


export const onAuthChange= (isAuthenticated , currentPagePrivacy) => {
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth';

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard') ;
  }
  if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
}


export const routes = (
  
    <Router history={browserHistory}>
      <div>


    
        <Switch>
          <PublicRoute path="/" component={Login} privacy="unauth" exact/>
          <PublicRoute path="/signup" component={Signup} privacy="unauth"/>
          <PrivateRoute path="/dashboard" component={Dashboard} privacy="auth" exact/>
          <NoteRoute path="/dashboard/:id" component={Dashboard} privacy="auth"/>
          <Route path="*" component={NotFound}/>
        </Switch>

      </div>
    
    </Router>
    
);

