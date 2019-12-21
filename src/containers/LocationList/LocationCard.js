import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Button, ButtonToolbar} from 'react-bootstrap'


export default class LocationCard extends Component {
    
    render() {
        const { name, locationOwner, address, description, _id, time, lat, lng, startDate, endDate} = this.props.data
        var ownerLogin = localStorage.getItem('email')
        if(ownerLogin === locationOwner){
        return ( 
                <div class="card">
                    <div class="card-body" >
                        <h4 class="card-title">{name}</h4>   <p><b>(You own this clean up site)</b></p>
                        
                        <p class="card-text">{description}</p>
                        {/* <p>From {startDate} to {endDate}</p> */}
                        <p>Time: From {time}</p>
                        <p class="card-text">{locationOwner} </p> 
                        <Link  to={`/location/${_id}` }>See more</Link>
                        <br/>
                        <br/> 
                        <ButtonToolbar>
                        <Button variant="primary " onClick={this.props.handleEdit.bind(this, name, address, description, _id, time, lat, lng, startDate, endDate)}>Edit</Button>
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
                    <h4 class="card-title">{name}</h4>
                    <p class="card-text">{description}</p>
                    {/* <p>From {startDate} to {endDate}</p> */}
                    <p>time {time}</p>
                    <p class="card-text">{locationOwner} </p>
                    <p></p>
                    <Link  to={`/location/${_id}` }>See more </Link>

                </div>
            </div>
            
            )
         }
    }
}
