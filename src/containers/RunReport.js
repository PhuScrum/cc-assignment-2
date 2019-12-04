import React, { Component } from 'react';
import { PageHeader, ListGroup } from 'react-bootstrap';
import './Home.css';

import InputCard from './LocationList/InputCard'
const urlLocation = 'https://ccassignment2-env.np6spcuxdf.ap-southeast-1.elasticbeanstalk.com/location'

export default class ReportPage extends Component {
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
				console.log(data)
			})
	}

	


	async componentDidMount() {
		this.fetchLocation()
		
	}

	


	

	renderTest() {
		console.log(this.state.location)
		var inputListing = this.state.location.map(unit => <div>

            <hr /> 
            <InputCard {...this.props} data={unit} />

        </div>)
		return (
			<div className="test">
				<PageHeader>Outcome of each sites</PageHeader>
				<label>If the value is 0, the owner has probably not entered the value of outcome.</label>
				{inputListing}
				</div>
		);
	}

	render() {
		return this.renderTest();
	}
}
