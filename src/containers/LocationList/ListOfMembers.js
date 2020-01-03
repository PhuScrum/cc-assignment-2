import React, { Component } from 'react'
import { Modal, Button } from 'antd';
// import CsvDownloader from 'react-csv-downloader';
import { CSVLink, CSVDownload } from "react-csv";

import { Link, withRouter } from 'react-router-dom';

import SingleMember from './SingleMember'
import ContactAllMembers from './ContactAllMembers'

export default class ListOfMembers extends Component {
  constructor(props){
    super(props)
    this.state ={
      members:localStorage.getItem('members'),
      locationId: this.props.data.locationId
        
        
    }
}

  state = { visible: false };

 


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false, 
    });
  };
  windowOnload() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}
  render() {
    const JSON = require('circular-json');
    const memberListing = this.props.data.members.map(unit => <SingleMember data={unit} location={this.state} />)
    const memberEmail = this.props.data.members
    // console.log('here', this.props.data.name)
    const json = JSON.stringify(this.state.members);
    const locationOwner = localStorage.getItem('locationOwner')
    const loggedInEmail = localStorage.getItem('email')
    if(locationOwner === loggedInEmail){


    return (
      <div>
        
        <a onClick={this.showModal}>
          List Of Members 
                </a>
        <Modal
          title={this.props.data.members.length + ' ' + 'members'}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {memberListing}
          {/* <CSVLink
            data={json}
            filename={"my-file.csv"}
            className="btn btn-primary"
            target="_blank"
          >
            Download me
          </CSVLink>
          */}
           <button className="btn"><Link to="/DownloadRedirect" target="_blank">Download Members</Link></button>
           <ContactAllMembers data={this.state}/>
          
        </Modal>
      </div>
    )}
    else{
      return(
        <div>
        
        <a onClick={this.showModal}>
          List Of Members
                </a>
        <Modal
          title={this.props.data.members.length + ' ' + 'members'}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {memberListing}
          {/* <CSVLink
            data={json}
            filename={"my-file.csv"}
            className="btn btn-primary"
            target="_blank"
          >
            Download me
          </CSVLink>
          */}
           <button className="btn"><Link to="/DownloadRedirect" target="_blank">Download Members</Link></button>
          
        </Modal>
      </div>

      )
    }
  }
}
