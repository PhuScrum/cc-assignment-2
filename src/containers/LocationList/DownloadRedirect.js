import React, { Component } from 'react';
import { PageHeader, ListGroup } from 'react-bootstrap';

export default class DownloadRedirect extends Component {
	constructor(props) {
		super(props);

		
	}


	 

	renderTest() {
		return (
			<div className="test">
				<PageHeader>Your Download Is Ready! </PageHeader>
				
				
			</div>
		);
	}

	render() {
		return <div className="Home">{!this.props.isAuthenticated ? this.renderTest() : this.renderTest()}</div>;
	}
}
