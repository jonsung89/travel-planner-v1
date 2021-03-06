import axios from 'axios';

import { GET_TRIP, TRIP_LOADING, CLEAR_CURRENT_TRIP, GET_ERRORS } from './types';

// Get all the trips
export const getCurrentTrip = () => dispatch => {
  dispatch(setTripLoading());
  axios
    .get('/api/trips')
    .then(res => 
      dispatch({
        type: GET_TRIP,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_TRIP,
        payload: {}
      })
    );
}

export const getSelectedTrip = () => dispatch => {
  axios
    .get('/api/trips')
    .then(res =>
      dispatch({
        type: GET_TRIP,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TRIP,
        payload: {}
      })
    );
}

// Create trip
export const createTrip = (tripData, history) => dispatch => {
  axios
    .post('/api/trips', tripData)
    .then(res => history.push('/dashboard'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })  
    );
} 


// Add destination
export const addDestination = (id, destData, history) => dispatch => {
  axios
    .post(`/api/trips/destination/${id}`, destData)
    .then(res => history.push('/dashboard')) 
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// Delete trip
export const deleteTrip = (id, history) => dispatch => {
  axios
    .delete(`/api/trips/${id}`)
    .then(res => history.push('/dashboard'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// Trip loading
export const setTripLoading = () => {
  return {
    type: TRIP_LOADING
  }
}

// Clear trip
export const clearCurrentTrip = () => {
  return {
    type: CLEAR_CURRENT_TRIP
  }
}