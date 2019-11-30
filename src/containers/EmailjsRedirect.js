import React, { Component } from 'react';
import { PageHeader, ListGroup } from 'react-bootstrap';
import { CSVLink, CSVDownload } from "react-csv";
import { Modal, Button } from 'antd';

export default class EmailjsRedirect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			members: localStorage.getItem('members')
		}

	}




	renderTest() {
		const JSON = require('circular-json');
		const json = JSON.stringify(this.state.members);
		return (
			<div className="test">

				<PageHeader>Your support request has been sent </PageHeader>
                <label>Please be patience, our team is on the way</label>
                <br/>
                <p>Click home to go back to front page</p>
                <br/>
		  <br/>
		  <br/>
		  <br/> <br/>
		  <br/>
		  <br/>
		  <br/> <br/>
		  <br/>
		  <br/>
		
		  <br/>
		  <br/>
		  <br/>
		  <br/>
		  <br/>
		  <br/>
		  <br/>
		  <br/>
			</div>
		);
	}

	render() {
		return <div className="Home">{!this.props.isAuthenticated ? this.renderTest() : this.renderTest()}</div>;
	}
}
