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

const unAuthenticatedPages = [ '/' , '/signup'];
const authenticatedPages =  ['/dashboard'];

const onEnterPublicPage = () => {
  console.log('Hello public!');
  if (Meteor.userId()) {
    browserHistory.replace('/dashboard');
  } else {
    browserHistory.replace('http://google.com');
  }
};

const onEnterPrivatePage = () => {
  console.log('Hello Again');
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
  else {
    browserHistory.replace('http://google.com');
  }
};

const onEnterNotePage = (nextState) => {
  console.log('Entered');
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
  else {
    browserHistory.replace('http://google.com');
    console.log(nextState);
  }
};

export const onAuthChange= (isAuthenticated) => {
  const pathname = browserHistory.location.pathname;
  const isUnauthenticatedPage = unAuthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

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
          <PublicRoute path="/" component={Login} onEnter={onEnterPublicPage} exact/>
          <PublicRoute path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
          <PrivateRoute path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage} exact/>
          <NoteRoute path="/dashboard/:id" component={Dashboard} onEnter={onEnterNotePage}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </div>
    </Router>
    
);

