import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentTrip } from '../../actions/tripActions'
import Spinner from '../common/Spinner';
// import DisplayTrip from '../display-trip/DisplayTrip';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentTrip();
  }

  

  render() {
    const { user } = this.props.auth;
    const { trip, loading } = this.props.trip;

    let dashboardContent;


    if(trip === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(trip).length > 0) {
        
        console.log(trip);
        console.log(trip[0]);
        
        const trips = trip.map((item) => {
          return <div className="col-sm-6 mb-6" key={item._id}>
              <div className="card text-white bg-dark mb-4">
                <div className="card-body">
                  <h5 className="card-title">{item.handle}</h5>
                  <Link to={"/create-plans/" + item._id} className="btn btn-info">
                    Plans
                  </Link>
                </div>
              </div>
            </div>;
        });

        dashboardContent = (
          <div className="dashboard-content">
            <p className="lead text-muted">
              Where do you want to go next?
            </p>
            <Link to="/create-trip" className="btn btn-lg btn-info">
              Create Trip
            </Link>
            <div className="container mt-4">
              <div className="row">
                {/* <DisplayTrip handle={trip}/> */}
                {trips}
              </div>
            </div>
          </div>
        );
      } else {
        dashboardContent = (
          <div className="dashboard-content">
            <p className="lead text-muted">
              Where do you want to go next?
            </p>
            <Link to="/create-trip" className="btn btn-lg btn-info">
              Create Trip
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Hello {user.username}!</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentTrip: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  trip: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  trip: state.trip,
  auth: state.auth
})


export default connect(mapStateToProps, { getCurrentTrip })(Dashboard);