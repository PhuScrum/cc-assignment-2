import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, ButtonToolbar, Row, Col } from 'react-bootstrap'
import { FaMapMarked } from "react-icons/fa";

const axios = require('axios').default
const fetchUserByEmail_URL = 'https://vietnamsachvaxanh.com/fetchUserByEmail'
export default class LocationCard extends Component {
    constructor(props){
        super(props)
        this.state ={
            
            members: [], 
            location:[],
            currentUser: localStorage.getItem('email'),
            userType: '',
        }
        
    }

    fetchOwner() {

		fetch(fetchUserByEmail_URL, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'

			},
			method: 'POST',
			body: JSON.stringify({
				'userEmail': this.state.currentUser
			}
			)
		})
			.then(resp => resp.json())
			.then(data => {
				// console.log('user info', data)
				if (data) {
					const { fName, lName, age, gender, userType } = data
					// console.log(data.name)
					this.setState({
						userType: userType
						// phoneNumber: phoneNumber,

					})
                }




			})

	}
 
componentDidMount(){
    this.fetchOwner()

}

    
    
    render() {  
        const {members, name, locationOwner, address, description, _id, time, lat, lng, startDate, endDate, organiserName, organiserLogo, organiserSlogan, organiserDescription, organiserEventPhoto, locationInternalOrExternal, payStatus } = this.props.data
        var currentUser = localStorage.getItem('email')
        // console.log('location owner', locationOwner)
        if (currentUser === locationOwner) {
            return (
                <div class="card">
                    <div class="card-body" >
                        <h4 class="card-title"><FaMapMarked onClick={ () => this.props.showOnMap(name)}/> &nbsp; {name}  </h4> 
                        {/* <Button onClick={ () => this.props.showOnMap(name) }>Show on Map</Button>    */}
                        <p><b>(You own this clean up site)</b></p>
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
        else if(members.includes(currentUser)){
            return(
                <div class="card">
                    <div class="card-body" >
                        <h4 class="card-title"><FaMapMarked onClick={ () => this.props.showOnMap(name)}/> &nbsp; {name} </h4> 
                        {/* <Button onClick={ () => this.props.showOnMap(name) }></Button> */}
                        <p><b>You joined this location.</b></p>
                         
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
        else if(this.state.userType === 'admin'){
            return(
                <div class="card">
                    <div class="card-body" >
                        <h4 class="card-title"><FaMapMarked onClick={ () => this.props.showOnMap(name)}/> &nbsp; {name} </h4> 
                        {/* <Button onClick={ () => this.props.showOnMap(name) }></Button> */}
                        <p><b>Payment status: &nbsp;</b><text ghost={payStatus ? true : false} type={payStatus ? 'primary': 'default'} >
                            {payStatus ? 'Paid': 'Unpaid'}</text></p>
                         
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
        
        else {
            return (
                <div class="card">
                    <div class="card-body" >
                        <h4 class="card-title"><FaMapMarked onClick={ () => this.props.showOnMap(name)}/> &nbsp; {name} </h4> 
                        {/* <Button onClick={ () => this.props.showOnMap(name) }></Button> */}
                         
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
