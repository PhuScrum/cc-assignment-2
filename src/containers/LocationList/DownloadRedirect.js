import React, { Component } from 'react';
import { PageHeader, ListGroup } from 'react-bootstrap';
import { CSVLink, CSVDownload } from "react-csv";
import { Modal, Button } from 'antd';

export default class DownloadRedirect extends Component {
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

				<PageHeader>Your Download Is Ready! </PageHeader>

				<CSVLink
					data={json}
					filename={"my-file.csv"}
					className="btn btn-primary"
					target="_blank"
				>
					Click Here to Download
          </CSVLink>

			

			</div>
		);
	}

	render() {
		return <div className="Home">{!this.props.isAuthenticated ? this.renderTest() : this.renderTest()}</div>;
	}
}
