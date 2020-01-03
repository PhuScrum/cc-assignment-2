import React from 'react'
import Map from './detailsMap';
import { Col, Row } from 'react-bootstrap'

export default class BasicInfo extends React.Component {
    render() {
        const { name, address, time, description,
            organiserName,
            organiserLogo,
            organiserSlogan,
            organiserDescription,
            locationInternalOrExternal } = this.props.data
        return (

            <div>
                <Row>
                    <Col sm={3}>
                        <img style={{ width: 150 }} src={organiserLogo} />
                    </Col>
                    <Col >
                        <p><b>Organization Name:</b> {organiserName}</p>

                        <p><b>Slogan:</b> {organiserSlogan}</p>
                        <p><b>About Us:</b> {organiserDescription}</p>
                    </Col>
                </Row>
                <br />
                <b>Site Name&nbsp;&nbsp;&nbsp;:</b> {name}
                <br />
                <b>Address&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b> {address}
                <br />
                <b>Time&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b> {time}
                <br />
                <b>Agenda&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b> {description}
                <br />
                <b>External or Internal: </b>{locationInternalOrExternal}
                <hr/>


                <Map
                    google={this.props.google}
                    center={{ lat: parseFloat(localStorage.getItem('lat')), lng: parseFloat(localStorage.getItem('lng')) }}
                    height='300px'
                    zoom={15}

                />

            </div>
        )
    }
}