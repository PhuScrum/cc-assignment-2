import React, { Component } from 'react';
import { PageHeader, ListGroup } from 'react-bootstrap';
import { API } from 'aws-amplify';
import './Home.css';
import Popup from "reactjs-popup";
import CreateLocation from './createLocation.js';



export default class CreateLocationPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
		};
	}
	componentDidMount() {
		console.log(this.props.isAuthenticated)
		//e
		console.log(this.props)
		this.props.testDropping()
		console.log(this.props.appdata.name)
		
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
				<PageHeader>Create a CleanUp Site! </PageHeader>
				<ListGroup>{!this.state.isLoading}</ListGroup>
				
				

				<CreateLocation 
				// spread attributes
					{...this.props} 
					google={this.props.google}
					center={{lat: this.props.appdata.lat, lng: this.props.appdata.lng}}
					height='300px'
					zoom={this.props.appdata.zoom}
				/>
				<p><i>Please note that one account will only be able create one location at a time.*</i></p>
				
			</div>
		);
	}

	render() {
		return <div className="Home">{!this.props.isAuthenticated ? this.renderTest() : this.renderTest()}</div>;
	}
}





