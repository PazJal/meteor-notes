import React from 'react';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import propTypes from 'prop-types';

export const NoteListHeader = (props) => {

  return (
    <div>
      <button
        onClick={() => {
          props.meteorCall('notes.insert');
        }}
      >
      Add note</button>
    </div>
  );

}

NoteListHeader.propTypes = {
  meteorCall: propTypes.func.isRequired
}

export default withTracker(() => {
  return {
    meteorCall: Meteor.call
  };

})(NoteListHeader);