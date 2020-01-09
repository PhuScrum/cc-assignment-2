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
import FileUpload from '../FileUpload';
//not used
// const locationUrl = 'http://vietnamsachvaxanh.com/locationDetails'

// const urlLocation = 'https://vietnamsachvaxanh.com/Input'
const urlLocation = 'https://vietnamsachvaxanh.com/Input'

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
export default class InputInformation extends Component {
  constructor(props) {
    super(props);
    this.onChangeKilos = this.onChangeKilos.bind(this);
    this.onChangeCost = this.onChangeCost.bind(this);
    this.onChangeAttended = this.onChangeAttended.bind(this);

    this.onChangeOrganic = this.onChangeOrganic.bind(this);
    this.onChangeRecycable = this.onChangeRecycable.bind(this);
    this.onChangeNonRecycable = this.onChangeNonRecycable.bind(this);
    this.onChangeAfterEventPhoto = this.onChangeAfterEventPhoto.bind(this);

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
      // imageUrl: ''



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
    this.registerInput();
    this.setState({
      kilos: 0.0,
      attended: 0.0,
      cost: 0.0,

      trashNumber: 0.0,
      organic: 0.0,
      recycable: 0.0,
      nonRecycable: 0.0,
      afterEventPhoto: ''

    })

  }

  registerInput() {
    // console.log('register input')
    const { kilos, attended, cost, trashNumber, organic, recycable, nonRecycable, afterEventPhoto } = this.state
    var kiloss = parseFloat(kilos)
    var attendedd = parseFloat(attended)
    var costt = parseFloat(cost)

    var organicc = parseFloat(organic)
    var recycablee = parseFloat(recycable)
    var nonRecycablee = parseFloat(nonRecycable)
    
    fetch(urlLocation, {

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'

      },
      method: 'POST',

      body: JSON.stringify({
        // add more values

        locationId: this.props.locationId,
        input: {
          kilos: kiloss,
          attended: attendedd,
          cost: costt,
          isSubmitted: true,

          organic: organicc,
          recycable: recycablee,
          nonRecycable: nonRecycablee,
          trashNumber: organicc + recycablee + nonRecycablee,
          
          afterEventPhoto: afterEventPhoto
        }
      }
      )
    })
      .then(resp => resp.json(), setTimeout(function () { window.location.reload(); }, 500))

  }
  // assignment 3 requirement
  onChangetrashNumber(e) {
    this.setState({
      trashNumber: e.target.value


    });
  }
  onChangeOrganic(e) {
    this.setState({
      organic: e.target.value

    });
  }
  onChangeRecycable(e) {
    this.setState({
      recycable: e.target.value

    });
  }
  onChangeNonRecycable(e) {
    this.setState({
      nonRecycable: e.target.value

    });
  }
  onChangeAfterEventPhoto(e) {
    this.setState({
      afterEventPhoto: e.target.value

    });
  }
  

  onChangeKilos(e) {
    this.setState({
      kilos: e.target.value


    });
  }


  onChangeAttended(e) {
    this.setState({
      attended: e.target.value


    })
  }
  onChangeCost(e) {
    this.setState({
      cost: e.target.value

    })
  }
  uploadImage = (imageUrl) => {
		console.log('location info', imageUrl)
		this.setState({afterEventPhoto: imageUrl})
  	}

  render() {
    var totalPieces = parseFloat(this.state.organic) + parseFloat(this.state.recycable) + parseFloat(this.state.nonRecycable)


    return (
      <div>
        <h4><b>Input data after cleanup completion</b></h4>
        <ListGroup>{!this.state.isLoading}</ListGroup>
        <Paper>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>CleanUp Data</StyledTableCell>
                <StyledTableCell align="right">Gathered Amount&nbsp;(Kg)</StyledTableCell>
                <StyledTableCell align="right">Attended Number</StyledTableCell>
                <StyledTableCell align="right">Cost&nbsp;(VND)</StyledTableCell>
                <StyledTableCell align="right">Pieces of trash:&nbsp;({this.props.input.trashNumber})</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              <StyledTableRow>
                <StyledTableCell > Number
              </StyledTableCell>
                <StyledTableCell align="right">{this.props.input.kilos}</StyledTableCell>
                <StyledTableCell align="right">{this.props.input.attended}</StyledTableCell>
                <StyledTableCell align="right">{this.props.input.cost}</StyledTableCell>
                <StyledTableCell align="right">O:{this.props.input.organic}, R: {this.props.input.recycable},
     non-R: {this.props.input.nonRecycable}</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </Paper>
        <br />
        <button type="submit" className="btn btn-primary pull-right"
          onClick={this.showModal}>Input Results</button>

        <Modal
          title={<h3>Fill in information after Site CleanUp</h3>}
          visible={this.state.visible}
          onOk={this.onSubmit.bind(this)}
          onCancel={this.handleCancel}
        >
          <div style={{ marginTop: 10 }}>
            
            <div className="form-group">
              <label>Amount of attendees:  </label>
              <input
                className="form-control"
                value={this.state.attended}
                onChange={this.onChangeAttended}
              />
            </div>
            <div className="form-group">
              <label>Cost of operation (VND): </label>
              <input
                className="form-control"
                value={this.state.cost}
                onChange={this.onChangeCost}
              />
            </div>
            <div className="form-group">
              <label>Amount of collected waste(kilos) : </label>
              <input
                className="form-control"
                value={this.state.kilos}
                onChange={this.onChangeKilos}
              />
            </div>
            <div className="form-group">
              <label>Total pieces of trash: {totalPieces}</label>
              <br/>
              Organic Pieces:
              <input
                className="form-control"
                value={this.state.organic}
                onChange={this.onChangeOrganic}
              />
              Recycable Pieces: (milk bottles, plastic bottles, straw …)
              <input
                className="form-control"
                value={this.state.recycable}
                onChange={this.onChangeRecycable}
              />
              Non-recycable Pieces: (foam box, nilong bag, …)
              <input
                className="form-control"
                value={this.state.nonRecycable}
                onChange={this.onChangeNonRecycable}
              />
            </div>
            <div className="form-group">
              <label>Photo of event:</label>
              {/* <input
                className="form-control"
                value={this.state.afterEventPhoto}
                onChange={this.onChangeAfterEventPhoto}
              /> */}
              <FileUpload uploadCallback = {this.uploadImage} {...this.props}/>
            </div>
            
            <p>Once you submit the results, the clean up site will be closed, and members will not be able to join*</p>
            {/* <button type="submit" className="btn btn-primary" onClick={this.onSubmit.bind(this)}>Input / Edit</button> */}


          </div>
        </Modal>


      </div>
    );
  }


}
