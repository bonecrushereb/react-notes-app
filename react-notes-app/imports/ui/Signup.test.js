// import { Meteor } from 'meteor/meteor';
// import React from 'react';
// import expect from 'expect';
// import { mount, shallow } from 'enzyme';
// import { MemoryRouter } from 'react-router-dom';
//
// import { Signup }from './Signup';
//
// if(Meteor.isClient) {
//   describe('Signup', function() {
//     it('should show error messages', function() {
//       const error = 'This is not working';
//       const wrapper = mount(
//         <MemoryRouter intialEntries={['/']} initalIndex={0}>
//           <Signup createUser={() => {}}/>
//         </MemoryRouter>
//       );
//       const signup = wrapper.find(Signup).node;
//
//       signup.setState({ error });
//       expect(wrapper.find('p').text()).toBe(error);
//
//       signup.setState({ error: '' });
//       expect(wrapper.find('p').length).toBe(0);
//     });
//
//     it('should call createUser with the form data', function() {
//       const email = 'ben@test.com';
//       const password =  'password123';
//       const spy = expect.createSpy();
//       const wrapper = mount(
//         <MemoryRouter intialEntries={['/']} initalIndex={0}>
//           <Signup createUser={spy}/>
//         </MemoryRouter>
//       );
//
//       const signup = wrapper.find(Signup).node;
//
//       signup.refs['email'].value = email;
//       signup.refs['password'].value = password;
//       wrapper.find('form').simulate('submit');
//
//       expect(spy.calls[0].arguments[0]).toEqual({ email, password });
//     });
//
//     // it('should set error if short password', function() {
//     //   const email = 'ben@test.com';
//     //   const password =  '123            ';
//     //   const spy = expect.createSpy();
//     //   const wrapper = mount(
//     //     <MemoryRouter intialEntries={['/']} initalIndex={0}>
//     //       <Signup createUser={spy}/>
//     //     </MemoryRouter>
//     //   );
//     //
//     //   const signup = wrapper.find(Signup).node;
//     //
//     //   signup.refs['email'].value = email;
//     //   signup.refs['password'].value = password;
//     //   wrapper.find('form').simulate('submit');
//     //
//     //   expect(error.state('error').length).toBeGreaterThan(0);
//     // });
//
//     // it('should set createUser callback errors', function() {
//     //   const password = 'password123!';
//     //   const reason = 'This is why it failed';
//     //   const spy = expect.createSpy();
//     //   const wrapper = shallow(
//     //     // <MemoryRouter intialEntries={['/']} initalIndex={0}>
//     //     //   <Signup createUser={spy}/>
//     //     // </MemoryRouter>
//     //    <Signup createUser={spy}/>
//     //   );
//     //
//     //   const Signup = wrapper.find(Signup).node;
//     //   signup.refs['password'].value = password;
//     //   wrapper.find('form').simulate('submit', {
//     //     preventDefault: () => {}
//     //   });
//     //
//     //   spy.calls[0].arguments[1]({ reason });
//     //   expect(wrapper.state('error')).toBe(reason);
//     //
//     //   spy.calls[0].arguments[1]();
//     //   expect(wrapper.state('error').length).toBe(0);
//     // });
//   });
// }
