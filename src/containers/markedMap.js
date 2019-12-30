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
  const showOnMap = localStorage.getItem('showOnMap')
  return (
    <GoogleMap defaultZoom={11} defaultCenter={{lat: e.state.mapPosition.lat, lng: e.state.mapPosition.lng }}>
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker)
        return (
          <Marker
            animation={marker ? (marker.name === showOnMap ? '1' : '0') : '0'}
            key={marker.id}
            onClick={onClick}
            position={{ lat: marker.lat, lng: marker.lng }}
          >
            {props.selectedMarker === marker &&
              <InfoWindow>
                <div>
                 <h4>{marker.name}</h4>
                 <p>{marker.address}</p>
                <p>{marker.description}</p>
                 <p><Link to ={`/location/${marker._id}`}>See more</Link></p>
                </div>
              </InfoWindow>}
             
             
            
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
        lat: 10.8231,
        lng: 106.6297
      }
      
    }
  }
  
  // onPlaceSelected = (place) => {
  //   // console.log('plc', place.geometry.location.lat(),
  //   // place.geometry.location.lng());
	// 	const address = place.formatted_address,
	// 		addressArray = place.address_components,
	// 		latValue = place.geometry.location.lat(),
	// 		lngValue = place.geometry.location.lng();
	// 	// Set these values in the state.
	// 	this.setState({
  //     address: (address) ? address : '',
	// 		mapPosition: {
	// 			lat: latValue,
	// 			lng: lngValue
  //     },
  //   }
    
  //    )
  //   // localStorage.setItem("homeLat", this.state.mapPosition.lat)
  //   // localStorage.setItem("homeLng", this.state.mapPosition.lng)
  //   console.log('lat',this.state.mapPosition.lat, 'lng',this.state.mapPosition.lng)
  //   // window.location.reload()
	// };
  

  componentDidMount() {
    fetch("https://vietnamsachvaxanh.com/location")
      .then(r => r.json())
      .then(data => {
        this.setState({ 
          location: data
          })
      })
  }
  handleClick = (marker, event) => {
    // console.log({ marker })
    this.setState({ selectedMarker: marker })
    // console.log('markedmap', marker.showOnMap)
  }

  render() {
    
    return (
      <MarkedMap 
        selectedMarker={this.state.selectedMarker}
        markers={this.state.location}
        onClick={this.handleClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA4UwK6X9-Oa5SdAapdiNPE8nAPJ6INRxw&libraries=places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `600px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}