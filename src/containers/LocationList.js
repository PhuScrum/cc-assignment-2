import React, { Component } from 'react'
import { Button, Card} from 'react-bootstrap';
import LocationCard from './LocationList/LocationCard'

export default class LocationList extends Component {
    render() {
        var locationListing = this.props.data.location.map(unit => <div>

<hr/>
            <LocationCard data={unit}/>
           
        </div>)
        return (
            <div>
                Location List
                {locationListing}
            </div>
        )
    }
}
