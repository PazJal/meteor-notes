//Libs:
import React from 'react';

//Project imports:
import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';

export default () => {
  return (
    <div>
      <PrivateHeader title="Dashboard"/>
      <div className="page-content">  
        <NoteList />
      </div>
    </div>
  );
};