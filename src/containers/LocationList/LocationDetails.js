import React, { Component } from 'react'
import {Col, Row} from 'react-bootstrap'
// import Map from './detailsMap'
import Map from './detailsMap';
import Marker from 'react-google-maps'
import BasicInfo from './BasicInfo'
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
                    <Col lg={8}>Basic info and map
                    <BasicInfo {...this.props} data={this.state}/>
                    </Col>
                    <Col lg={4}>User profile 
                    
                    </Col>
                </Row>


            </div>
            
        )
    }
}
