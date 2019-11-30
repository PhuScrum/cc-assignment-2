import React, { Component } from 'react'
import {Col, Row} from 'react-bootstrap'
import { Modal, Button } from 'antd';

import ListOfMembers from './ListOfMembers'

// import Map from './detailsMap'
import Map from './detailsMap';
import Marker from 'react-google-maps';
import BasicInfo from './BasicInfo';
import InputInformation from './InputInformation'
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
            input:{}
            
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
                    const {fName, lName, age, gender} = data
                    // console.log(data.name)
                    this.setState({
                        fName: fName,
                        lName:lName ,
                        age: age,
                        gender: gender,
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
                const {name, address, time, description, lat, lng, locationOwner, members, input} = data
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
                    input: input
                })        
                // console.log(locationOwner)
                // console.log(name)
                // console.log(input)
                this.fetchOwner(locationOwner)
                localStorage.setItem("lat", this.state.dataLat);
                localStorage.setItem("lng", this.state.dataLng);
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
        const{members} = this.state
        const userEmail = localStorage.getItem('email')
        const locationId = this.props.match.params.id
        if(members.includes(userEmail)){
            this.userCancelJoin(members, userEmail)

        }else{
            this.userJoinLocation(members, userEmail)
        }
    }
    
    render() {
        const {members, fName, lName, age, gender, locationOwner} = this.state
        const userEmail = localStorage.getItem('email')
        // console.log(this.state.input)
        var ownerLogin = localStorage.getItem('email')
        if(ownerLogin === locationOwner){
        return (
            <div>
                <Row>
                    <Col lg={8}>Basic info and map
                    <BasicInfo {...this.props} data={this.state}/>
                    
                    </Col>
                    <Col lg={4}>Contact Info
                    <br/>
                    {fName} {lName} <br/>
                    {locationOwner} <br/>
                    {age} years old <br/>
                    {gender} <br/><br/>
                   
                    <ListOfMembers data={this.state}/>

                    {/* <Button type="primary" onClick={this.joinLocation}>Join</Button> */}
                    <Button ghost={members.includes(userEmail) ? true : false} type={members.includes(userEmail) ? 'primary': 'default'} onClick={this.joinLocation.bind(this)}>
                            {/* {members.length}  */}
                            {members.includes(userEmail) ? 'Joined': 'Join'}</Button>
                    
                    </Col>
                </Row>
                
                <InputInformation  locationId={this.props.match.params.id} input={this.state.input}/>
                <br/>
                <br/>
                <br/>
            


            </div>
            
        )
        //
        }
        else{
            return(
            <div>
            <Row>
                <Col lg={8}>Basic info and map
                <BasicInfo {...this.props} data={this.state}/>
                
                </Col>
                <Col lg={4}>Contact Info
                <br/>
                {fName} {lName} <br/>
                {locationOwner} <br/>
                {age} years old <br/>
                {gender} <br/><br/>
               
                <ListOfMembers data={this.state}/>

                {/* <Button type="primary" onClick={this.joinLocation}>Join</Button> */}
                <Button ghost={members.includes(userEmail) ? true : false} type={members.includes(userEmail) ? 'primary': 'default'} onClick={this.joinLocation.bind(this)}>
                        {/* {members.length}  */}
                        {members.includes(userEmail) ? 'Joined': 'Join'}</Button>
                
                </Col>
            </Row>


        </div>
        )
        }
    }
}
