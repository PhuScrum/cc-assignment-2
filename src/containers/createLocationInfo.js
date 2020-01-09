import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import Popup from "reactjs-popup";
import { Modal, Button } from "react-bootstrap"
import CreateLocation from "./createLocation"
import { TimePicker, DatePicker } from 'antd';
import FileUpload from './FileUpload';
Geocode.setApiKey("AIzaSyA4UwK6X9-Oa5SdAapdiNPE8nAPJ6INRxw");
Geocode.enableDebug();




export default class CreateLocationInfo extends Component {
	constructor(props) {
		super(props);

		// cant transfer to app cause dont know what this is
		this.state = {
			time: null,
			checkbox: false,
			checkbox2: false,
			inOut: '',
			imageUrl: ''
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


	handleClose() {
		this.setState({
			show: false
		})
	}


	uploadImage = (imageUrl) => {
		console.log('location info', imageUrl)
		this.setState({imageUrl: imageUrl})
  	}

	onChangeStartTime = time => {
		console.log(time);
		this.setState({ value: time });
	};
	// testing 
	onChangeStartDate = (field, value) => {
		this.setState({
			[field]: value,
		});
	};

	onStartChange = value => {
		this.onChangeStartDate('startValue', value);
	};

	onEndChange = value => {
		this.onChange('endValue', value);
	};
	handleStartOpenChange = open => {
		if (!open) {
			this.setState({ endOpen: true });
		}
	};
	// testing 


	render() {
		return (
			<div>



				<div className="form-group">
					<label>Clean Up Name:</label>
					<input type="text"
						className="form-control"
						value={this.props.appdata.name}
						onChange={this.props.onChangeName.bind(this)} />
					<div style={{ color: 'red' }} className="error" id="error-name" />
				</div>

				<div className="form-group">
					<label>Organization Name:</label>
					<input type="text"
						className="form-control"
						value={this.props.appdata.organiserName}
						onChange={this.props.onChangeOrgName.bind(this)} />
					<div style={{ color: 'red' }} className="error" id="error-organiserName" />
				</div>

				<label>Organization Logo:</label>
				{/* <input type="text"
					className="form-control"
					value={this.props.appdata.organiserLogo}
					onChange={this.props.onChangeOrgLogo.bind(this)}
					placeholder='Please enter the organiser logo url'
					
				/> */}

				
				<FileUpload type='orgLogo' uploadCallback = {this.uploadImage} {...this.props}/>

				{/* <div style={{ color: 'red' }} className="error" id="error-name" /> */}

				<br />
				<label>Organization Slogan:</label>
				<input type="text"
					className="form-control"
					value={this.props.appdata.organiserSlogan}
					onChange={this.props.onChangeOrgSlogan.bind(this)}
				/>

				<div style={{ color: 'red' }} className="error" id="error-organiserSlogan" />
				<br />
				<label>Organization Description:</label>
				<input type="text"
					className="form-control"
					value={this.props.appdata.organiserDescription}
					onChange={this.props.onChangeOrgDescription.bind(this)}
				/>

				<div style={{ color: 'red' }} className="error" id="error-organiserDescription" />
				<br />
				<label>Organization Previous Event Photo:</label>
				{/* <input type="text"
					className="form-control"
					value={this.props.appdata.organiserEventPhoto}
					onChange={this.props.onChangeOrgEventPhoto.bind(this)}
					placeholder='Please enter the previous event photo URL'
				/> */}
				<div style={{ color: 'red' }} className="error" id="error-organiserEventPhoto" />

				<FileUpload type='evPhoto' uploadCallback = {this.uploadImage} {...this.props}/>

				{/* <div style={{ color: 'red' }} className="error" id="error-name" /> */}
				<br />

				<label>Time: </label>
				<br />
				Start Date and Time:
					<DatePicker
					showTime
					format="YYYY-MM-DD HH:mm:ss"
					use12Hours
					value={this.props.appdata.startDate}
					placeholder="Start Time"
					onChange={this.props.onStartChangeDate}
					onOpenChange={this.props.handleStartOpenChangeDate}
				/>
				{/* <TimePicker use12Hours format="h:mm a" value={this.props.appdata.startTime} onChange={this.props.onChangeStartTime.bind(this)} /> */}
				&nbsp;&nbsp;
				End Time:
					<DatePicker
					showTime
					format="YYYY-MM-DD HH:mm:ss"
					use12Hours
					value={this.props.appdata.endDate}
					placeholder="End Time"
					onChange={this.props.onStartChangeEndDate}
					onOpenChange={this.props.handleStartOpenChangeEndDate}
				/>
				{/* <TimePicker use12Hours format="h:mm a" value={this.props.appdata.endTime} onChange={this.props.onChangeEndTime.bind(this)} /> */}
				<div style={{ color:'red'}} className="error" id="error-time" />
				<br />
				<br />
				<label>Clean Up Agenda: </label>
				<input type="text"
					className="form-control"
					value={this.props.appdata.description}
					onChange={this.props.onChangeDescription.bind(this)}
				/>
				<div style={{ color: 'red' }} className="error" id="error-description" />

				<br />
				<label> Internal or External:</label>
				<br />
				
				<select style={{height: 30}} value={this.props.appdata.locationInternalOrExternal} onChange={this.props.handleChangeInternalExternal.bind(this)}>
					<option></option>
					<option value="Internal">Internal</option>
					<option selected value="External">External</option>
					<option value="Both">Both</option>
					
				</select>
				<div style={{ color: 'red' }} className="error" id="error-locationInternalOrExternal" />
				
				<br />

				<div>
					<br />
					<div className="form-group">
						<label htmlFor="">Id</label>
						<input type="text" name="address" className="form-control" readOnly="readOnly" value={this.props.appdata.id} />
					</div>

				</div>



			</div>
		)
	}

}




