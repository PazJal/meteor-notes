//NPM imports:
import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import {Session} from 'meteor/session';
//Project imports:
import { routes , onAuthChange} from './../imports/routes/routes';
import './../imports/startup/simple-schema-config';

import {browserHistory} from '../imports/routes/routes';


Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const currentPagePrivacy = Session.get('currentPagePrivacy');
  console.log('Current' , currentPagePrivacy);
  onAuthChange(isAuthenticated , currentPagePrivacy);
});

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  Session.set('isNavOpen' , false);

  if(selectedNoteId){
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
  } else if(selectedNoteId ===''){
    browserHistory.replace('/dashboard');
  }
});

Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen');
  document.body.classList.toggle('isNavOpen' , isNavOpen);
});

Meteor.startup(() => {
  Session.set('selectedNoteId' , undefined);
  Session.set('isNavOpen' , false);
  ReactDOM.render(routes , document.getElementById('app'));
});