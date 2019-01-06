//npm imports:
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

//project imports:
import './../imports/api/users';
import './../imports/api/notes';
import './../imports/startup/simple-schema-config';


Meteor.startup(() => {
  // code to run on server at startup

});
