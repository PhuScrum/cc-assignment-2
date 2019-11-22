import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class LocationCard extends Component {
    render() {
        const { name, address, description, _id, time } = this.props.data
        return (

                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">{name}</h4>
                        <p class="card-text">{description}</p>
                        <p>{time}</p>
                        <Link to={`/location/${_id}`}>Details</Link>
                    </div>
                </div>
        )
    }
}
