import React from 'react';
const expect = require('chai').expect;
import { Meteor } from 'meteor/meteor';
import {mount} from 'enzyme';

import NoteListItem from './NoteListItem';


if(Meteor.isClient){
  describe('NoteListItem' , function () {
    it('should render title and timestamp' , () => {
      const title = 'Test title';
      const updatedAt = 1546787205912;
      const wrapper =mount(<NoteListItem note={{title, updatedAt} }/>);
      expect(wrapper.find('h5').text()).to.equal(title);
      expect(wrapper.find('p').text()).to.equal('06/01/2019');
    });
    it('should set default title if no title set' ,() => {
      const updatedAt = 1546787205912;
      const wrapper =mount(<NoteListItem note={{ updatedAt} }/>);
      expect(wrapper.find('h5').text()).to.equal('Untitled note');
      expect(wrapper.find('p').text()).to.equal('06/01/2019');
    });
  });
}




