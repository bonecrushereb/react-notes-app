import { Meteor } from 'meteor/meteor';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import expect from 'expect';
import { mount, shallow } from 'enzyme';

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
      const wrapper = shallow(
          <Login loginWithPassword={spy}/>
      );


      wrapper.find('[name="email"]').simulate('change', {
        target: {
          name: 'email',
          value: email
        }
      });
      wrapper.find('[name="password"]').simulate('change', {
        target: {
          name: 'password',
          value: password
        }
      });


      wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
      });

      expect(spy).toHaveBeenCalled;
      expect(spy.calls[0].arguments[0]).toEqual({ email });
      expect(spy.calls[0].arguments[1]).toBe('password123');

    });

    it('should set loginWithPassword callback errors', function() {
      const history = createBrowserHistory();
      const spy = expect.createSpy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Login loginWithPassword={spy} history={spy} />
        </MemoryRouter>
      );

      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[2]({error: 'Error'});
      expect(wrapper.find(Login).state).toNotEqual({});

      spy.calls[0].arguments[2]();
      expect(wrapper.find(Login).state).toEqual({ error: ''});
    });
  }); //end of describe block
}
