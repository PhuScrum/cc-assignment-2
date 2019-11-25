import React, { Component } from 'react'
import {Link} from 'react-router-dom'


export default class LocationCard extends Component {
    render() {
        const { name, locationOwner, address, description, _id, time } = this.props.data
        var ownerLogin = localStorage.getItem('email')
        if(ownerLogin === locationOwner){
        return (
                <div class="card">
                    <div class="card-body" >
                        
                        <h4 class="card-title">{name}</h4> 
                        <p class="card-text">{description}</p>
                        <p>{time}</p>
                        <p class="card-text">{locationOwner} </p>
                        <Link  to={`/location/${_id}` }>Details</Link>
                        <br/>
                        <br/>
                        <p>You own this location</p>
                        {/* <p><button> <Link to={`/Home2`} onClick={this.props.handleEditLocation.bind(this)}>Edit</Link></button> <button>Delete</button></p> */}
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
                    <p>{time}</p>
                    <p class="card-text">{locationOwner} </p>
                    <Link  to={`/location/${_id}` }>Details</Link>

                </div>
            </div>
            
            )
         }
    }
}
