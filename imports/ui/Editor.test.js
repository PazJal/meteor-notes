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
import {notes} from '../fixtures/fixtures';

import {Editor} from './Editor';

if(Meteor.isClient) {
  describe('Editor' , () => {
    let browserHistory;
    let call;
    beforeEach(() => {
      call = spy();
      browserHistory = {
        push: spy()
      };
    });

    it('should render pick note message' , () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Editor browserHistory={browserHistory} call={call} />
        </MemoryRouter>    
      );
      expect(wrapper.find('p').text()).to.equal('Pick a note to get started!');
    });

    it('should render note not found message' , () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} />
        </MemoryRouter>    
      );
      expect(wrapper.find('p').text()).to.equal('Note not found!');
    });

    it('should remove note' , () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]}/>
        </MemoryRouter>    
      );
      wrapper.find('button').simulate('click');
      expect(call).to.have.been.calledWith('notes.remove' , notes[0]._id);
      // expect(browserHistory.push).to.have.been.calledOnce;
    });

    it('shouold update the note body on text area change' , () => {
      const newBody = 'This is my new body text';
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]}/>
        </MemoryRouter>    
      );
      wrapper.find('textarea').simulate('change' , {
        target: {
          value: newBody
        }
      });
      expect(wrapper.find(Editor).state('body')).to.equal(newBody);
      expect(call).to.have.been.calledWith('notes.update' , notes[0]._id , {body: newBody});
    });


    it('shouold update the note title on input text change' , () => {
      const newTitle = 'This is my new title text';
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]}/>
        </MemoryRouter>    
      );
      wrapper.find('input').simulate('change' , {
        target: {
          value: newTitle
        }
      });
      expect(wrapper.find(Editor).state('title')).to.equal(newTitle);
      expect(call).to.have.been.calledWith('notes.update' , notes[0]._id , {title: newTitle});
    });

    it('should set state for a new note' , () => {
      // const wrapper = mount(
      //   <MemoryRouter initialEntries={['/']} initialIndex={0}>
      //     
      //   </MemoryRouter>    
      // );
      const wrapper = shallow(<Editor browserHistory={browserHistory} call={call} />);
      wrapper.setProps({
        selectedNoteId: notes[0]._id,
        note: notes[0]
      });

      expect(wrapper.state('body')).to.equal(notes[0].body);
      expect(wrapper.state('title')).to.equal(notes[0].title);

    });

    it('should not set state if note not provided' , () => {
      // const wrapper = mount(
      //   <MemoryRouter initialEntries={['/']} initialIndex={0}>
      //     
      //   </MemoryRouter>    
      // );
      const wrapper = shallow(<Editor browserHistory={browserHistory} call={call} />);
      wrapper.setProps({
        selectedNoteId: notes[0]._id
      });

      expect(wrapper.state('body')).to.equal('');
      expect(wrapper.state('title')).to.equal('');

    });

  });
}
