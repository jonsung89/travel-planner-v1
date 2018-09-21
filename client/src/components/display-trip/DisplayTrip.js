import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'; // for when we need to delete a handle

class DisplayTrip extends Component {
  render() {
    // const trip = this.props.trip.map(item => (
    //   <tr key={item._id}>
    //     <td>{item.handle}</td>
    //   </tr>
    // ))
    return <div>
        <h4 className="mb-4">Created Trips</h4>
        <button className="btn">test</button>
      </div>;
  }
}

export default connect(null)(withRouter(DisplayTrip));