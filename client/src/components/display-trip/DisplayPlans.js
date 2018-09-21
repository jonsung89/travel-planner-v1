import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect, Link } from 'react-router-dom'; // for when we need to delete a handle

import { getSelectedTrip } from "../../actions/tripActions";

class DisplayPlans extends Component {
  componentDidMount() {
    this.props.getSelectedTrip();
  }

  render() {
    const { trip } = this.props.trip;

    let displayPlansHeader;

    if (trip === null) {
      return <Redirect to='/dashboard' />;
    } else {
      const tripId = this.props.match.params.tripHandle;
      console.log("this is the _id of this trip: ", tripId);

      // const specificTrip = trip.filter(item => { return item._id === tripId });

      const specificTrip = trip.findIndex(item => item._id === tripId)
      // console.log(specificTrip); // index of the object in the array      

      displayPlansHeader = <div>
          <h2 className="display-4 text-center">
            Plans for {trip[specificTrip].handle}
          </h2>
          <p className="lead text-center">
            text text text
          </p>
        </div>;
    }
    

    return <div className="display-plans">
        <div className="container">
          <Link to="/dashboard" className="btn btn-secondary mb-3">Go Back</Link>
          {displayPlansHeader}
        </div>
      </div>;
  }
}

DisplayPlans.propTypes = {
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
  { getSelectedTrip }
)(withRouter(DisplayPlans));