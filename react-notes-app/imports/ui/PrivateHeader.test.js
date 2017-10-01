import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { withRouter } from 'react-router-dom';

import PrivateHeader from './PrivateHeader';

if(Meteor.isClient) {
  describe('PrivateHeader', function() {
    it('should set button text to logout', function() {
      const wrapper = mount( <PrivateHeader title="Test title"/> );
      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('Logout');
    });

    it('should use title prop as h1 text', function() {
      const title = 'Title test here';
      const wrapper = mount( <PrivateHeader title={title}/> );
      const h1Text = wrapper.find('h1').text();

      expect(h1Text).toBe('Title test here')
    })
  });
}
