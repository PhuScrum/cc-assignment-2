import React, { Component } from 'react'
import {Col, Row} from 'react-bootstrap'
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
                const {name, address, time, description} = data
                console.log(data.name)
                this.setState({
                    name: name,
                    address: address,
                    time: time,
                    description: description
                })
            })



    }

    componentDidMount(){
        this.fetchLocation(this.props.match.params.id)
    }
    render() {
        const {name, address, time, description} = this.state
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
            </div>
        )
    }
}
