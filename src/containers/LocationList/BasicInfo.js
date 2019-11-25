import React from 'react'
import Map from './detailsMap';


export default class BasicInfo extends React.Component{
    render(){
        const {name, address, time, description, dataLat, dataLng} = this.props.data

        return(
            <div>
                BasicInfo

                details page.
                <br/>
                <b>Name:</b> {name}
                <br/>
                <b>Address:</b> {address}
                <br/>
                <b>Time:</b> {time}
                <br/>
                <b>Description:</b> {description}
      
                
                <Map
					google={this.props.google}
					center={{lat: parseFloat(localStorage.getItem('lat')), lng: parseFloat(localStorage.getItem('lng'))}}
					height='300px'
                    zoom={15}
                    
				/>
                
            </div>
        )
    }
}