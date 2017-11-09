import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';


export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    this.props.loginWithPassword({email}, password, (err) => {
      if (err) {
        this.setState({error: 'Unable to login.'});
      } else {
        this.setState({error: ''});
        this.props.history.push('/Dashboard');
      }
    });
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Lnk</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="example@example.com"/>
            <input type="password" ref="password" name="password" placeholder="password"/>
          <button className="button">Login</button>
          </form>

          <Link to="/signup">Have an account?</Link>
        </div>
      </div>
    );
  }
};

Login.propTypes = {
  loginWithPassword: propTypes.func.isRequired
};

export default withRouter(createContainer((props) => {
  return {
    loginWithPassword: Meteor.loginWithPassword
  };
}, Login));
