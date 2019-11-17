import React, { Component } from 'react';
import { PageHeader, ListGroup } from 'react-bootstrap';
import { API } from 'aws-amplify';
import './Home.css';


export default class createVolunteer extends Component {
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
				<PageHeader>Volunteer yourself with your friends!</PageHeader>
				<ListGroup>{!this.state.isLoading && this.renderTestAPI(this.state.testApiCall)}</ListGroup>
				
			</div>
		);
	}

	render() {
		return <div className="Home">{!this.props.isAuthenticated ? this.renderTest() : this.renderTest()}</div>;
	}
}
