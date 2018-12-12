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

if(Meteor.isClient){
  describe('Login' , function () {
    it('should show error messages' , function() {
      const err = 'This is not working';
      const wrapper = mount(<)
    });
  });
}