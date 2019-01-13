import React from 'react';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import propTypes from 'prop-types';
import {Session} from 'meteor/session';

export const NoteListHeader = (props) => {

  return (
    <div className="item-list__header">
      <button
        className="button"
        onClick={() => {
          props.meteorCall('notes.insert' , (err , res) => {
            if(res) {
              props.Session.set('selectedNoteId' , res);
            }
          });
        }}
      >
      Add note</button>
    </div>
  );

}

NoteListHeader.propTypes = {
  meteorCall: propTypes.func.isRequired,
  Session: propTypes.object.isRequired
}

export default withTracker(() => {
  return {
    meteorCall: Meteor.call,
    Session
  };

})(NoteListHeader);