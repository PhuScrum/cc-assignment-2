import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Button, ButtonToolbar} from 'react-bootstrap'



export default class LocationCard extends Component {
    constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
            location: [],
            attended: 0,
            cost: 0,
            kilos: 0

		};
	}

    
    


    render() {
        // const { name, locationOwner, address, description, _id, time, lat, lng, input } = this.data
        var ownerLogin = localStorage.getItem('email')
        console.log(this.state.location)
        return (
                <div class="card">
                    <div class="card-body" >
                        
                        <h4 class="card-title">{this.props.data.name}</h4> 
        <p>{this.props.data.input.attended} {this.props.data.input.cost} {this.props.data.input.kilos}</p>
                        {/* <Link  to={`/location/${_id}` }>Details</Link> */}
                        <br/>
                        <br/> 
                      
                    </div>
                </div>
        )
        
     
           
         
    }
}
