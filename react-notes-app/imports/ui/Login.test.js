import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { Login }from './Login';

if(Meteor.isClient) {
  describe('Login', function() {
    it('should show error messages', function() {
      const error = 'This is not working';
      const wrapper = mount(
        <MemoryRouter intialEntries={['/']} initalIndex={0}>
          <Login loginWithPassword={() => {}}/>
        </MemoryRouter>
      );

      const login = wrapper.find(Login).node;

      login.setState({ error });

      expect(wrapper.find('p').text()).toBe(error);
    });
  });
}
