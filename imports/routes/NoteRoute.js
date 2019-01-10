import React from 'react';
import {Route , Redirect} from 'react-router-dom';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';


export class NoteRoute extends React.Component {
  componentDidMount() {
    const auth = this.props.privacy;
    Session.set('currentPagePrivacy' , auth); 
  }

  componentDidUpdate(prevProps, PrevState) {
    this.componentDidMount();
    
  }

  componentWillUnmount() {
    Session.set('selectedNoteId' , undefined);
  }

  render(){
    const {component: Component , ...rest} = this.props;
    const isAuthenticated = Meteor.userId();
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
}

export default NoteRoute;