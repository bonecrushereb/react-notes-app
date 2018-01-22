import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import propTypes from 'prop-types';

import { Notes } from '../api/notes';

export class Editor extends React.Component {
  render () {
    if (this.props.note) {
      return (
        <p>we got the note</p>
      );
    } else if (this.props.selectedNoteId) {
      return (
        <p>Note not found.</p>
      );
    } else {
      return (
        <p>Pick or Create a note to get started.</p>
      );
    }
  }
};

Editor.propTypes = {
  notes: propTypes.object,
  selectedNoteId: propTypes.string
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId)
  };
}, Editor);
