import {Meteor} from 'meteor/meteor';
import React from 'react';
const expect = require('chai').expect;
import {mount , shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {spy} from 'sinon';
var chai = require("chai");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);
configure({ adapter: new Adapter() });

import {MemoryRouter} from 'react-router-dom';

import {Login} from './Login';


if(Meteor.isClient){
  describe('Login' , function () {
    it('should show error messages' , function() {
      const err = 'This is not working';
      const wrapper = shallow(<Login loginWithPassword={() => {}}/>);
      wrapper.setState({error : err});

      const paragraph = wrapper.find('p').text();
      expect(paragraph).to.equal(err);

      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).to.equal(0);
    });

    it('should call loginWithPassword with the form data' , function () {
      const email = 'andrew@test.com';
      const password = 'password123';
      const mySpy = spy();
      const wrapper = mount( 
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Login loginWithPassword={mySpy} /> 
        </MemoryRouter>);
      
      // const emailInput = wrapper.find('input').get(0);
      // const passwordInput = wrapper.find('input').at(1);
      // console.log('hello', emailInput.val());
      // passwordInput.simulate('change' , {target: {value: password}});
      // console.log('ref' , wrapper.find('input').get(0));
      
      wrapper.find(Login).instance().refs['email'].value = email;
      wrapper.find(Login).instance().refs['password'].value = password;
      
      wrapper.find('form.boxed-view__form').simulate('submit');


      // wrapper.ref('email').value = email;
      // wrapper.ref('password').value = password;
      // wrapper.find('form').simulate('submit');

      expect(mySpy).to.have.been.calledWith({email} , password);
    });

    it('should set loginWithPassword callback errors', function () {
      const mySpy = spy();
      const wrapper = mount( 
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Login loginWithPassword={mySpy} /> 
        </MemoryRouter>);
      wrapper.find('form.boxed-view__form').simulate('submit');
      const spyCalls = mySpy.getCalls();
      //grabs the callback from the time the spy was called and call it to activate the callback.
      spyCalls[0].args[2]({});
      expect(wrapper.find(Login).state('error')).to.not.equal(''); 

      spyCalls[0].args[2]();
      expect(wrapper.find(Login).state('error')).to.equal(''); 

    });
  });
}