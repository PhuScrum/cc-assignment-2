import React, { Component } from 'react'
import { Button, Card} from 'react-bootstrap';
import LocationCard from './LocationList/LocationCard'

export default class LocationList extends Component {

    componentDidMount(){
        console.log(this.props)
    }
    
    render() {

        var locationListing = this.props.data.location.map(unit => <div>

<hr/>
            <LocationCard {...this.props} data={unit} />
           
        </div>)
        return (
            <div>
                Location List
                {locationListing}
            </div>
        )
    }
}
