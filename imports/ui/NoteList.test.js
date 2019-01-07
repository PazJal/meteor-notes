import React from 'react';
const expect = require('chai').expect;
import {mount} from 'enzyme';
import {Meteor} from 'meteor/meteor';

import {NoteList} from './NoteList';

import {notes} from '../fixtures/fixtures';

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