import { applyMiddleware, compose, createStore } from 'redux'

import rootReducer from '../reducers'

// thunk middleware is used when we want to return a function instead of an object in the action creators (think of async or delayed functions)
import thunk from 'redux-thunk'
// createStore() creates a Redux store that holds the complete state tree of your app.
// There should only be a single store in your app.
let finalCreateStore = compose(
  applyMiddleware(thunk)
)(createStore)


export default function configureStore(initialState = { }) {
  return finalCreateStore(rootReducer, initialState)
}
