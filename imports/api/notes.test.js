import {Meteor} from 'meteor/meteor';
const expect = require('chai').expect;

import {Notes} from './notes';
if(Meteor.isServer) {
  describe('notes' , function () {

    const noteOne = {
      _id: 'testNoteId1',
      title: 'My title',
      body: 'My body for note',
      updatedAt: 0,
      userId: 'testUserId1'
    };

    const noteTwo = {
      _id: 'testNoteId2',
      title: 'Things to buy',
      body: 'A couch',
      updatedAt: 0,
      userId: 'testUserId2'
    };

    beforeEach(function () {
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    it('should insert new note' , function() {
      const userId = 'test1';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({userId});
      const note = Notes.findOne({_id , userId });
      expect(note).to.exist;
    });

    it('should not insert note if not authenticated' , function () {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).to.throw();
    });

    it('should remove note' , function () {
      Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId} , [noteOne._id]);
      expect(Notes.findOne({_id: noteOne._id})).to.not.exist;
    });

    it('should not remove note if unauthenticated' , function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({} , [noteOne._d]);
      }).to.throw();
    });

    it('should not remove note if invalid id' , function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({_id:noteOne.userId} , []);
      }).to.throw();
    });

    it('should update note' , function () {
      const title = 'This is an updated title.';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      } , [
        noteOne._id,
        {title}
      ]);
      const note = Notes.findOne(noteOne._id);
      expect(note.updatedAt).to.be.above(noteOne.updatedAt);
      expect(note).to.include({
        title,
        body: noteOne.body
      });
    });

    it('should throw an error if the update object has unexpected properties.' , function () {
      const title = 'This is an updated title.';
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      } , [
        noteOne._id,
        {
          title,
          name: 'Some name'
        }
      ])}).to.throw(); 
    });

    it('should not update note if user was not the creator.' , function () {
      const title = 'This is an updated title.';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'testId'
      } , [
        noteOne._id,
        {title}
      ]);
      const note = Notes.findOne(noteOne._id);
      expect(note).to.include(noteOne);
    });

    it('should not update a note if no authenticated' , function () {
      const title = 'This is an updated title.';
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [
          noteOne._id,
          {title}
        ])
      }).to.throw();
    });

    it('should not update a note if the _id is not valid' , function () {
      const title = 'This is an updated title.';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      } , [
        '1234',
        {title}
      ]);
      const note = Notes.findOne(noteOne._id);
      expect(note).to.include(noteOne);
    });

    it('should return a users notes' , function () {
      const res = Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId});
      const notes = res.fetch();

      expect(notes.length).to.equal(1);
      expect(notes[0]).to.deep.equal(noteOne);

    });

    it('should return no notes for user that has none' , function () {
      const res = Meteor.server.publish_handlers.notes.apply({userId: '1234'});
      const notes = res.fetch();

      expect(notes.length).to.equal(0);
    });

  });
}