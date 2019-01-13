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
import {notes} from '../fixtures/fixtures';


if(Meteor.isClient) {
  describe('NoteListHeader' , () => {
    let meteorCallSpy, session;
    beforeEach(()=> {
      meteorCallSpy = spy();
      Session = {
        set: spy()
      }
    })
  
    it('should call meteorCall on click.' , () => {
      const wrapper = mount(<NoteListHeader meteorCall={meteorCallSpy} Session={Session}/>);
      wrapper.find('button').simulate('click');
      meteorCallSpy.getCall(0).args[1](undefined , notes[0]._id);
      expect(meteorCallSpy.getCall(0).args[0]).to.equal('notes.insert');
      expect(Session.set).to.have.been.calledOnceWith('selectedNoteId', notes[0]._id);

    });

    it('should not set session for failed insert' , () => {
      const wrapper = mount(<NoteListHeader meteorCall={meteorCallSpy} Session={Session}/>);
      wrapper.find('button').simulate('click');
      meteorCallSpy.getCall(0).args[1]('Error');
      expect(meteorCallSpy.getCall(0).args[0]).to.equal('notes.insert');
      expect(Session.set).to.not.have.been.called;

    });
  });
}
