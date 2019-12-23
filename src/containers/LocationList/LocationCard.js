import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, ButtonToolbar, Row, Col } from 'react-bootstrap'


export default class LocationCard extends Component {

    render() {
        const { name, locationOwner, address, description, _id, time, lat, lng, startDate, endDate, organiserName, organiserLogo, organiserSlogan, organiserDescription, organiserEventPhoto, locationInternalOrExternal } = this.props.data
        var ownerLogin = localStorage.getItem('email')
        if (ownerLogin === locationOwner) {
            return (
                <div class="card">
                    <div class="card-body" >
                        <h4 class="card-title">{name}</h4>   <p><b>(You own this clean up site)</b></p>
                        <Row >
                            <Col sm={2}> <img src={organiserLogo} style={{ width: 70 }} /></Col>
                            <Col sm={8}><p><b>Organiser:</b> {organiserName}</p>
                                <p><b>Slogan:</b> {organiserSlogan}</p>
                            </Col>
                        </Row>
                        <b>Organization Description:</b>
                        <p class="card-text">{organiserDescription}</p>
                        <b>Agenda:</b>
                        <p class="card-text">{description}</p>
                        {/* <p>From {startDate} to {endDate}</p> */}
                        <b>Time:</b>
                        <p>{time}</p>
                        <b>Internal or External:</b>
                        <p class="card-text">{locationInternalOrExternal} </p>
                        <b>Location Owner:</b>
                        <p class="card-text">{locationOwner} </p>
                        <Link to={`/location/${_id}`}>See more</Link>
                        <br />
                        <br />
                        <ButtonToolbar>
                            <Button variant="primary " onClick={this.props.handleEdit.bind(this, name, address, description, _id, time, lat, lng, startDate, endDate,
                                organiserName, organiserLogo, organiserSlogan, organiserDescription, organiserEventPhoto, locationInternalOrExternal)}>
                                Edit
                                     </Button>
                            <Button variant="danger" onClick={this.props.handleDeleteLocation.bind(this, _id)}> Delete </Button>
                        </ButtonToolbar>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div class="card">
                    <div class="card-body" >
                        <h4 class="card-title">{name}</h4>   <p><b>(You own this clean up site)</b></p>
                        <Row >
                            <Col sm={2}> <img src={organiserLogo} style={{ width: 70 }} /></Col>
                            <Col sm={8}><p><b>Organiser:</b> {organiserName}</p>
                                <p><b>Slogan:</b> {organiserSlogan}</p>
                            </Col>
                        </Row>
                        <b>Organization Description:</b>
                        <p class="card-text">{organiserDescription}</p>
                        <b>Agenda:</b>
                        <p class="card-text">{description}</p>
                        {/* <p>From {startDate} to {endDate}</p> */}
                        <b>Time:</b>
                        <p>{time}</p>
                        <b>Internal or External:</b>
                        <p class="card-text">{locationInternalOrExternal} </p>
                        <b>Location Owner:</b>
                        <p class="card-text">{locationOwner} </p>
                        <Link to={`/location/${_id}`}>See more</Link>
                        <br />
                        <br />
                       
                    </div>
                </div>

            )
        }
    }
}
