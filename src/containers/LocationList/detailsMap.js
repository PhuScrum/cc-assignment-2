import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import Popup from "reactjs-popup";


Geocode.setApiKey("AIzaSyA4UwK6X9-Oa5SdAapdiNPE8nAPJ6INRxw");
Geocode.enableDebug();



const urlLocation = 'http://localhost:8080/location'

export default class createLocation extends Component {
	constructor(props) {
		super(props);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeTime = this.onChangeTime.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			mapPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			},
			markerPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			}
		}
	}
	onChangeName(e) {
		this.setState({
			name: e.target.value
		});
	}
	onChangeTime(e) {
		this.setState({
			time: e.target.value
		})
	}
	onChangeDescription(e) {
		this.setState({
			description: e.target.value
		})
	}

	onSubmit(e) {
		e.preventDefault();
		this.registerLocation();
		console.log(`The values are ${this.state.name}, ${this.state.time},  
		${this.state.description}, ${this.state.address}, `)
		this.setState({
			name: '',
			time: '',
			description:''
		})
	}

	
	///map 
	componentDidMount() {
		console.log(this.props.center.lat, this.props.center.lng)
		Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng).then(
			response => {
				const address = response.results[0].formatted_address;
				this.setState({
					address: (address) ? address : '',
				})
				
			},
			error => {
				console.error(error);
			}
		);
	};
	/// 2nd phase
	/**
		 * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
		 *
		 * @param nextProps
		 * @param nextState
		 * @return {boolean}
		 */
	shouldComponentUpdate(nextProps, nextState) {
		if (
			this.state.markerPosition.lat !== this.props.center.lat ||
			this.state.address !== nextState.address
		) {
			return true
		} else if (this.props.center.lat === nextProps.center.lat) {
			return false
		}
	}
	//phase 3
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
	getState = (addressArray) => {
		let state = '';
		for (let i = 0; i < addressArray.length; i++) {
			for (let i = 0; i < addressArray.length; i++) {
				if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
					state = addressArray[i].long_name;
					return state;
				}
			}
		}
	};
	/**
	 * And function for District,state and address input
	 * @param event
	 */
	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	/**
	 * This Event triggers when the marker window is closed
	 *
	 * @param event
	 */
	onInfoWindowClose = (event) => {

	};


	

	/**
	 * When the user types an address in the search box
	 * @param place
	 */
	onPlaceSelected = (place) => {
		console.log('plc', place);
		const address = place.formatted_address,
			addressArray = place.address_components,
			latValue = place.geometry.location.lat(),
			lngValue = place.geometry.location.lng();
		// Set these values in the state.
		this.setState({
			address: (address) ? address : '',
			mapPosition: {
				lat: latValue,
				lng: lngValue
			},
		})
	};
	togglePopup() {
		this.setState({
			showPopup: !this.state.showPopup
		});
	};

	
	render() {

		const AsyncMap = withScriptjs(
			withGoogleMap(
				props => (
					<GoogleMap google={this.props.google}
						defaultZoom={this.props.zoom}
						defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
					>
						{/* InfoWindow on top of marker */}
						<InfoWindow
							onClose={this.onInfoWindowClose}
							position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
						>
							<div>
								<span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
							</div>
						</InfoWindow>
						{/*Marker*/}
						<Marker google={this.props.google}
							name={'Dolores park'}
							onDragEnd={this.onMarkerDragEnd}
							position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
						/>
						<Marker />
					</GoogleMap>
				)
			)
		);
		let map;
		if (this.props.center.lat !== undefined) {
			map = <div>

				<form onSubmit={this.onSubmit}>
					
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
					<br />
					<br />
					<br />
					<div className="form-group">
					
			
					</div>
				</form>



			</div>
		} else {
			map = <div style={{ height: this.props.height }} />
		}
		return (map)
	}




	
	// render(){
	
	// 		return (
	// 			<div>
	// 			<div style={{ marginTop: 10 }}>
	// 				<h3>Add New Business</h3>
	// 				<form onSubmit={this.onSubmit}>
	// 					<div className="form-group">
	// 						<label>Person Name:  </label>
	// 						<input 
	// 						  type="text" 
	// 						  className="form-control" 
	// 						  value={this.state.person_name}
	// 						  onChange={this.onChangePersonName}
	// 						  />
	// 					</div>
	// 					<div className="form-group">
	// 						<label>Business Name: </label>
	// 						<input type="text" 
	// 						  className="form-control"
	// 						  value={this.state.business_name}
	// 						  onChange={this.onChangeBusinessName}
	// 						  />
	// 					</div>
	// 					<div className="form-group">
	// 						<label>GST Number: </label>
	// 						<input type="text" 
	// 						  className="form-control"
	// 						  value={this.state.business_gst_number}
	// 						  onChange={this.onChangeGstNumber}
	// 						  />
	// 					</div>
	// 					<div className="form-group">
	// 						<input type="submit" value="Register Business" className="btn btn-primary"/>
	// 					</div>
	// 				</form>
	// 			</div>
	// 			</div>
	// 		)
		
	// }



  
}

