import { Meteor } from 'meteor/meteor';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import expect from 'expect';
import { mount, shallow } from 'enzyme';

import { Signup } from './Signup';

if(Meteor.isClient) {
  describe('Login', function () {
    it ('should show error messages', function () {
      const error = 'this is not working';
      const wrapper = mount(
        <MemoryRouter intialEntries={['/']} initialIndex={0}>
          <Signup createUser={() => {}}/>
        </MemoryRouter>
      );

      const signup= wrapper.find(Signup).node;

      signup.setState({ error });

      const errorMsg = wrapper.find('p').text();
      expect(errorMsg).toBe(error);

      signup.setState({ error: ''});
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call createUser with the form data', function() {
      const email = 'test@test.com';
      const password = 'password123';
      const spy = expect.createSpy();
      const wrapper = shallow(
          <Signup createUser={spy}/>
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

      expect(spy.calls[0].arguments[0]).toEqual({ email, password });

    });

    it('should set error if short password', function() {
      const email = 'test@test.com';
      const password = '123      ';
      const spy = expect.createSpy();
      const wrapper = shallow(
          <Signup createUser={spy}/>
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

      expect(wrapper.state('error').length).toNotBe(0);
    });

    it('should set createUser callback errors', function() {
      const password = 'password123!';
      const reason = 'this is why it failed';
      const spy = expect.createSpy();
      const wrapper = shallow( <Signup createUser={spy}/> );

      wrapper.find('[name="password"]').simulate('change', {
        target: {
          name: 'password',
          value: password
        }
      });

      wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
      });

      spy.calls[0].arguments[1]({ reason });
      expect(wrapper.state('error')).toBe(reason);

    });
  }); //end of describe block
}
