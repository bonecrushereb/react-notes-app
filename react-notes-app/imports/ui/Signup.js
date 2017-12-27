import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { withRouter } from 'react-router-dom';
import { createContainer } from 'meteor/react-meteor-data';

export class Signup extends React.Component {
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

    if (password.length < 9) {
      return this.setState({error: 'Password must be more then 8 characters long'});
    }

    this.props.createUser({email, password}, (err) => {
      if (err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
        this.props.history.push('/dashboard');
      }
    });
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Create an account</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="example@example.com"/>
            <input type="password" ref="password" name="password" placeholder="password"/>
            <button className="button">Create Account</button>
          </form>

          <Link to="/">Already have an account?</Link>
        </div>
      </div>
    );
  }
};

Signup.propTypes = {
  createUser: propTypes.func.isRequired
};

export default withRouter(createContainer((props) => {
  return {
    createUser: Accounts.createUser
  };
}, Signup));
