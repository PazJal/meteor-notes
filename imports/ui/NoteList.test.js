import React from 'react';
const expect = require('chai').expect;
import {mount} from 'enzyme';
import {Meteor} from 'meteor/meteor';

import {NoteList} from './NoteList';

const notes = [
  {
    _id: 'testNoteId1',
    title: 'Test title 1',
    body: '',
    updatedAt: 0,
    userId: 'testUserId1'
  },{
    _id: 'testNoteId2',
    title: 'Test title 2',
    body: 'Test body number 2',
    updatedAt: 0,
    userId: 'testUserId2'
  }
];

if(Meteor.isClient){
  describe('NoteList' , () => {
    it('should render NoteListItem for each note', () => {
      const wrapper = mount(<NoteList notes={notes} />);

      expect(wrapper.find('NoteListItem').length).to.equal(2);
      expect(wrapper.find('NoteListEmptyItem').length).to.equal(0);
    });
    it('shouold render NoteListEmptyItem if there are no notes' , () => {
      const wrapper = mount(<NoteList notes={[]} />);

      expect(wrapper.find('NoteListItem').length).to.equal(0);
      expect(wrapper.find('NoteListEmptyItem').length).to.equal(1);
    });
  });
}