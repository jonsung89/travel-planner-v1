import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Redirect, Link } from "react-router-dom";
// import { getCurrentTrip } from "../../actions/tripActions";
import { getSelectedTrip } from "../../actions/tripActions";
import { addDestination } from "../../actions/tripActions";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class CreatePlans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // trip: '',
      location: '',
      dateFrom: '',
      dateTo: '',
      totalBudget: '',
      note: '',
      errors: {}
    }
  }

  componentDidMount() {
    this.props.getSelectedTrip();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ 
        errors: nextProps.errors
      })
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    // console.log('Submitted');
    const destData = {
      location: this.state.location,
      dateFrom: this.state.dateFrom,
      dateTo: this.state.dateTo,
      totalBudget: this.state.totalBudget,
      note: this.state.note
    };
    const id = this.props.match.params.tripHandle;
    this.props.addDestination(id, destData, this.props.history);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { trip } = this.props.trip;
    // console.log("these are the trips: ", trip);

    const { errors } = this.state;

    let createPlansHeader;

    if (trip === null) {
      return <Redirect to='/dashboard' />;
    } else {
      const tripId = this.props.match.params.tripHandle;
      // console.log("this is the _id of this trip: ", tripId);

      // const specificTrip = trip.filter(item => { return item._id === tripId });

      const specificTrip = trip.findIndex(item => item._id === tripId)
      // console.log(specificTrip); // index of the object in the array      

      createPlansHeader = (
        <div>
          <h2 className="display-4 text-center">Create Plans for {trip[specificTrip].handle}</h2>
          <p className="lead text-center">
                Let's get some information to create plans for your trip!
          </p>
          <small className="d-block pb-3">* = required fields</small>
        </div>
      );
    }

    return <div className="create-trip">
        <div className="container">
          <Link to ="/dashboard" className="btn btn-secondary mb-3">Go Back</Link>
          <div className="row">
            <div className="col-md-8 m-auto">
              {createPlansHeader}
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                <label htmlFor="input-location">Location</label>
                  <TextFieldGroup
                  placeholder="* Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  />
                <label htmlFor="input-from-date">From Date</label>
                  <TextFieldGroup
                    placeholder="* mm/dd/yyyy"
                    type="date"
                    name="dateFrom"
                    value={this.state.dateFrom}
                    onChange={this.onChange}
                    error={errors.dateFrom}
                  />
                <label htmlFor="input-to-date">To Date</label>
                  <TextFieldGroup
                    type="date"
                    placeholder="* mm/dd/yyyy"
                    name="dateTo"
                    value={this.state.dateTo}
                    onChange={this.onChange}
                    error={errors.dateTo}
                  />
                <label htmlFor="input-total-budget">Total Budget</label>
                  <TextFieldGroup
                    type="number"
                    placeholder="Total Budget"
                    name="totalBudget"
                    value={this.state.totalBudget}
                    onChange={this.onChange}
                    // error={errors.dateTo}
                  />
                <label htmlFor="input-notes">Notes</label>
                  <TextAreaFieldGroup 
                    placeholder="Notes"
                    name="note"
                    value={this.state.note}
                    onChange={this.onChange}
                    error={errors.note}
                  />
                  </div>

                <div className="mb-3">
                  <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>;
  }
}

CreatePlans.propTypes = {
  addDestination: PropTypes.func.isRequired,
  getSelectedTrip: PropTypes.func.isRequired,
  trip: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  trip: state.trip,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getSelectedTrip, addDestination }
)(withRouter(CreatePlans));