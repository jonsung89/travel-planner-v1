import { GET_TRIP, TRIP_LOADING, CLEAR_CURRENT_TRIP } from "../actions/types";

const initialState = {
  trip: null,
  trips: null,
  loading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case TRIP_LOADING: 
      return {
        ...state,
        loading: true
      };
    case GET_TRIP: 
      return {
        ...state,
        trip: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_TRIP:
      return {
        ...state,
        trip: null
      }
    default: 
      return state;
  }
}