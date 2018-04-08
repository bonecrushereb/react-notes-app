import { Meteor } from 'meteor/meteor';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import expect from 'expect';
import { mount } from 'enzyme';

import PrivateHeader  from './PrivateHeader';

if(Meteor.isClient) {
  describe('PrivateHeader', function() {

    it('should set button text to logout', function() {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <PrivateHeader title="Test title" handleLogout={() => {}}/>
        </MemoryRouter>
      );
      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('Logout');
    });

    it('should use title prop as h1 text', function() {
      const title = 'Title test here';
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <PrivateHeader title="Test title" handleLogout={() => {}}/>
        </MemoryRouter>
      );
      const h1Text = wrapper.find('h1').text();

      expect(h1Text).toBe('Test title');
    });

    it('should call handleLogout on click', function() {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/Dashboard']} initialIndex={0}>
          <PrivateHeader title="Test title" handleLogout={() => {}}/>
        </MemoryRouter>
      );

      wrapper.find('button').simulate('click');

      expect(wrapper.find('PrivateHeader').nodes[0].props.history.entries[1].pathname).toBe('/');
    });
  });
}
