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
import createVolunteer from './containers/RunReport';
import LocationDetails from './containers/LocationList/LocationDetails';
import LocationCard from './containers/LocationList/LocationCard';
import DownloadRedirect from './containers/LocationList/DownloadRedirect'
import CreateLocationInfo from './containers/createLocationInfo'
// testing emailjs
import Emailjs from './containers/Emailjs'
import EmailjsRedirect from './containers/EmailjsRedirect'
// running report
import ReportPage from './containers/RunReport'
// About us - to demonstrate local caching
import AboutUs from './containers/AboutUs'
// Resource - to demonstrate local caching
import Resource from './containers/Resource'


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
		{/* test */}
		<AppliedRoute path="/Emailjs" exact component={Emailjs} props={childProps} />
		<AppliedRoute path="/EmailjsRedirect" exact component={EmailjsRedirect} props={childProps} />
		{/* running reportx */}
		<AppliedRoute path="/ReportPage" exact component={ReportPage} props={childProps} />
		<AppliedRoute path="/AboutUs" exact component={AboutUs} props={childProps} />
		<AppliedRoute path="/Resource" exact component={Resource} props={childProps} />
		
		<AppliedRoute path="/DownloadRedirect" exact component={DownloadRedirect} props={childProps} />
		{/* Finally, catch all unmatched routes */}
		{/* <Route component={NotFound} /> */}
	</Switch>
);
