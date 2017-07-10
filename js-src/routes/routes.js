import React from 'react';
import { Router, Route, IndexRoute, browserHistory  } from 'react-router';
import Appointments from "../components/Appointments";
import AppointmentDetails from "../components/AppointmentDetails";

export default (
	<Route path="/" >

		<Route component={Appointments}>
			<IndexRoute component={Appointments}></IndexRoute>
		</Route>

	</Route>
)
