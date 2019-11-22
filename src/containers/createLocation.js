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
		${this.state.description}, ${this.state.address}, lat ${this.state.markerPosition.lat}, lng ${this.state.markerPosition.lng}`)
		this.setState({
			name: '',
			time: '',
			description:''
		})
	}

	registerLocation(){
		const {name, address, time, description} = this.state
		const {lat, lng} = this.state.markerPosition
		console.log(name, address, time, description, lat, lng)
		fetch(urlLocation, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
 
            },
            method: 'POST',
            body: JSON.stringify({
				
				// add more values
			   "name": this.state.name,
			   "address": this.state.address,
			   "time": this.state.time,
			   "description": this.state.description,
			   "lat": lat,
			   "lng": lng,
			   "locationOwner": localStorage.getItem("email")
            }
            )
        })
            .then(resp => resp.json())

	};

	///map 
	componentDidMount() {
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
	 * When the marker is dragged you get the lat and long using the functions available from event object.
	 * Use geocode to get the address, District, area and state from the lat and lng positions.
	 * And then set those values in the state.
	 *
	 * @param event
	 */
	onMarkerDragEnd = (event) => {
		let newLat = event.latLng.lat(),
			newLng = event.latLng.lng();

		Geocode.fromLatLng(newLat, newLng).then(
			response => {
				const address = response.results[0].formatted_address,
					addressArray = response.results[0].address_components;
				this.setState({
					address: (address) ? address : '',
					markerPosition: {
						lat: newLat,
						lng: newLng
					},
					mapPosition: {
						lat: newLat,
						lng: newLng
					},
				})
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
	onPlaceSelected = (place) => {
		console.log('plc', place);
		const address = place.formatted_address,
			addressArray = place.address_components,
			latValue = place.geometry.location.lat(),
			lngValue = place.geometry.location.lng();
		// Set these values in the state.
		this.setState({
			address: (address) ? address : '',
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
							draggable={true}
							onDragEnd={this.onMarkerDragEnd}
							position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
						/>
						<Marker />
						{/* For Auto complete Search Box */}
						<Autocomplete
							style={{
								width: '100%',
								height: '40px',
								paddingLeft: '16px',
								marginTop: '2px',
								marginBottom: '500px'
							}}
							onPlaceSelected={this.onPlaceSelected}
							types={['(regions)']}
						/>
					</GoogleMap>
				)
			)
		);
		let map;
		if (this.props.center.lat !== undefined) {
			map = <div>

				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Name: </label>
						<input type="text"
							className="form-control"
							value={this.state.name}
							onChange={this.onChangeName}
						/></div>
					<label>Time: </label>
					<input type="text"
						className="form-control"
						value={this.state.time}
						onChange={this.onChangeTime}
					/>
					<br/>
					<label>Description: </label>
					<input type="text"
						className="form-control"
						value={this.state.description}
						onChange={this.onChangeDescription}
					/>
					<div>
						<br />
						<div className="form-group">
							<label htmlFor="">Address</label>
							<input type="text" name="address" className="form-control" onChange={this.onChange} readOnly="readOnly" value={this.state.address} />
						</div>
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
					<br />
					<br />
					<br />
					<div className="form-group">

						<Popup trigger={<button type="submit" className="btn btn-primary" >Register Location</button>} position="right center">
							<div>Location Successfully Registered</div>
						</Popup>
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

