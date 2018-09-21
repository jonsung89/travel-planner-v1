import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password2,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
    
  }

  render() {
    const { errors } = this.state;

    // const { user } = this.props.auth;

    return <div className="register">
        {/* {user ? user.username : null} */}
        <div className="container">
          <Link to="/" className="btn btn-secondary mb-3">
            Go Back
          </Link>
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your Travel Planner account!
              </p>
              <form onSubmit={this.onSubmit}>
              <label htmlFor="input-username">Username</label>
                <TextFieldGroup placeholder="Username" name="username" value={this.state.username} onChange={this.onChange} error={errors.username} />
              <label htmlFor="input-email">Email</label>
                <TextFieldGroup placeholder="Email" name="email" type="email" value={this.state.email} onChange={this.onChange} error={errors.email} />
              <label htmlFor="input-password">Password</label>
                <TextFieldGroup placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.onChange} error={errors.password} />
              <label htmlFor="input-password2">Confirm Password</label>
                <TextFieldGroup placeholder="Confirm Password" name="password2" type="password" value={this.state.password2} onChange={this.onChange} error={errors.password2} />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>;
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register));