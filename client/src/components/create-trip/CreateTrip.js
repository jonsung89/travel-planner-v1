import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
// import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
// import SelectListGroup from "../common/SelectListGroup";
// import InputGroup from "../common/InputGroup";
import { createTrip } from '../../actions/tripActions'

import './CreateTrip.css';

class CreateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
    const tripData = {
      handle: this.state.handle
    }
    this.props.createTrip(tripData, this.props.history);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="create-trip">
        <div className="container">
          <Link to="/dashboard" className="btn btn-secondary mb-3">
            Go Back
          </Link>
          <div className="row">
            <div className="col-md-8 m-auto">
              <h2 className="display-4 text-center">Create Your Trip</h2>
              <p className="lead text-center">
                Let's get some information to create your trip!
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
              <label htmlFor="input-trip-name">Trip Name</label>
                <TextFieldGroup placeholder="* Trip Name" name="handle" value={this.state.handle} onChange={this.onChange} error={errors.handle} info="A unique name of your trip." />
                <div className="mb-3">
                  <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateTrip.propTypes = {
  trip: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  trip: state.trip,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createTrip }
)(withRouter(CreateTrip));