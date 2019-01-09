import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import propTypes from 'prop-types';

import {Notes} from '../api/notes';

export class Editor extends React.Component {
  
  render() {
    if(this.props.note){
      return(
        <p>We got the note</p>
      )
    } else {
      return (
        <p>{this.props.selectedNoteId ? 'Note not found!' : 'Pick a note to get started!'}</p>
      ); 
    }
  }
}

Editor.propTypes = {
  note: propTypes.object,
  selectedNoteId: propTypes.string
}

export default withTracker(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId)
  };
})(Editor);