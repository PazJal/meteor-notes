import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import propTypes from 'prop-types';
import {withTracker} from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';


export const PrivateHeader = (props) => {
  const imageSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';
  return (
    <div className="header">
      <div className="header__content">
        <img src={imageSrc} onClick={props.toggleMenu} className="header__nav-toggle"/>
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link--text" onClick={() => props.handleLogout()}>Logout</button>
      </div>
    </div>
  );
}

PrivateHeader.propTypes = {
  title: propTypes.string.isRequired,
  handleLogout: propTypes.func.isRequired,
  isNavOpen: propTypes.bool.isRequired,
  toggleMenu: propTypes.func.isRequired
}

export default withTracker(()=> {
  return {
    handleLogout: () =>Accounts.logout(),
    isNavOpen: Session.get('isNavOpen'),
    toggleMenu: () => Session.set('isNavOpen' , !Session.get('isNavOpen'))
  }
})(PrivateHeader);