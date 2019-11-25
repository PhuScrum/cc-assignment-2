import React, { Component } from 'react'
import {Col, Row} from 'react-bootstrap'
// import Map from './detailsMap'
import Map from './detailsMap';
import Marker from 'react-google-maps'
const locationUrl = 'http://localhost:8080/locationDetails'

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
                const {name, address, time, description, lat, lng} = data
                console.log(data.name)
                this.setState({
                    name: name,
                    address: address,
                    time: time,
                    description: description,
                    dataLat: lat,
                    dataLng: lng
                })        
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
        const {name, address, time, description, dataLat, dataLng} = this.state
        var latt = localStorage.getItem('lat')
        var lngg = localStorage.getItem('lng')
        
        return (
            <div>
                <Row>
                    <Col></Col>
                    <Col></Col>
                </Row>
                details page.
                <br/>
                <b>Name:</b> {name}
                <br/>
                <b>Address:</b> {address}
                <br/>
                <b>Time:</b> {time}
                <br/>
                <b>Description:</b> {description}
                <br/>
                <b>lat{latt}</b>
                <br/>
                <b>lng{lngg}</b>
                <br/>
                {typeof(dataLat)} <br/>
                {typeof(10.78628972041983)}
                
                <Map
					google={this.props.google}
					center={{lat: parseFloat(localStorage.getItem('lat')), lng: parseFloat(localStorage.getItem('lng'))}}
					height='300px'
                    zoom={15}
                    
				/>
                
                
                

            </div>
            
        )
    }
}
