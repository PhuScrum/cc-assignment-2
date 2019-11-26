import React, { Component } from 'react'
import { Modal, Button } from 'antd';

import SingleMember from './SingleMember'

export default class ListOfMembers extends Component {
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
    render() {
        const memberListing = this.props.data.members.map(unit => <SingleMember data={unit}/>)
        return (
            <div>
                <a  onClick={this.showModal}>
                    List Of Members
                </a>
                    <Modal
                    title={this.props.data.members.length + ' ' + 'members'}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    {memberListing}
                    </Modal>
            </div>
        )
    }
}
