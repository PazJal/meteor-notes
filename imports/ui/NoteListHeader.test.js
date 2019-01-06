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

import {NoteListHeader} from './NoteListHeader';

if(Meteor.isClient) {
  describe('NoteListHeader' , () => {
    it('should call meteorCall on click.' , () => {
      const meteorCallSpy = spy();
      const wrapper = mount(<NoteListHeader meteorCall={meteorCallSpy}/>);
      wrapper.find('button').simulate('click');
      expect(meteorCallSpy).to.have.been.calledWith('notes.insert');
    });
  });
}
