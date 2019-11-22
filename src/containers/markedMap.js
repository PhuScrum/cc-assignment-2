import React, { Component } from "react"
import {Link} from "react-router-dom"
import { compose } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"

const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {

  return (
    <GoogleMap defaultZoom={8} defaultCenter={{lat: 10.7291, lng: 106.7189 }}>
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
                 <h4> {marker.name}</h4>
                 <p>{marker.address}</p>
                 <p><Link to ={`/location/${marker._id}`}>Details</Link></p>
                </div>
              </InfoWindow>}
            
          </Marker>
        )
      })}
    </GoogleMap>
  )
})

export default class markedMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shelters: [],
      location: [],
      selectedMarker: false
    }
  }
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
      <MapWithAMarker
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