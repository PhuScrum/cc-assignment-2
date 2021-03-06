import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete'; 
// import Popup from "reactjs-popup";
import { Modal} from 'antd';
import CreateLocationInfo from './createLocationInfo'

Geocode.setApiKey("AIzaSyA4UwK6X9-Oa5SdAapdiNPE8nAPJ6INRxw");
Geocode.enableDebug();





export default class createLocation extends Component {
	constructor(props) {
		super(props);

		// cant transfer to app cause dont know what this is
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




	///map 
	componentDidMount() {
		console.log(this.props)
		console.log(this.props.isAuthenticated)
		Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng).then(
			response => {
				this.props.appdata.address = response.results[0].formatted_address;
				const address = this.props.appdata.address
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
	// shouldComponentUpdate(nextProps, nextState) {
	// 	if (
	// 		this.state.markerPosition.lat !== this.props.center.lat ||
	// 		this.state.address !== nextState.address ||
	// 		this.props.appdata.name !== nextState.name ||
	// 		this.props.appdata.time !== nextState.time ||
	// 		this.props.appdata.description !== nextState.description
	// 	) {
	// 		return true
	// 	} else if (this.props.center.lat === nextProps.center.lat) {
	// 		return false
	// 	}
	// }
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
				if (addressArray[i].types[0] && 'administrative_area_level_5' === addressArray[i].types[0]) {
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
				this.props.appdata.address = response.results[0].formatted_address;
				const address = this.props.appdata.address,
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
				// localStorage.setItem("newLat", this.state.mapPosition.lat);
				// localStorage.setItem("newLng", this.state.mapPosition.lng);
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
		this.props.appdata.address = place.formatted_address;
				const address = this.props.appdata.address,

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
	/// modal
	showModal = () => {
		this.setState({
			visible: true,
			
		});
	};

	handleOk = e => {
		console.log(e);
		this.setState({
			visible: false,
		});
	};

	handleCancel = e => {
		console.log(e);
		this.setState({
			visible: false,
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
							position={{ lat: (this.state.markerPosition.lat + 0.0028), lng: this.state.markerPosition.lng }}
						>
							<div>
								<span style={{ padding: 0, margin: 0 }}>{this.props.appdata.address}</span>
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
							types={[this.getState]}
						/>
					</GoogleMap>
				)
			)
		);
		const { markerPosition } = this.state
		let map;
		if (this.props.center.lat !== undefined) {
			map = <div>

				<CreateLocationInfo {...this.props} />
				<br/>
				<div onClick={this.showModal} className="form-group">
					<label htmlFor="">Address</label>
					<input type="text" name="address" className="form-control" onChange={this.onChange} readOnly="readOnly" value={this.state.address} />
				</div>


				<Modal
					title={<h3>Select a CleanUp Location</h3>}
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					width= {1000}
				>

					<AsyncMap 
						googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA4UwK6X9-Oa5SdAapdiNPE8nAPJ6INRxw&libraries=places"
						loadingElement={
							<div style={{ height: `110%` }} />
						}
						containerElement={
							<div style={{ height: this.props.height }} />
						}
						mapElement={
							<div style={{ height: `110%` }} />
						}
					/>
					<br/>
					<br/>
					<br/>
					<br/>
					
				</Modal>



				<div className="form-group">

					<button type="submit" className="btn btn-primary" onClick={this.props.onSubmit.bind(this, markerPosition.lat, markerPosition.lng)}>Register</button>

				</div>


			</div>
		} else {
			map = <div style={{ height: this.props.height }} />
		}
		return (map)
	}

}

