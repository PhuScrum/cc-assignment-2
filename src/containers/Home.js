import React, { Component } from 'react';
import { PageHeader, ListGroup, Row, Col } from 'react-bootstrap';
import { API } from 'aws-amplify';
import './Home.css';
import MarkedMap from './markedMap.js';
import LocationList from './LocationList'
import { Marker } from 'google-maps-react';
const urlLocation = 'http://localhost:8080/location'

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			location: []

		};
	}


	fetchLocation() {
		console.log('fetch location')
		fetch(urlLocation)
			.then(response => response.json())
			.then(data => {
				this.setState({ location: data })
				console.log(this.state.location.address)
			})
	}

	


	async componentDidMount() {
		console.log(this.props.isAuthenticated)
		this.fetchLocation()
		if (!this.props.isAuthenticated) {
			return;
		}
		this.setState({ isLoading: false });
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
			<div>
				<div className="test">
					<PageHeader>Welcome to Viet Nam Sach Va Xanh.</PageHeader>
					<p>Here are the current registered locations to select from.</p>
					
					<Row>
						<Col sm={8}>
							<MarkedMap
							data={this.state}
							google={this.props.google}
							center={{ lat: 10.8231, lng: 106.6297 }}
							height='300px'
							zoom={8}>
						</MarkedMap>
						</Col>
						<Col sm={4}>
							<LocationList data={this.state}/>
						</Col>
					</Row>

					<ListGroup>{!this.state.isLoading}</ListGroup>

				</div>

			</div>
		);
	}

	render() {
		return <div className="Home">{this.props.isAuthenticated ? this.renderTest() : this.renderLander()}</div>;
	}
}
