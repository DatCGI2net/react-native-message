import {PROJECTED_API, STORAGE_KEY} from './../consts';


export const apiMiddleware = store => next => action => {
  // Pass all actions through by default
  next(action);
  switch (action.type) {
    // In case we receive an action to send an API request
    case 'GET_REQUEST_DATA':
      // Dispatch GET_REQUEST_DATA_LOADING to update loading state
      store.dispatch({type: 'GET_REQUEST_DATA_LOADING'});
      // Make API call and dispatch appropriate actions when done
      fetch(PROJECTED_API)
        .then(response => response.json())
        .then(data => next({
          type: 'GET_REQUEST_DATA_RECEIVED',
          data
        }))
        .catch(error => next({
          type: 'GET_REQUEST_DATA_ERROR',
          error
        }));
      break;
    // Do nothing if the action does not interest us
    default:
      break;
  }
};


export const reducer = (state = { requests: [], loading: true }, action) => {
  switch (action.type) {
    case 'GET_REQUEST_DATA_LOADING':
      return {
        ...state,                   // keep the existing state,
        loading: true,              // but change loading to true
      };
    case 'GET_REQUEST_DATA_RECEIVED':
      return {
        loading: false,             // set loading to false
        movies: action.data.requests, // update requests array with reponse data
      };
    case 'GET_REQUEST_DATA_ERROR':
      return state;
    default:
      return state;
    }
};
