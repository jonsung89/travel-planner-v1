import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errors: {}
    };
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password,
    }
    this.props.loginUser(userData)
  }


  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="login-container">
          <Link to="/" className="btn btn-secondary mb-3">
            Go Back
          </Link>
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign into your Travel Planner account!
              </p>
              <form onSubmit={this.onSubmit}>
                <label htmlFor="input-username">Username</label>
                <TextFieldGroup placeholder="Username" name="username" value={this.state.username} onChange={this.onChange} error={errors.username} />
                <label htmlFor="input-password">Password</label>
                <TextFieldGroup placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.onChange} error={errors.password} />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);

