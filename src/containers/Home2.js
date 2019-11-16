import React, { Component } from 'react';
import { PageHeader, ListGroup } from 'react-bootstrap';
import { API } from 'aws-amplify';
import './Home.css';

import Map from './createLocation.js';

export default class Home2 extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			testApiCall: []
		};
	}

	

	testApiCall() {
		return API.get('testApiCall', '/hello');
	}

	renderTestAPI(testApiCall) {
		console.log(testApiCall);
		return testApiCall.message;
	}

	renderLander() {
		return (
			<div className="lander">
				<h1>Test web app</h1>
				<p>A simple react test app</p>
			</div>
			
		);
	}

	renderTest() {
		return (
			<div className="test">
				<PageHeader>Create a CleanUp Site!</PageHeader>
				<ListGroup>{!this.state.isLoading && this.renderTestAPI(this.state.testApiCall)}</ListGroup>
				<Map
					google={this.props.google}
					center={{lat: 10.8231, lng: 106.6297}}
					height='300px'
					zoom={15}
				/>
			</div>
		);
	}

	render() {
		return <div className="Home">{!this.props.isAuthenticated ? this.renderTest() : this.renderTest()}</div>;
	}
}
