import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';

import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import Signup from './containers/Signup';
import LoginWFacebook from './containers/LoginWFacebook';

import Home2 from './containers/Home2';

export default ({ childProps }) => (
	<Switch>
		<AppliedRoute path="/" exact component={Home} props={childProps} />
		<AppliedRoute path="/login" exact component={Login} props={childProps} />
		<AppliedRoute path="/signup" exact component={Signup} props={childProps} />
		<AppliedRoute path="/loginWFacebook" exact component={LoginWFacebook} props={childProps} />
		<AppliedRoute path="/Home2" exact component={Home2} props={childProps} />
		{/* Finally, catch all unmatched routes */}
		<Route component={NotFound} />
	</Switch>
);
