import { Meteor } from 'meteor/meteor';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import expect from 'expect';
import { mount } from 'enzyme';

import { Editor } from './Editor';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
  describe('Editor', function() {
    let history;
    let call;

    beforeEach(function() {
      call = expect.createSpy();
      history = {
        push: expect.createSpy()
      };
    });

    it('should render pick note message', function() {
      const wrapper = mount(<Editor history={history} call={call}/>);
      expect(wrapper.find('p').text()).toBe('Pick or create a note to get started.');
    });

    it('should render not found message', function() {
      const wrapper = mount(<Editor history={history} call={call} selectedNoteId={notes[0]._id}/>);
      expect(wrapper.find('p').text()).toBe('Note not found.');
    });

    it('should remove note', function() {
      const wrapper = mount(<Editor history={history} call={call} selectedNoteId={notes[0]._id} note={notes[0]}/>);

      wrapper.find('button').simulate('click');

      expect(history.push).toHaveBeenCalledWith('/dashboard');
      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
    });

    it('should update the note body on textarea change', function() {
      const wrapper = mount(<Editor history={history} call={call} selectedNoteId={notes[0]._id} note={notes[0]}/>);

    });
  }); //end of describe
}
