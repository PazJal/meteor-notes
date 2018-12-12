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

import {Signup} from './Signup';


if(Meteor.isClient){
  describe('Signup' , function () {
    it('should show error messages' , function() {
      const err = 'This is not working';
      const wrapper = mount(<Signup createUser={() => {}}/>);
      wrapper.setState({error : err});

      const paragraph = wrapper.find('p').text();
      expect(paragraph).to.equal(err);

      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).to.equal(0);
    });

    it('should call createUser with the form data' , function () {
      const email = 'andrew@test.com';
      const password = 'password123';
      const mySpy = spy();
      const wrapper = mount(<Signup createUser={mySpy}/>);
      wrapper.ref('email').value = email;
      wrapper.ref('password').value = password;
      wrapper.find('form').simulate('submit');

      expect(mySpy).to.have.been.calledWith({email , password});
    });

    it('should set error if the password is short' , function () {
      const email = 'andrew@test.com';
      const password = 'password     ';
      const mySpy = spy();
      const wrapper = mount(<Signup createUser={mySpy}/>);
      wrapper.ref('email').value = email;
      wrapper.ref('password').value = password;
      wrapper.find('form').simulate('submit');
      expect(wrapper.state('error')).to.not.be.equal('');
    });
    
    it('should set createUser callback errors', function () {
      const password = 'password123!';
      const reason = 'Failed for a reason';
      const mySpy = spy();
      const wrapper = mount(<Signup createUser={mySpy}/>);
      wrapper.ref('password').value = password;
      wrapper.find('form').simulate('submit');
      const spyCalls = mySpy.getCalls();
      //grabs the callback from the time the spy was called and call it to activate the callback.
      spyCalls[0].args[1]({reason});
      expect(wrapper.state('error')).to.equal(reason); 

      spyCalls[0].args[1]();
      expect(wrapper.state('error')).to.equal(''); 

    });
  });
}