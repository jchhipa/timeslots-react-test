import React from 'react';
import ReactDOM from 'react-dom';

require("!style-loader!css-loader!sass-loader!./scss/styles.scss");

import configureStore from './store/store'
import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router';
import routes from './routes/routes'

let store = configureStore()

//localStorage.removeItem("timeslots")

ReactDOM.render(
  <Provider store={store}>
  <Router history={browserHistory} routes={routes}></Router>
</Provider>, document.getElementById('app'))