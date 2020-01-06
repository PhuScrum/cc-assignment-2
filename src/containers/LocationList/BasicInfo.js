import React from 'react'
import Map from './detailsMap';


export default class BasicInfo extends React.Component{
    render(){
        const {name, address, time, description, dataLat, dataLng} = this.props.data
        return( 
            
            <div>
                
                <br/>
                <b>Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b> {name}
                <br/>
                <b>Address&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b> {address}
                <br/>
                <b>Time&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b> {time}
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