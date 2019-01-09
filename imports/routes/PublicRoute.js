import React from 'react';
import {Route , Redirect} from 'react-router-dom';
import {Meteor} from 'meteor/meteor';


export const PublicRoute = ({component: Component , ...rest}) => {
  const isAuthenticated = Meteor.userId();

  return (
    <Route 
      {...rest}
      render={(props) => (
        //Authentication check:
        (!isAuthenticated) ? 
        //Case Authenticated:
        <Component {...props} /> :
        //Case unauthenticated:
        <Redirect 
          to="/dashboard"
        />
      )
      }
    />
  );
};

export default PublicRoute;