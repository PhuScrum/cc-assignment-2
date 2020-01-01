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


// const locationUrl = 'https://vietnamsachvaxanh.com/locationDetails'
// const fetchUserByEmail_URL =  'https://vietnamsachvaxanh.com/fetchUserByEmail'
// const joinLocationURL = 'https://vietnamsachvaxanh.com/joinLocation'


const locationUrl = 'http://localhost:8080/locationDetails'
const fetchUserByEmail_URL =  'http://localhost:8080/fetchUserByEmail'
const joinLocationURL = 'http://localhost:8080/joinLocation'

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
            // assignment 3
            organiserName: '',
			organiserLogo:'',
			organiserSlogan:'',
			organiserDescription:'',
			organiserEventPhoto:'',
			locationInternalOrExternal:'',
            
        }

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
                    locationInternalOrExternal} = data
                // console.log(data)
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


                    

                })        
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
        
        
    }

    userCancelJoin(members, userEmail){
        members.splice(members.indexOf(userEmail), 1)
        this.setState({
            members: members
        }) 
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
       members.push(userEmail)
       this.setState({
           members: members
       })
       this.sendJoin(members)
    }

    joinLocation(){
    var isLoggedIn = localStorage.getItem('email')
    if(isLoggedIn === null){
        alert("You need to login to use this function!\nPlease click on the login button to continue." )
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
    }
    }
    
    render() {
        const {members, fName, lName, age, gender, locationOwner, imageUrl, input, organiserEventPhoto} = this.state
        const userEmail = localStorage.getItem('email')
        // console.log("details lOwner", this.state.locationOwner)
        var ownerLogin = localStorage.getItem('email')
        localStorage.setItem('locationOwner', locationOwner) 
        // console.log("imagehere", imageUrl)
        console.log('isSubmitted', input.isSubmitted)
        console.log(gender)


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
                            <br/>
                    <ToolsRequirement/>
                    
                    </Col>
                </Row>
                <h3><b>Past activity of this organisation.</b></h3>
            <br/>
            <img style={{width: 1550}} src={organiserEventPhoto}/>
            <br/>
            <br/>
            <br/>
                <hr/>
                
                <InputInformation  locationId={this.props.match.params.id} input={this.state.input}/>
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
            <img style={{width: 1550}} src={organiserEventPhoto}/>
            <br/>
            <br/>
            <br/>

            <hr/>
                
                <InputInformation  locationId={this.props.match.params.id} input={this.state.input}/>

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
                    <b>Th owner of the location has closed down this clean up site.</b>
                         
                    
                    </Col>
                    
                </Row>
                <h3><b>Past activity of this organisation.</b></h3>
            <br/>
            <img style={{width: 1550}} src={organiserEventPhoto}/>
            <br/>
            <br/>
            <br/>
    
    
            </div>

            )
        }else{
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
                    
                    </Col>
                </Row>
                <h3><b>Past activity of this organisation.</b></h3>
            <br/>
            <img style={{width: 1550}} src={organiserEventPhoto}/>
            <br/>
            <br/>
            <br/>
                <hr/>
                
                <InputInformation  locationId={this.props.match.params.id} input={this.state.input}/>
                <br/>
                <br/>
                <br/>
            


            </div>
            )
        }
    }
}
