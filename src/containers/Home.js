import React, { Component } from 'react';
import { PageHeader, ListGroup } from 'react-bootstrap';
import { API } from 'aws-amplify';
import './Home.css';
import Map2 from './markedMap';

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true
		};
	}

	async componentDidMount() {
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
				<Map2 />
				<ListGroup>{!this.state.isLoading}</ListGroup>
				
			</div>
			
			</div>
		);
	}

	render() {
		return <div className="Home">{this.props.isAuthenticated ? this.renderTest() : this.renderLander()}</div>;
	}
}
