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
  });
}
