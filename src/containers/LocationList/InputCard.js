import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Button, ButtonToolbar} from 'react-bootstrap'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'; 
import { withStyles, makeStyles } from '@material-ui/core/styles';
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

export default class LocationCard extends Component {
    constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
            location: [],
            attended: 0,
            cost: 0,
            kilos: 0

		};
	}

    
    


    render() {
        // const { name, locationOwner, address, description, _id, time, lat, lng, input } = this.data
        var ownerLogin = localStorage.getItem('email')
        console.log(this.state.location)
        return (
                <div class="card">
                    <div class="card-body" >
                        
                        {/* <h4 class="card-title">{this.props.data.name}</h4> 
        <p>{this.props.data.input.attended} {this.props.data.input.cost} {this.props.data.input.kilos}</p> */}
        <Paper>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">{this.props.data.name}</StyledTableCell>
            <StyledTableCell align="left"># of Volunteer</StyledTableCell>
            <StyledTableCell align="right">Attended Number</StyledTableCell>
            <StyledTableCell align="right">Gathered Amount&nbsp;(Kg)</StyledTableCell>
            <StyledTableCell align="right">Cost&nbsp;(VND)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
       
            <StyledTableRow>
              <StyledTableCell > Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </StyledTableCell>
              <StyledTableCell align="right">{this.props.data.input.attended}</StyledTableCell>
              <StyledTableCell align="right">{this.props.data.members.length}</StyledTableCell>
              <StyledTableCell align="right">{this.props.data.input.cost}</StyledTableCell>
              <StyledTableCell align="right">{this.props.data.input.kilos}</StyledTableCell>
            </StyledTableRow>
        </TableBody>
      </Table>
    </Paper>
                        {/* <Link  to={`/location/${_id}` }>Details</Link> */}
                        <br/>
                        <br/> 
                      
                    </div>
                </div>
        )
        
     
           
         
    }
}
