import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect, Link } from 'react-router-dom'; // for when we need to delete a handle
import Moment from 'react-moment';
import { getSelectedTrip } from "../../actions/tripActions";

import './DisplayPlans.css';

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
      // console.log("this is the _id of this trip: ", tripId);
      // const specificTrip = trip.filter(item => { return item._id === tripId });
      const specificTrip = trip.findIndex(item => item._id === tripId)
      // console.log(specificTrip); // index of the object in the array      

      const dests = trip[specificTrip].destination;
      const displayLocations = dests.map(item => {
        // location: item.location
        return (
          <div className="col-md-6 mb-6" key={item._id}>
            <br />
            <div className="card border-dark mb-4">
              <div className="card-header text-white bg-dark">
                <Moment format="MM/DD/YYYY">{item.dateFrom}</Moment> - <Moment format="MM/DD/YYYY">
                  {item.dateTo}
                </Moment>
              </div>
              <div className="card-body text-dark">
                <h5 className="card-title">{item.location}</h5>
                <p className="card-text">{item.note}</p>
                <button className="btn btn-info">
                  Total Budget: $ {item.totalBudget}
                </button>
              </div>
            </div>
          </div>
        );
      })
      
      // console.log('this is the list of destinations: ', dests);
      
      displayPlansHeader = <div className="display-content">
          <h2 className="display-4 text-center m-5">
            Plans for {trip[specificTrip].handle}
          </h2>
            {displayLocations}
        </div>;
    }
    

    return (
      <div className="display-plans">
        <div className="container m-4">
          <Link to="/dashboard" className="btn btn-secondary mb-3">Go Back</Link>
          <div className="row">
            <div className="col-md-12">
              {displayPlansHeader}          
            </div>
          </div>
        </div>
      </div>
    );
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