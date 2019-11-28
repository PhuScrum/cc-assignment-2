import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';

import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import Signup from './containers/Signup';
import LoginWFacebook from './containers/LoginWFacebook';

import CreateLocationPage from './containers/CreateLocationPage';
import createLocation from './containers/createLocation';
import createVolunteer from './containers/createVolunteer';
import LocationDetails from './containers/LocationList/LocationDetails';
import LocationCard from './containers/LocationList/LocationCard';
//testing
import CreateLocationInfo from './containers/createLocationInfo'

export default ({ childProps }) => (
	<Switch>
		<AppliedRoute path="/" exact component={Home} props={childProps} />
		<AppliedRoute path="/createLocation" exact component={createLocation} props={childProps} />
		<AppliedRoute path="/login" exact component={Login} props={childProps} />
		<AppliedRoute path="/signup" exact component={Signup} props={childProps} />
		<AppliedRoute path="/loginWFacebook" exact component={LoginWFacebook} props={childProps} />
		<AppliedRoute path="/CreateLocationPage" exact component={CreateLocationPage} props={childProps} />
		<AppliedRoute path="/createVolunteer" exact component={createVolunteer} props={childProps} />
		<AppliedRoute path='/location/:id' exact component={LocationDetails} props={childProps} />
		<AppliedRoute path="/createLocatonInfo" exact component={CreateLocationInfo} props={childProps} />
		{/* Finally, catch all unmatched routes */}
		<Route component={NotFound} />
	</Switch>
);
