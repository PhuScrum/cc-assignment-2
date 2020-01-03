import React, { Component } from 'react';
import { PageHeader, ListGroup } from 'react-bootstrap';
import '../Home.css';
import { Col, Row } from 'react-bootstrap';
import { Modal, Button } from 'antd';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";
//not used
// const locationUrl = 'http://vietnamsachvaxanh.com/locationDetails'

// const urlLocation = 'https://vietnamsachvaxanh.com/Input'
const urlLocation = 'http://localhost:8080/Input'

const StyledTableCell = withStyles(theme => ({
  head: {
    fontSize: 20,
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));
export default class NoAccParticipant extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      isLoading: true,
      kilos: Number,
      attended: Number,
      cost: Number,
      isSubmitted: false,
      // assignment 3 requirement
      trashNumber: Number,
      organic: Number,
      recycable: Number,
      nonRecycable: Number,
      afterEventPhoto: '',

      name:'',
      email:'',
      phoneNumber:''



    };
  }




  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    // console.log(this.props.locationId)
    // console.log(this.props)
  }

  onSubmit() {
    const { kilos, attended, cost, trashNumber, organic, recycable, nonRecycable, afterEventPhoto } = this.state
    var input = { kilos, attended, cost, trashNumber, organic, recycable, nonRecycable, afterEventPhoto }

    // console.log("datatype", typeof(kiloss))

    // this.registerInput();
    this.setState({
      name: 0.0,
      phoneNumber: 0.0,
      email: 0.0

    })

  }

  registerInput() {
    // console.log('register input')
    const { name, email, phoneNumber } = this.state
    
    fetch(urlLocation, {

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'

      },
      method: 'POST',

      body: JSON.stringify({
        // add more values

        locationId: this.props.locationId,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      }
      )
    })
      .then(resp => resp.json(), setTimeout(function () { window.location.reload(); }, 500))

  }

  onChangeName(e) {
    this.setState({
      name: e.target.value


    });
  }


  onChangePhoneNumber(e) {
    this.setState({
      phoneNumber: e.target.value

 
    })
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value

    })
  }

  render() {


    return (
      <div>
        <Button type="submit" className="btn btn-primary"
          onClick={this.showModal}>Join</Button>

        <Modal
          title={<h3>Participate in this Clean Up </h3>}
          visible={this.state.visible}
          onOk={this.onSubmit.bind(this)}
          onCancel={this.handleCancel}
        >
          <div style={{ marginTop: 10 }}>
            
            <div className="form-group">
              <label>Full Name:  </label>
              <input
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
              />
            </div>
            <div className="form-group">
              <label>Email: </label>
              <input
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </div>
            <div className="form-group">
              <label>Phone Number: </label>
              <input
                className="form-control"
                value={this.state.phoneNumber}
                onChange={this.onChangePhoneNumber}
              />
            </div>
            
            <p><i>Users who require tools for this clean up will need to have an account. <Link to={'/Signup'}>Sign up now!</Link>*</i></p>
            {/* <button type="submit" className="btn btn-primary" onClick={this.onSubmit.bind(this)}>Input / Edit</button> */}


          </div>
        </Modal>


      </div>
    );
  }


}
