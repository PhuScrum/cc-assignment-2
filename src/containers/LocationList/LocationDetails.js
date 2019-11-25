import React, { Component } from 'react'
import {Col, Row, Button    } from 'react-bootstrap'
// import Map from './detailsMap'
import Map from './detailsMap';
import Marker from 'react-google-maps'
import BasicInfo from './BasicInfo'
const locationUrl = 'http://localhost:8080/locationDetails'
const fetchUserByEmail_URL =  'http://localhost:8080/fetchUserByEmail'

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
            dataLng:0
            
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
                console.log(data)
                const {fName, lName, age, gender} = data
                console.log(data.name)
                this.setState({
                    fName: fName,
                    lName:lName ,
                    age: age,
                    gender: gender,
                    // phoneNumber: phoneNumber,
                   
                })        
              

            })

    }

    fetchLocation(id){
        console.log(id)
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
                const {name, address, time, description, lat, lng, locationOwner} = data
                console.log(data)
                this.setState({
                    name: name,
                    address: address,
                    time: time,
                    description: description,
                    dataLat: lat,
                    dataLng: lng,
                    locationOwner: locationOwner
                })        
                console.log(locationOwner)
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
    
    render() {
        const {name, address, time, description, dataLat, dataLng, fName, lName, age, gender, locationOwner} = this.state
        var latt = localStorage.getItem('lat')
        var lngg = localStorage.getItem('lng')
        
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
                    List of members <br/>

                    <Button>Join</Button>
                    
                    </Col>
                </Row>


            </div>
            
        )
    }
}
