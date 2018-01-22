import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import propTypes from 'prop-types';

import { Notes } from '../api/notes';

export class Editor extends React.Component {
  render () {
    return (
      <div>
        <h1>Editor</h1>
      </div>
    );
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
