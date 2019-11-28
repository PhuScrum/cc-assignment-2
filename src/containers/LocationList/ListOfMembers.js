import React, { Component } from 'react'
import { Modal, Button } from 'antd';
// import CsvDownloader from 'react-csv-downloader';
import { CSVLink, CSVDownload } from "react-csv";

import SingleMember from './SingleMember'

export default class ListOfMembers extends Component {
  constructor(props){
    super(props)
    this.state ={
      members:localStorage.getItem('members')
        
        
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
    const memberListing = this.props.data.members.map(unit => <SingleMember data={unit} />)
    const memberEmail = this.props.data.members
    console.log('here', this.props.data.name)
    const json = JSON.stringify(this.state.members);

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
          <CSVLink
            data={json}
            filename={"my-file.csv"}
            className="btn btn-primary"
            target="_blank"
          >
            Download me
          </CSVLink>
         
          
        </Modal>
      </div>
    )
  }
}
