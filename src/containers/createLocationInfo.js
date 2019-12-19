import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import Popup from "reactjs-popup";
import {Modal, Button} from "react-bootstrap"
import CreateLocation from "./createLocation"
import { TimePicker, DatePicker } from 'antd';
Geocode.setApiKey("AIzaSyA4UwK6X9-Oa5SdAapdiNPE8nAPJ6INRxw");
Geocode.enableDebug();






export default class CreateLocationInfo extends Component {
	constructor(props) {
		super(props);
		
		// cant transfer to app cause dont know what this is
		this.state = {
			value:null
		}
		
	}
	


	///map 
	componentDidMount() {
		console.log(this.props)
		console.log(this.props.isAuthenticated)	
		
	};
	
	/**
	 * And function for District,state and address input
	 * @param event
	 */
	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};


	handleClose(){
		this.setState({
			show : false
		})
	}

	onChange = time => {
		console.log(time);
		this.setState({ value: time });
	  };
	
	render() {
        return(
		<div>
				
				
				
					<div className="form-group">
						<label>Name:</label>
						<input type="text"
							className="form-control"
							value={this.props.appdata.name}
							onChange={this.props.onChangeName.bind(this)}/>
						<div style={{ color:'red'}} className="error" id="error-name" />
						</div>
						
					<label>Time: </label>
					{/* <input type="text"
						className="form-control"
						value={this.props.appdata.time}
						onChange={this.props.onChangeTime.bind(this)}
					/> */}
					<br/>
					{/* change time into array to store start and end time  */}
					Start Date and Time: 
					<DatePicker/>
					<TimePicker value={this.props.appdata.time} onChange={this.onChange} />
					&nbsp;&nbsp;
					End Time: 
					<TimePicker value={this.props.appdata.time} onChange={this.onChange} />
					<div style={{ color:'red'}} className="error" id="error-time" />
					<br/>
					<label>Description: </label>
					<input type="text"
						className="form-control"
						value={this.props.appdata.description}
						onChange={this.props.onChangeDescription.bind(this)}
					/>
					<div style={{ color:'red'}} className="error" id="error-description" />
					<div>
						<br />
						<div className="form-group">
							<label htmlFor="">Id</label> 
							<input type="text" name="address" className="form-control" readOnly="readOnly" value={this.props.appdata.id} />
						</div>
						
					</div>
				
					
					<div className="form-group">
						
					</div>



			</div>
	)
		}
		
	}


  

