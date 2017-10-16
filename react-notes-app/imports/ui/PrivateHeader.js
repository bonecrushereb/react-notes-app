import React from 'react';
import { Accounts } from 'meteor/accounts-base';
// import createHistory from 'history/createBrowserHistory';
import propTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

  const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
      <button className="button button--link-text" onClick={ props.handleLogout() }>Logout</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: propTypes.string.isRequired,
  handleLogout: propTypes.func.isRequired
};

export default withRouter(createContainer(() => {
  return {
    handleLogout: () => {
      Accounts.logout(),
      this.props.history.push('/')
    }
  };
}, PrivateHeader));
