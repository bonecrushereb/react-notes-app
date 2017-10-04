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

      login.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call loginWithPassword with the form data', function() {
      const email = 'ben@test.com';
      const password =  'password123';
      const spy = expect.createSpy();
      const wrapper = mount(
        <MemoryRouter intialEntries={['/']} initalIndex={0}>
          <Login loginWithPassword={spy}/>
        </MemoryRouter>
      );

      const login = wrapper.find(Login).node;

      login.refs['email'].value = email;
      login.refs['password'].value = password;

      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email });
      expect(spy.calls[0].arguments[1]).toBe(password);
    });

    it('should set loginWithPassword callback errors', function() {
      const spy = expect.createSpy();
      const wrapper = mount(
        <MemoryRouter intialEntries={['/']} initalIndex={0}>
          <Login loginWithPassword={spy}/>
        </MemoryRouter>
      );

      console.log(wrapper.find('form.boxed-view__form').simulate('submit'));

      spy.calls[0].arguments[2]({});
      expect(wrapper.state('error')).toNotBe(null);

    });
  });
}
