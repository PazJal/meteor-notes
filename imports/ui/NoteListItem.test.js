import React from 'react';
const expect = require('chai').expect;
import { Meteor } from 'meteor/meteor';
import {mount} from 'enzyme';

import {spy} from 'sinon';
var chai = require("chai");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

import {NoteListItem} from './NoteListItem';

import {notes} from '../fixtures/fixtures';


if(Meteor.isClient){
  describe('NoteListItem' , function () {
    let Session;
    beforeEach(() => {
      Session = {
        set: spy()
      };
    });

    it('should render title and timestamp' , () => {
      const wrapper = mount(<NoteListItem note={notes[0] } Session={Session}/>);
      expect(wrapper.find('h5').text()).to.equal(notes[0].title);
      expect(wrapper.find('p').text()).to.equal('06/01/2019');
    });
    it('should set default title if no title set' ,() => {
      const wrapper = mount(<NoteListItem note={notes[1]} Session={Session}/>);
      expect(wrapper.find('h5').text()).to.equal('Untitled note');
      expect(wrapper.find('p').text()).to.equal('06/01/2019');
    });

    it('should call set on click' , () => {
      const wrapper = mount(<NoteListItem note={notes[1]} Session={Session}/>);
      wrapper.find('div').simulate('click');
      expect(Session.set).to.have.been.calledWith('selectedNoteId' , notes[1]._id);
    });
  });
}




