import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import LocationCard from './LocationList/LocationCard';
import LocationDetails from './LocationList/LocationDetails'
export default class LocationList extends Component {

    componentDidMount() { 
        console.log(this.props)
    }

    render() {

        var locationListing = this.props.data.locationFilter.map(unit => <div>

            <hr /> 
            <LocationCard {...this.props} data={unit} />
            {/* <LocationDetails {...this.props} data={unit}/> */}
        </div>)
        return (
            <div>
                <SimpleBar style={{ maxHeight: 600 }}>
                    {locationListing}
                </SimpleBar> 


            </div >
        )
    }
}
