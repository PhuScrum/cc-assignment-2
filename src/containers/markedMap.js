import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
Geocode.setApiKey( "AIzaSyA4UwK6X9-Oa5SdAapdiNPE8nAPJ6INRxw" );
Geocode.enableDebug();
const urlLocation = 'http://localhost:8080/location'

class Map extends Component{

	constructor( props ){
		super( props );
		this.state = {
      location:[],
			address: '',
			District: '',
			state: '',
			mapPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			},
			markerPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
      },
      stores: [{name: 'test name', description: 'description', address:'address',
        lat: 47.49855629475769, lng: -122.14184416996333},
        {lat: 47.359423, lng: -122.021071},
        {lat: 47.2052192687988, lng: -121.988426208496},
        {lat: 47.6307081, lng: -122.1434325},
        {lat: 47.3084488, lng: -122.2140121},
        {lat: 47.5524695, lng: -122.0425407}]
		}
  }
  fetchLocation() {
    console.log('fuck')
    fetch(urlLocation)
        .then(response => response.json())
        .then(data => {
            this.setState({ location: data })
            console.log(this.state.location)
        })
}



  displayMarkers = () => {
    return this.props.data.location.map((location, index) => {
      return <Marker key={index} id={index} position={{
       lat: location.lat,
       lng: location.lng
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }
  
	/**
	 * Get the current address from the default map position and set those values in the state
	 */
	componentDidMount() {
    this.fetchLocation()
		Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
			response => {
				const address = response.results[0].formatted_address,
				      addressArray =  response.results[0].address_components,
				      District = this.getDistrict( addressArray ),
				      state = this.getState( addressArray );

				console.log( 'District', District, state );

				this.setState( {
					address: ( address ) ? address : '',
					District: ( District ) ? District : '',
					state: ( state ) ? state : '',
				} )
			},
			error => {
				console.error( error );
			}
		);
	};
	/**
	 * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
	 *
	 * @param nextProps
	 * @param nextState
	 * @return {boolean}
	 */
	shouldComponentUpdate( nextProps, nextState ){
		if (
			this.state.markerPosition.lat !== this.props.center.lat ||
			this.state.address !== nextState.address ||
			this.state.District !== nextState.District ||
			this.state.state !== nextState.state
		) {
			return true
		} else if ( this.props.center.lat === nextProps.center.lat ){
			return false
		}
	}
	/**
	 * Get the District and set the District input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getDistrict = ( addressArray ) => {
		let District = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
				District = addressArray[ i ].long_name;
				return District;
			}
		}
	};
	/**
	 * Get the area and set the area input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */

	/**
	 * Get the address and set the address input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getState = ( addressArray ) => {
		let state = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			for( let i = 0; i < addressArray.length; i++ ) {
				if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
					state = addressArray[ i ].long_name;
					return state;
				}
			}
		}
	};
	/**
	 * And function for District,state and address input
	 * @param event
	 */
	onChange = ( event ) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	/**
	 * This Event triggers when the marker window is closed
	 *
	 * @param event
	 */
	onInfoWindowClose = ( event ) => {

	};

	/**
	 * When the marker is dragged you get the lat and long using the functions available from event object.
	 * Use geocode to get the address, District, area and state from the lat and lng positions.
	 * And then set those values in the state.
	 *
	 * @param event
	 */
	onMarkerDragEnd = ( event ) => {
		let newLat = event.latLng.lat(),
		    newLng = event.latLng.lng();

		Geocode.fromLatLng( newLat , newLng ).then(
			response => {
				const address = response.results[0].formatted_address,
				      addressArray =  response.results[0].address_components,
				      District = this.getDistrict( addressArray ),
				      state = this.getState( addressArray );
				this.setState( {
					address: ( address ) ? address : '',
					District: ( District ) ? District : '',
					state: ( state ) ? state : '',
					markerPosition: {
						lat: newLat,
						lng: newLng
					},
					mapPosition: {
						lat: newLat,
						lng: newLng
					},
				} )
			},
			error => {
				console.error(error);
			}
		);
	};

	/**
	 * When the user types an address in the search box
	 * @param place
	 */
	onPlaceSelected = ( place ) => {
		console.log( 'plc', place );
		const address = place.formatted_address,
		      addressArray =  place.address_components,
		      District = this.getDistrict( addressArray ),
		      state = this.getState( addressArray ),
		      latValue = place.geometry.location.lat(),
		      lngValue = place.geometry.location.lng();
		// Set these values in the state.
		this.setState({
			address: ( address ) ? address : '',
			District: ( District ) ? District : '',
			state: ( state ) ? state : '',
			markerPosition: {
				lat: latValue,
				lng: lngValue
			},
			mapPosition: {
				lat: latValue,
				lng: lngValue
			},
		})
	};


	render(){
		const AsyncMap = withScriptjs(
			withGoogleMap(
				props => (
					<GoogleMap google={ this.props.google }
					           defaultZoom={ this.props.zoom }
					           defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
					>
						{/* InfoWindow on top of marker */}
						
		
						{/*Marker*/}
            {this.displayMarkers()}
						
					</GoogleMap>
				)
			)
		);
		let map;
		if( this.props.center.lat !== undefined ) {
			map = <div>
				<div>
					
				</div>

				<AsyncMap
					googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA4UwK6X9-Oa5SdAapdiNPE8nAPJ6INRxw&libraries=places"
					loadingElement={
						<div style={{ height: `100%` }} />
					}
					containerElement={
						<div style={{ height: this.props.height }} />
					}
					mapElement={
						<div style={{ height: `100%` }} />
					}
				/>
			</div>
		} else {
			map = <div style={{height: this.props.height}} />
		}
		return( map )
	}
}
export default Map
