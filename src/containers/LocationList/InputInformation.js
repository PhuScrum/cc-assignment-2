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
export default class InputInformation extends Component {
  constructor(props) {
    super(props);
    this.onChangeKilos = this.onChangeKilos.bind(this);
    this.onChangeCost = this.onChangeCost.bind(this);
    this.onChangeAttended = this.onChangeAttended.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      isLoading: true,
      kilos: 0.0,
      attended: 0.0,
      cost: 0.0,
      isSubmitted: false,


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
    const { kilos, attended, cost } = this.state
    var input = { kilos, attended, cost }

    // console.log("datatype", typeof(kiloss))
    this.registerInput();
    this.setState({
      kilos: 0.0,
      attended: 0.0,
      cost: 0.0
    })

  }

  registerInput() {
    // console.log('register input')
    const { kilos, attended, cost } = this.state
    var kiloss = parseFloat(kilos)
    var attendedd = parseFloat(attended)
    var costt = parseFloat(cost)
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
          isSubmitted: true
        }
      }
      )
    })
      .then(resp => resp.json(), setTimeout(function(){ window.location.reload(); }, 500))

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

  render() {

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
              </TableRow>
            </TableHead>
            <TableBody>

              <StyledTableRow>
                <StyledTableCell > Number
              </StyledTableCell>
                <StyledTableCell align="right">{this.props.input.kilos}</StyledTableCell>
                <StyledTableCell align="right">{this.props.input.attended}</StyledTableCell>
                <StyledTableCell align="right">{this.props.input.cost}</StyledTableCell>
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
              <label>Amount of collected waste(kilos) : </label>
              <input

                className="form-control"
                value={this.state.kilos}
                onChange={this.onChangeKilos}
              />
            </div>
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
            {/* <button type="submit" className="btn btn-primary" onClick={this.onSubmit.bind(this)}>Input / Edit</button> */}


          </div>
        </Modal>


      </div>
    );
  }


}
