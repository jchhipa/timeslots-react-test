import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';

import appointments from './appointmentsReducer';

// The combineReducers helper function turns an object whose values are different reducing functions into a single reducing function you can pass to createStore.
const appReducer = combineReducers({
	form, // <---- reduxForm Mounted at 'form'
 	appointments
});

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer;

