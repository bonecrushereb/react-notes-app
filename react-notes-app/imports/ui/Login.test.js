import { Meteor } from 'meteor/meteor';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
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
          value: email
        }
      });
      wrapper.find('[name="password"]').simulate('change', {
        target: {
          value: password
        }
      });

      debugger;

      wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
      });

      expect(spy).toHaveBeenCalled;
      expect(spy.calls[0].arguments[0]).toEqual({ email });
      expect(spy.calls[0].arguments[1]).toBe('password123');

    });

    // it('should set loginWithPassword callback errors', function() {
    //   const spy = expect.createSpy();
    //   const wrapper = shallow( <Login loginWithPassword={spy}/> );
    //
    //   wrapper.find('form').simulate('submit', {
    //     preventDefault: () => {}
    //   });
    //
    //   debugger;
    //
    //   expect(wrapper.state('error')).toNotBe('');
    // });
  }); //end of describe block
}
