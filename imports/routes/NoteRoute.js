import React from 'react';
import {Route , Redirect} from 'react-router-dom';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';


export const NoteRoute = ({component: Component , ...rest}) => {
  const isAuthenticated = Meteor.userId();
  console.log('Route params' , rest);
  if(isAuthenticated){
    Session.set('selectedNoteId' , rest.computedMatch.params.id);
  }

  return (
    <Route 
      {...rest}
      render={(props) => (
        //Authentication check:
        isAuthenticated ? 
        //Case Authenticated:
        <Component {...props} /> :
        //Case unauthenticated:
        <Redirect 
          to="/"
        />
      )
      }
    />
  );
};

export default NoteRoute;