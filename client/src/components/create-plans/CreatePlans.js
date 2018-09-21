import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
// import { getCurrentTrip } from "../../actions/tripActions";
import { getSelectedTrip } from "../../actions/tripActions";

import TextFieldGroup from "../common/TextFieldGroup";

class CreatePlans extends Component {
  componentDidMount() {
    this.props.getSelectedTrip();
  }

  render() {
    const { trip } = this.props.trip;
    // console.log("these are the trips: ", trip);

    const { errors } = this.props.errors;

    let createPlansHeader;

    if (trip === null) {
      return <Redirect to='/dashboard' />;
    } else {
      const tripId = this.props.match.params.tripHandle;
      // console.log("this is the _id of this trip: ", tripId);

      // const specificTrip = trip.filter(item => { return item._id === tripId });
      // console.log(specificTrip);
      // console.log(specificTrip.handle)
      const specificTrip = trip.findIndex(item => item._id === tripId)
      // console.log(specificTrip); // index of the object in the array
      
      // console.log(trip[specificTrip].handle);

      createPlansHeader = (
        <div>
          <h1 className="display-4 text-center">Create Plans for {trip[specificTrip].handle}</h1>
          <p className="lead text-center">
                Let's get some information to create your trip!
          </p>
          <small className="d-block pb-3">* = required fields</small>
        </div>
      );
    }

    return <div className="create-trip">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              {createPlansHeader}
              <form>
                <div className="mb-3">
                  <input type="submit" value="submit" className="btn btn-info btn-block mt-4" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>;
  }
}

CreatePlans.propTypes = {
  trip: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  trip: state.trip,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getSelectedTrip }
)(withRouter(CreatePlans));