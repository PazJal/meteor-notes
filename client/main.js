//NPM imports:
import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import {Session} from 'meteor/session';
//Project imports:
import { routes , onAuthChange} from './../imports/routes/routes';
import './../imports/startup/simple-schema-config';


Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  if(selectedNoteId){
    
  }
});

Meteor.startup(() => {
  Session.set('selectedNoteId' , undefined);
  ReactDOM.render(routes , document.getElementById('app'));
});