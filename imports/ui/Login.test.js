import {Meteor} from 'meteor/meteor';
import React from 'react';
const expect = require('chai').expect;
import {mount} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {spy} from 'sinon';
var chai = require("chai");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);
configure({ adapter: new Adapter() });

import {Login} from './Login';


if(Meteor.isClient){
  describe('Login' , function () {
    it('should show error messages' , function() {
      const err = 'This is not working';
      const wrapper = mount(<Login loginWithPassword={() => {}}/>);
      wrapper.setState({error : err});

      const paragraph = wrapper.find('p').text();
      expect(paragraph).to.equal(err);

      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).to.equal(0);
    });
  });
}