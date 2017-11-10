import { Meteor } from 'meteor/meteor';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import expect from 'expect';
import { mount } from 'enzyme';

import { Login } from './Login';

if(Meteor.isClient) {
  describe('Login', function () {
    it ('should show error messages', function () {
      const error = 'this is not working';
      const wrapper = mount(
        <MemoryRouter intialEntries={['/']} initialIndex={0}>
          <Login loginWithPassword={() => {}}/>
        </MemoryRouter>
      );

      const login = wrapper.find(Login).node;

      login.setState({ error });

      const errorMsg = wrapper.find('p').text();
      expect(errorMsg).toBe(error);

      login.setState({ error: ''});
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call loginWithPassword with the form data', function() {
      const email = 'test@test.com';
      const password = 'password123';
      const spy = expect.createSpy();
      const wrapper = mount(
        <MemoryRouter intialEntries={['/']} initialIndex={0}>
          <Login loginWithPassword={spy}/>
        </MemoryRouter>
      );

      wrapper.find(Login).node.refs['email'].value = email;
      wrapper.find(Login).node.refs['password'].value = password;

      wrapper.find('form').simulate('submit');

      expect(spy).toHaveBeenCalled;
      expect(spy.calls[0].arguments[0]).toEqual({ email });

    });

    it('should set loginWithPassword callback errors', function() {
      const wrapper = mount(
        <MemoryRouter intialEntries={['/']} initialIndex={0}>
          <Login loginWithPassword={() => {}}/>
        </MemoryRouter>
      );
    });
  }); //end of describe block
}
