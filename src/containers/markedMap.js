import React, { Component } from "react"
import {Link} from "react-router-dom"
import { compose } from "recompose"
import Autocomplete from 'react-google-autocomplete';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"
import Geocode from "react-geocode";

const MarkedMap = compose(withScriptjs, withGoogleMap)(props => {

  return (
    <GoogleMap defaultZoom={10} defaultCenter={{lat: 10.7291, lng: 106.7189 }}>
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker)
        return (
          <Marker
            key={marker.id}
            onClick={onClick}
            position={{ lat: marker.lat, lng: marker.lng }}
          >
            {props.selectedMarker === marker &&
              <InfoWindow>
                <div>
                 <h4>{marker.name}</h4>
                 <p>{marker.address}</p>
                 <p><Link to ={`/location/${marker._id}`}>Details</Link></p>
                </div>
              </InfoWindow>}
              <Autocomplete
							style={{
								width: '100%',
								height: '40px',
								paddingLeft: '16px',
								marginTop: '2px',
								marginBottom: '500px'
							}}
							onPlaceSelected={e.onPlaceSelected}
							types={['(regions)']}
						/>
             
            
          </Marker>
        )
      })}
    </GoogleMap>
  )
})

var e
export default class markedMap extends Component {
  constructor(props) {
    super(props)
    e = this
    this.state = {
      shelters: [],
      location: [],
      //test
      selectedMarker: false,
      mapPosition: {
				lat: 0,
				lng: 0
			},
			markerPosition: {
				lat: 0,
				lng: 0
			}
    }
  }
  
  onPlaceSelected = (place) => {
    console.log('plc', place.geometry.location.lat(),
    place.geometry.location.lng());
		const address = place.formatted_address,
			addressArray = place.address_components,
			latValue = place.geometry.location.lat(),
			lngValue = place.geometry.location.lng();
		// Set these values in the state.
		this.setState({
      address: (address) ? address : '',
      lat: 10,
      lng: 106,
			markerPosition: {
				lat: latValue,
				lng: lngValue
			},
			mapPosition: {
				lat: latValue,
				lng: lngValue
      },
    }
    )
	};
  


  componentDidMount() {
    fetch("http://localhost:8080/location")
      .then(r => r.json())
      .then(data => {
        this.setState({ location: data })
      })
  }
  handleClick = (marker, event) => {
    // console.log({ marker })
    this.setState({ selectedMarker: marker })
  }
  render() {
    
    return (
      <MarkedMap 
        mapdata={this.state}

        selectedMarker={this.state.selectedMarker}
        markers={this.state.location}
        onClick={this.handleClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA4UwK6X9-Oa5SdAapdiNPE8nAPJ6INRxw&libraries=places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}