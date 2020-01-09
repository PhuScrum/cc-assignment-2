import React, { Component } from 'react'
import {Col, Row} from 'react-bootstrap'
import { Modal, Button } from 'antd';

import ListOfMembers from './ListOfMembers'

// import Map from './detailsMap'
import Map from './detailsMap';
import Marker from 'react-google-maps';
import BasicInfo from './BasicInfo';
import InputInformation from './InputInformation'
import ContactSiteOwner from './ContactSiteOwner'
// contact all
import ContactAllMembers from './ContactAllMembers'
//tools requiremtn
import ToolsRequirement from './ToolsRequirement'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NoAccParticipant from './NoAccParticipant'



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




const locationUrl = 'https://7tk4lgbon4.execute-api.ap-southeast-1.amazonaws.com/dev/locationDetails'
const fetchUserByEmail_URL =  'https://vietnamsachvaxanh.com/fetchUserByEmail'
const joinLocationURL = 'https://7tk4lgbon4.execute-api.ap-southeast-1.amazonaws.com/dev/joinLocation'
const payLocation = 'https://vietnamsachvaxanh.com/payLocation'
const editUser = 'https://vietnamsachvaxanh.com/editUser'

export default class LocationDetails extends Component {
    constructor(props){
        super(props)
        this.state ={
            name:'',
            address: '',
            members: [], 
            time: '',
            locationOwner: '',
            dataLat:0,
            dataLng:0,
            input:{},
            imageUrl:'',
            gender:'',
            userType:'',
            // assignment 3
            organiserName: '',
			organiserLogo:'',
			organiserSlogan:'',
			organiserDescription:'',
			organiserEventPhoto:'',
            locationInternalOrExternal:'',
            // tools
            // toolKit: 0,
            // Tshirt:0,
            // fullSet:0,
            locationId: this.props.match.params.id,
            requestedTools: {},
            toolKit: 0,
            Tshirt:0,
            fullSet:0,
            payStatus: null

            
        }

    }

   
    fetchAdmin(locationOwner){
        var email = localStorage.getItem('email')
        fetch(fetchUserByEmail_URL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
 
            },
            method: 'POST',
            body: JSON.stringify({
                'userEmail': email
            }
            )
        })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                if(data){
                    const {userType} = data
                    // console.log(data.name)
                    this.setState({
                        userType: userType
                        // phoneNumber: phoneNumber,
                       
                    })    
                }
                console.log('userType', this.state.userType)
                    
              

            })

    }

    fetchOwner(locationOwner){
        // const {locationOwner} = this.state
        fetch(fetchUserByEmail_URL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
 
            },
            method: 'POST',
            body: JSON.stringify({
                'userEmail': locationOwner
            }
            )
        })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                if(data){
                    const {fName, lName, age, gender, imageUrl} = data
                    // console.log(data.name)
                    this.setState({
                        fName: fName,
                        lName:lName ,
                        age: age,
                        gender: gender,
                        imageUrl: imageUrl
                        // phoneNumber: phoneNumber,
                       
                    })    
                }
                    
              

            })

    }

    fetchLocation(id){ 
        // console.log(id)
        fetch(locationUrl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
 
            },
            method: 'POST',
            body: JSON.stringify({
                'locationId': this.props.match.params.id
            }
            
            )
        })
            .then(resp => resp.json())
            .then(data => {
                const {name, address, time, description, lat, lng, locationOwner, members, input,  organiserName, organiserLogo,
                    organiserSlogan,
                    organiserDescription,
                    organiserEventPhoto,
                    locationInternalOrExternal,
                    requestedTools,
                    payStatus
                } = data
                console.log('showmedata',data)
                this.setState({
                    name: name,
                    address: address,
                    time: time,
                    description: description,
                    dataLat: lat,
                    dataLng: lng,
                    locationOwner: locationOwner,
                    members: members,
                    input: input,
                    organiserName:  organiserName,
                    organiserEventPhoto: organiserEventPhoto,
                    organiserLogo:organiserLogo,
                    organiserSlogan: organiserSlogan,
                    organiserDescription:  organiserDescription,
                    locationInternalOrExternal: locationInternalOrExternal,
                    requestedTools: requestedTools,
                    payStatus: payStatus



                    

                })
                // console.log('request tool', requestedTools)
                // for (var userEmail in requestedTools) {
                //     console.log('toolkit', userEmail.fullSet)
                //   }
                for (var key in requestedTools) {
                    if (requestedTools.hasOwnProperty(key)) {
                        // console.log(key + " -> " + requestedTools[key].toolKit);
                        // console.log('testing', requestedTools[key].toolKit )
                        this.state.toolKit += parseInt(requestedTools[key].toolKit)
                        this.state.Tshirt += parseInt(requestedTools[key].Tshirt)
                        this.state.fullSet += parseInt(requestedTools[key].fullSet)
                        
                    }
                }

                var joinedMembers = this.state.members 
                // console.log('requested tools', this.state.requestedTools)
                // console.log(locationOwner)
                // console.log(name)
                // console.log(input)
                this.fetchOwner(locationOwner)
                localStorage.setItem("lat", this.state.dataLat);
                localStorage.setItem("lng", this.state.dataLng);
                // console.log('log', data)
                this.windowOnload()

            })



    }

    
    windowOnload() {
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    }

    componentDidMount(){
        this.fetchLocation(this.props.match.params.id)
        this.fetchAdmin()
        // this.fetchMember()
        // this.state.joinStatus 
        console.log('original', this.state.payStatus)
        
    }

    userCancelJoin(members, userEmail){
        members.splice(members.indexOf(userEmail), 1)
        this.setState({
            members: members
            
        }) 
        this.state.joinStatus = false
        this.sendJoin(members)
        
    }

    sendJoin(members){
        
        fetch(joinLocationURL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                'locationId': this.props.match.params.id,
                'members': members
            }
            )
        })
            .then(resp => resp.json())
            .then(resp => this.fetchLocation(this.props.match.params.id))
    }

    
    userJoinLocation(members, userEmail){
        console.log('join')
       members.push(userEmail)
       this.setState({
           members: members

       })
       this.state.joinStatus = true
       this.sendJoin(members)
       
    }

    joinLocation(){
    var isLoggedIn = localStorage.getItem('email')
    const{members} = this.state
    const userEmail = localStorage.getItem('email')

    if(isLoggedIn === this.state.locationOwner)
    {
        alert("You are the owner of this site, you will need to show up on the following day to manage this activity regardless." )
    }
  
    
    else{
        const{members} = this.state
        const userEmail = localStorage.getItem('email')
        const locationId = this.props.match.params.id
        if(members.includes(userEmail)){
            this.userCancelJoin(members, userEmail)

        }else{
            this.userJoinLocation(members, userEmail)
        }

        // this.userJoinLocation(members, userEmail)
    }
    }

    payLocation(){
        console.log('paylocation', this.state.payStatus)
        if (this.state.payStatus === true) {
            this.userCancelPay()

        } else {
            this.userPayLocation()
        }
    }

    userCancelPay(){
        this.setState({
            payStatus: false
            
        }) 
        this.state.payStatus = false
        console.log('canceled pay', this.state.payStatus)
        this.sendPay()
    }

    userPayLocation(){
        
       this.setState({
           payStatus: true

       })
       this.state.payStatus = true
       console.log('paid', this.state.payStatus)
       this.sendPay()
    }

    sendPay(){
        fetch(payLocation, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                'locationId': this.props.match.params.id,
                'payStatus': this.state.payStatus
            }
            )
        })
            .then(resp => resp.json())
            .then(resp => this.fetchLocation(this.props.match.params.id))
    }
    
    render() {
        // console.log('members and requested tools',this.state.requestedTools)
        // console.log('total toolkit', this.state.toolKit)
        // console.log('total Tshirt', this.state.Tshirt)
        // console.log('total fullSet', this.state.fullSet)
        

        const {members, fName, lName, age, gender, locationOwner, imageUrl, input, organiserEventPhoto} = this.state
        const userEmail = localStorage.getItem('email')
        // console.log("details lOwner", this.state.locationOwner)
        var ownerLogin = localStorage.getItem('email')
        localStorage.setItem('locationOwner', locationOwner) 
        // console.log("imagehere", imageUrl)
        // console.log('isSubmitted', input.isSubmitted)
        // console.log(gender)


        if(ownerLogin === locationOwner && input.isSubmitted === false){
        return (
            
            <div>
                <Row>
                    <Col lg={8}><h4><b>Basic Info and Map</b></h4>
                    <BasicInfo {...this.props} data={this.state}/>
                    
                    </Col>
                    <Col lg={4}><h4><b>Contact Info</b></h4>
                    <br/>
                    <img style={{width:100}} src={imageUrl}></img>
                    <br/>
                    <b>Name&nbsp;&nbsp;&nbsp;:&nbsp;</b> {fName} {lName} <br/>
                <b>Email  &nbsp; :&nbsp;&nbsp;</b>{locationOwner} <br/>
                <b>Age &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;  </b>{age} years old <br/>
                <b>Gender:&nbsp;&nbsp;</b>{gender}
                
                 <br/>
                 <br/>
                 <hr/>

                   
                    <ListOfMembers data={this.state}/>

                    {/* <Button type="primary" onClick={this.joinLocation}>Join</Button> */}
                    
                    <Button ghost={members.includes(userEmail) ? true : false} type={members.includes(userEmail) ? 'primary': 'default'} onClick={this.joinLocation.bind(this)}>
                            {/* {members.length}  */}
                            {members.includes(userEmail) ? 'Joined': 'Join'}</Button>
                            <br/>
                            <br/>
                            <Paper>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Total tools requested by participants</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <StyledTableRow><StyledTableCell >ToolKit: {this.state.toolKit}</StyledTableCell> </StyledTableRow>
              <StyledTableRow><StyledTableCell >T-Shirt: {this.state.Tshirt}</StyledTableCell> </StyledTableRow>
              <StyledTableRow><StyledTableCell >fullSet: {this.state.fullSet}</StyledTableCell> </StyledTableRow>
            </TableBody>
          </Table>
        </Paper>
                    <ToolsRequirement/>
                    
                    </Col>
                </Row>
                <h3><b>Past activity of this organisation.</b></h3>
            <br/>
            <img style={{width: 1550}, {height:600}} src={organiserEventPhoto}/>
            <br/>
            <br/>
            <br/>
                <hr/>
                
                <InputInformation  locationId={this.props.match.params.id} input={this.state.input}/>
                <img style={{width: 1550}, {height:600}} src={input.afterEventPhoto}/>
                <br/>
                <br/>
                <br/>
            


            </div>
            
        )
        //
        }
        else if(ownerLogin === locationOwner && input.isSubmitted === true){
            return(
            <div>
            <Row>
                <Col lg={8}><h3><b>Basic Info and Map</b></h3>
                <BasicInfo {...this.props} data={this.state}/>
                
                </Col>
                <Col lg={4}><h3><b>Contact Info</b></h3>
                <br/>
                
                <container style={{color: 'red'}}><img style={{width:100}} src={imageUrl}></img></container>
                <br/>
                <b>Name&nbsp;&nbsp;&nbsp;:&nbsp;</b> {fName} {lName} <br/>
                <b>Email  &nbsp; :&nbsp;&nbsp;</b>{locationOwner} <br/>
                <b>Age &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;  </b>{age} years old <br/>
                <b>Gender:&nbsp;&nbsp;</b>{gender} <br/>
                <ContactSiteOwner data={this.state}/>
                <br/>
                <hr/>
               
                <ListOfMembers data={this.state}/>
                
                {/* <Button type="primary" onClick={this.joinLocation}>Join</Button> */}
                <b>You have submitted clean up result of this clean up site, thus it is now closed.</b>
                
                </Col>
            </Row>
            <h3><b>Past activity of this organisation.</b></h3>
            <br/>
            <img style={{width: 1550}, {height:600}} src={organiserEventPhoto}/>
            <br/>
            <br/>
            <br/>

            <hr/>
                
                <InputInformation  locationId={this.props.match.params.id} input={this.state.input}/>
                <br/>
                <h3><b>Thank you for participating, here is a photo of this event:</b></h3>
                <br/>
                <img style={{width: 1550}, {height:600}} src={input.afterEventPhoto}/>
                

        </div>
        )
        }
        else if(ownerLogin !== locationOwner && input.isSubmitted === true){
            return(
            <div>
                <Row>
                    <Col lg={8}><h4><b>Basic Info and Map</b></h4>
                    <BasicInfo {...this.props} data={this.state}/>
                    
                    </Col>
                    <Col lg={4}><h4><b>Contact Info</b></h4>
                    <br/>
                    
                    <container style={{color: 'red'}}><img style={{width:100}} src={imageUrl}></img></container>
                    <br/>
                    <b>Name&nbsp;&nbsp;&nbsp;:&nbsp;</b> {fName} {lName} <br/>
                    <b>Email  &nbsp; :&nbsp;&nbsp;</b>{locationOwner} <br/>
                    <b>Age &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;  </b>{age} years old <br/>
                    <b>Gender:&nbsp;&nbsp;</b>{gender} <br/>
                    <ContactSiteOwner data={this.state}/>
                    <br/>
                    <hr/>
                   
                    <ListOfMembers data={this.state}/>
                    
                    {/* <Button type="primary" onClick={this.joinLocation}>Join</Button> */}
                    <b>The owner of the location has closed down this clean up site.</b>
                         
                    
                    </Col>
                    
                </Row>
                <h3><b>Past activity of this organisation.</b></h3>
            <br/>
            <img style={{width: 1550}, {height:600}} src={organiserEventPhoto}/>
            <br/>
            <h3><b>Photo of this event</b></h3>
            <img style={{width: 1550}, {height:600}} src={input.afterEventPhoto}/>
            <br/>
            <br/>
    
    
            </div>

            )
        }else if(userEmail === null)
        return(
            <div>
                <Row>
                    <Col lg={8}><h4><b>Basic Info and Map</b></h4>
                    <BasicInfo {...this.props} data={this.state}/>
                    
                    </Col>
                    <Col lg={4}><h4><b>Contact Info</b></h4>
                    <br/>
                    
                    <container style={{color: 'red'}}><img style={{width:100}} src={imageUrl}></img></container>
                    <br/>
                    <b>Name&nbsp;&nbsp;&nbsp;:&nbsp;</b> {fName} {lName} <br/>
                    <b>Email  &nbsp; :&nbsp;&nbsp;</b>{locationOwner} <br/>
                    <b>Age &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;  </b>{age} years old <br/>
                    <b>Gender:&nbsp;&nbsp;</b>{gender} <br/>
                    <ContactSiteOwner data={this.state}/>
                    <br/>
                    <hr/>
                   
                    <ListOfMembers data={this.state}/>
                    <NoAccParticipant data={this.state}/>
                    {/* <Button type="primary" onClick={this.joinLocation}>Join</Button> */}
                    
                 
                    </Col>
                    
                </Row>
                <h3><b>Past activity of this organisation.</b></h3>
            <br/>
            <img style={{width: 1550}, {height:600}} src={organiserEventPhoto}/>
            <br/>
            <br/>
            <br/>
    
    
            </div>

        )
        else if(this.state.userType === 'admin'){
            //admin pay no pay
            return(
                <div>
                <Row>
                    <Col lg={8}><h4><b>Basic Info and Map</b></h4>
                    <BasicInfo {...this.props} data={this.state}/>
                    
                    </Col>
                    <Col lg={4}><h4><b>Contact Info</b></h4>
                    <br/>
                    <img style={{width:100}} src={imageUrl}></img>
                    <br/>
                    <b>Name&nbsp;&nbsp;&nbsp;:&nbsp;</b> {fName} {lName} <br/>
                <b>Email  &nbsp; :&nbsp;&nbsp;</b>{locationOwner} <br/>
                <b>Age &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;  </b>{age} years old <br/>
                <b>Gender:&nbsp;&nbsp;</b>{gender}
                 <br/>
                 <br/>
                 <hr/>
                    <ListOfMembers data={this.state}/>
                    
                    {/* <Button type="primary" onClick={this.joinLocation}>Join</Button> */}
                    <Button ghost={members.includes(userEmail) ? true : false} type={members.includes(userEmail) ? 'primary': 'default'} onClick={this.joinLocation.bind(this)}>
                            {/* {members.length}  */}
                            {members.includes(userEmail) ? 'Joined': 'Join'}</Button>
                            <hr/>
                    <p>Please Select the button below to toggle if the location has paid or not paid for the requested tools.</p>
                    <Button ghost={this.state.payStatus ? true : false} type={this.state.payStatus ? 'primary': 'default'} onClick={this.payLocation.bind(this)}>
                            {/* {members.length}  */}
                            {this.state.payStatus ? 'Paid': 'Unpaid'}</Button>
                            
                            <br/>
                            <br/>
                            <br/>
                    </Col>
                </Row>
                <h3><b>Past activity of this organisation.</b></h3>
            <br/>
            <img style={{width: 1550}, {height:600}} src={organiserEventPhoto}/>
            <br/>
            <br/>
            <br/>
                <hr/>
                
                {/* <InputInformation  locationId={this.props.match.params.id} input={this.state.input}/> */}
                <br/>
                <br/>
                <br/>
            


            </div>
            )
        }
        else{
            return(
                <div>
                <Row>
                    <Col lg={8}><h4><b>Basic Info and Map</b></h4>
                    <BasicInfo {...this.props} data={this.state}/>
                    
                    </Col>
                    <Col lg={4}><h4><b>Contact Info</b></h4>
                    <br/>
                    <img style={{width:100}} src={imageUrl}></img>
                    <br/>
                    <b>Name&nbsp;&nbsp;&nbsp;:&nbsp;</b> {fName} {lName} <br/>
                <b>Email  &nbsp; :&nbsp;&nbsp;</b>{locationOwner} <br/>
                <b>Age &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;  </b>{age} years old <br/>
                <b>Gender:&nbsp;&nbsp;</b>{gender}
                
                 <br/>
                 <br/>
                 <hr/>

                   
                    <ListOfMembers data={this.state}/>
                    
                    {/* <Button type="primary" onClick={this.joinLocation}>Join</Button> */}
                    <Button ghost={members.includes(userEmail) ? true : false} type={members.includes(userEmail) ? 'primary': 'default'} onClick={this.joinLocation.bind(this)}>
                            {/* {members.length}  */}
                            {members.includes(userEmail) ? 'Joined': 'Join'}</Button>
                            
                            <br/>
                            <br/>
                            <br/>
                            {/* <Paper>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>CleanUp Data</StyledTableCell>
                <StyledTableCell align="right">Gathered Amount&nbsp;(Kg)</StyledTableCell>
                <StyledTableCell align="right">Attended Number</StyledTableCell>
                <StyledTableCell align="right">Cost&nbsp;(VND)</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              <StyledTableRow>
                <StyledTableCell > Number
              </StyledTableCell>
                <StyledTableCell align="right">{this.state.toolKit}</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </Paper> */}
                    </Col>
                </Row>
                <h3><b>Past activity of this organisation.</b></h3>
            <br/>
            <img style={{width: 1550}, {height:600}} src={organiserEventPhoto}/>
            <br/>
            <br/>
            <br/>
                <hr/>
                
                {/* <InputInformation  locationId={this.props.match.params.id} input={this.state.input}/> */}
                <br/>
                <br/>
                <br/>
            


            </div>
            )
        }
    }
}
