import React from 'react';
import { Meteor } from 'meteor/meteor';
import propTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';

export const NoteList = (props) => {
  return (
    <div>
      <NoteListHeader/>
      NoteList { props.notes.length }
    </div>
  );
};

NoteList.propTypes = {
  notes: propTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('notes');

  return {
    notes: Notes.find().fetch()
  };
}, NoteList);
