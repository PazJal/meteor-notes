import React from 'react';
import moment from 'moment';
import propTypes from 'prop-types';
import {Session} from 'meteor/session';
import {withTracker} from 'meteor/react-meteor-data';

export const NoteListItem = (props) => {
  const className = props.note.selected ? 'item item--selected' : 'item';

  return (
    <div className={className} onClick={() => {
      props.Session.set('selectedNoteId' , props.note._id);
    }}>
      <h5 className="item__title">{props.note.title || 'Untitled note'}</h5>
      <p className="item__subtitle">{moment(props.note.updatedAt).format('DD/MM/YYYY')}</p>
    </div>
  );
};

NoteListItem.propTypes = {
  note: propTypes.object.isRequired,
  Session: propTypes.object.isRequired 
};

export default withTracker(() => {
  return {Session};
})(NoteListItem);
