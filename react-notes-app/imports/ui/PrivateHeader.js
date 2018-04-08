import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import createHistory from 'history/createBrowserHistory';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

  const PrivateHeader = (props) => {
    const navImageSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';
    return (
      <div className="header">
        <div className="header__content">
          <img src={navImageSrc} onClick={props.handleNavToggle}/>
          <h1 className="header__title">{props.title}</h1>
          <button className="button button--link-text" onClick={ props.handleLogout }>Logout</button>
        </div>
      </div>
    );
  };

PrivateHeader.propTypes = {
  title: propTypes.string.isRequired,
  handleLogout: propTypes.func.isRequired,
  isNavOpen: propTypes.bool.isRequired,
  handleNavToggle: propTypes.func.isRequired
};

export default withRouter(createContainer((props) => {
  return {
    handleLogout: () => {
      Accounts.logout(),
      props.history.push('/')
    },
    handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
    isNavOpen: Session.get('isNavOpen')
  };
}, PrivateHeader));
