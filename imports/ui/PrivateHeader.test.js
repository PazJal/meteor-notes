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

import {PrivateHeader} from './PrivateHeader';

if(Meteor.isClient) {
  describe('PrivateHeader' , function () {
    it('should set button text to logout' , function() {
      const wrapper = mount( <PrivateHeader title="Test" handleLogout={() =>{}}/> );

      const buttonText = wrapper.find('button').text();

      expect(buttonText).to.equal('Logout');
    });

    it('should use the title prop as h1 text' , function () {
      const title = 'Money Money Money';
      const wrapper = mount (<PrivateHeader title={title} handleLogout={() =>{}}/>);
      const titleText = wrapper.find('h1').text();
      expect(titleText).to.equal(title);
    });

    // it('should call the function' , function () {
    //   const mySpy = spy();
    //   mySpy(1, 3, 4);
    //   mySpy('Andrew');
    //   console.log(mySpy.args);
    //   expect(mySpy).to.have.callCount(2);
    // });

    it('should call handleLogout on click' , function () {
      const logoutSpy = spy();
      const wrapper = mount(<PrivateHeader title="title" handleLogout={logoutSpy}/>);

      wrapper.find('button').simulate('click');
      expect(logoutSpy).to.have.been.calledOnce; 

    });
  });
}