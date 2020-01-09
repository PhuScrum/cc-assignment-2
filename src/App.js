import { LinkContainer } from 'react-router-bootstrap';
import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';

import { Nav, Navbar, NavItem } from 'react-bootstrap';
import Routes from './Routes';
import { Auth } from 'aws-amplify';
import 'antd/dist/antd.css';
import './index.css';
import './App.css';
// import registerServiceWorker from './registerServiceWorker';
// const fetchUserByEmail_URL = 'https://vietnamsachvaxanh.com/fetchUserByEmail'
// const urlLocation = 'https://vietnamsachvaxanh.com/location'
const fetchUserByEmail_URL = 'https://vietnamsachvaxanh.com/fetchUserByEmail'
const urlLocation = 'https://vietnamsachvaxanh.com/location'
const editUser = 'https://vietnamsachvaxanh.com/editUser'

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			// assignment 3 required info
			organiserName: '',
			organiserLogo: '',
			organiserSlogan: '',
			organiserDescription: '',
			organiserEventPhoto: '',
			locationInternalOrExternal: '',
			// time and date picker
			startDate: null,
			endDate: null,
			startDatee: null,
			endDatee: null,
			startTime: null,
			endTime: null,
			value: null,
			startValue: null,
			//epoch
			epochStartDate: null,
			epochEndDate: null,
			// end of time date picker

			// end of assignment 3 required info
			name: '',
			time: '',
			//  this.startDate + this.startTime + ' to ' + this.endTime,
			address: '',
			description: '',
			lat: 10.8231,
			lng: 106.6297,
			isAuthenticated: false,
			isAuthenticating: true,
			id: '',
			zoom: 15,
			siteOwner: '',
			userType: '',
			adminEmail: '',
			error_name: '',
			error_time: '',
			error_description: '',

			hasCreatedLocation:'',

			
			showOnMap:null

		};

		this.testDropping = this.testDropping.bind(this)
		// createlocation
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		// this.registerLocation = this.registerLocation.bind(this);
		//edit location
		this.handleEdit = this.handleEdit.bind(this);
		//delete location
		this.handleDeleteLocation = this.handleDeleteLocation.bind(this);
		// start date
		this.onChangeStartTime = this.onChangeStartTime.bind(this);
		this.onChangeEndTime = this.onChangeEndTime.bind(this);
		this.onChangeStartDate = this.onChangeStartDate.bind(this);
		this.onStartChangeDate = this.onStartChangeDate.bind(this);
		this.handleStartOpenChangeDate = this.handleStartOpenChangeDate.bind(this);
		// end date
		this.onChangeEndDate = this.onChangeEndDate.bind(this);
		this.onStartChangeEndDate = this.onStartChangeEndDate.bind(this);
		this.handleStartOpenChangeEndDate = this.handleStartOpenChangeEndDate.bind(this);
		// organization name and logo
		this.onChangeOrgName = this.onChangeOrgName.bind(this);
		this.onChangeOrgLogo = this.onChangeOrgLogo.bind(this);
		this.onChangeOrgSlogan = this.onChangeOrgSlogan.bind(this);
		this.onChangeOrgDescription = this.onChangeOrgDescription.bind(this);
		this.onChangeOrgEventPhoto = this.onChangeOrgEventPhoto.bind(this);
		this.handleChangeInternalExternal = this.handleChangeInternalExternal.bind(this);
		this.setLocationImage = this.setLocationImage.bind(this)
		this.showOnMap = this.showOnMap.bind(this);


	}

	// showOnMapSet(){
	// 	localStorage.setItem('showOnMap',this.state.showOnMap)
	// }
	

	

	showOnMap(name){
		// localStorage.setItem('showOnMap', this.props.data.name)
		// var showOnMap = localStorage.getItem('showOnMap')
		this.setState({
			showOnMap: name
		})
		this.state.showOnMap = name
		
		console.log('aoo', this.state.showOnMap)
		localStorage.setItem('showOnMap',this.state.showOnMap)
	}

	// assignment 3
	// Date picker
	onChangeStartDate = (field, value) => {
		this.setState({
			[field]: value,
		});
	};

	onStartChangeDate = value => {
		this.onChangeStartDate('startDate', value);
	};

	handleStartOpenChangeDate = open => {
		if (!open) {
			this.setState({ endOpen: true });
		}
	};
	// end date
	onChangeEndDate = (field, value) => {
		this.setState({
			[field]: value,
		});
	};

	onStartChangeEndDate = value => {
		this.onChangeEndDate('endDate', value);
	};

	handleStartOpenChangeEndDate = open => {
		if (!open) {
			this.setState({ endOpen: true });
		}
	};
	// Time picker
	onChangeStartTime = time => {
		console.log('console log time', time);
		this.setState({ startTime: time });
	};
	onChangeEndTime = time => {
		console.log('console log time', time);
		this.setState({ endTime: time });
	};

	//edit location
	handleEdit(name, e, description, _id, time, lat, lng, startDate, endDate, organiserName, organiserLogo, organiserSlogan, organiserDescription, organiserEventPhoto, locationInternalOrExternal) {
		// console.log('name', name, 'time', startDatee, 'id', _id, 'description',  description,  'lat', lat, 'lng', lng )
		console.log('load edit', lat, lng)
		// e.preventDefault();
		var epochStartDate = parseInt(startDate)
		var epochEndDate = parseInt(endDate)
		console.log('epochstartdate', epochStartDate)
		this.setState({
			id: _id,
			name: name,
			time: time,
			startDate: moment.utc(epochStartDate).local(),
			endDate: moment.utc(epochEndDate).local(),
			organiserName: organiserName,
			organiserLogo: organiserLogo,
			organiserSlogan: organiserSlogan,
			organiserDescription: organiserDescription,
			organiserEventPhoto: organiserEventPhoto,
			locationInternalOrExternal: locationInternalOrExternal,
			description: description,
			lat: lat,
			lng: lng,
			cost: 0.0,
			kilos: 0.0,
			//assignment 3 requirement
			attended: 0.0,

			trashNumber: 0.0,
			organic: 0.0,
			recycable: 0.0,
			nonRecycable: 0.0,
			afterEventPhoto: '',

		})
		this.props.history.push('/CreateLocationPage')



	}

	handleDeleteLocation(_id) {
		// console.log('delete this', _id)
		
		// e.preventDefault()
		if (window.confirm('Are you sure?')) {
			fetch(urlLocation + '/' + _id, {
				method: 'delete'
			})
				.then(res => window.location.reload())
				this.state.hasCreatedLocation = false
				this.editCreatedStatus()
		}
	}



	editLocation(lat, lng) {
		console.log('submit edit')
		const { id, name, address, description, startDate, endDate,
			organiserName, organiserLogo, organiserSlogan, organiserDescription, organiserEventPhoto, locationInternalOrExternal
		} = this.state
		// console.log(this.state.id, name, address, description, lat, lng, time)
		// console.log('outputting lat', lat, 'lng', lng)
		this.state.startDatee = new Date(startDate)
		// var startTimee = new Date(startTime)
		this.state.endDatee = new Date(endDate)

		fetch(urlLocation, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'

			},
			method: 'put',
			body: JSON.stringify({
				// add more values
				locationId: id,
				name: name,
				address: address,
				time: this.state.startDatee + "\n to \n" + this.state.endDatee,
				startDate: startDate + '',
				endDate: endDate + '',

				organiserName: organiserName,
				organiserLogo: organiserLogo,
				organiserSlogan: organiserSlogan,
				organiserDescription: organiserDescription,
				organiserEventPhoto: organiserEventPhoto,
				locationInternalOrExternal: locationInternalOrExternal,

				description: description,
				lng: lng,
				lat: lat,
				locationOwner: localStorage.getItem("email")
			}
			)
		})
			.then(resp => resp.json(this.props.history.push('/')))

	}

	testDropping() {
		console.log('test dropping')
	}

	//New createlocation function for assignment 3

	onChangeOrgName(e) {
		this.setState({
			organiserName: e.target.value
		});
	}
	onChangeOrgLogo(e) {
		this.setState({
			organiserLogo: e.target.value
		});
	}
	onChangeOrgSlogan(e) {
		this.setState({
			organiserSlogan: e.target.value
		});
	}
	onChangeOrgDescription(e) {
		this.setState({
			organiserDescription: e.target.value
		});
	}
	onChangeOrgEventPhoto(e) {
		this.setState({
			organiserEventPhoto: e.target.value
		});
	}
	handleChangeInternalExternal(e) {
		this.setState({ locationInternalOrExternal: e.target.value });
	}


	//createlocation function
	onChangeName(e) {
		this.setState({
			name: e.target.value
		});
	}

	onChangeDescription(e) {
		this.setState({
			description: e.target.value
		})
	}
	// form validation
	checkRegistrationForm() {
		var valid = true;

		this.state.error_name = "";
		this.state.error_time = "";
		this.state.error_description = "";
		this.state.error_organiserName = "";
		// this.state.error_organiserLogo = "";
		this.state.error_organiserSlogan = "";
		this.state.error_organiserDescription = "";
		// this.state.error_organiserEventPhoto = "";
		this.state.error_locationInternalOrExternal = "";
		// if (this.state.time == undefined || this.state.time.length < 4) {
		// 	this.state.error_time = "Please enter a valid date ";
		// 	valid = false;
		// }
		if (this.state.name === undefined || this.state.name.length < 10) {
			this.state.error_name = "Your location name is invalid, please include more than 10 characters ";
			valid = false;
		}
		if (this.state.description === undefined || this.state.description.length < 20) {
			this.state.error_description = "The description must contain more than 20 letters ";
			valid = false;
		}
		if (this.state.startDate === null || this.state.endDate === null || this.state.startDate.length < 1 || this.state.endDate.length < 1 || this.state.endDate <= this.state.startDate) {
			this.state.error_time = "The start to end date is invalid.";
			valid = false;
		}
		// organiserName
		if (this.state.organiserName === undefined || this.state.organiserName.length < 2) {
			this.state.error_organiserName = "Organiser name must contain more than 2 letters";
			valid = false;
		}
		// if (this.state.organiserLogo === undefined || this.state.organiserLogo.length < 10) {
		// 	this.state.error_organiserLogo = "Organiser Logo is invalid.";
		// 	valid = false;
		// }
		if (this.state.organiserSlogan === undefined || this.state.organiserSlogan.length < 5) {
			this.state.error_organiserSlogan = "Organiser slogan must can contain more than 5 letters.";
			valid = false;
		}
		if (this.state.organiserDescription === undefined || this.state.organiserDescription.length < 10) {
			this.state.error_organiserDescription = "Organiser Description must can contain more than 10 letters.";
			valid = false;
		}
		// if (this.state.organiserEventPhoto === undefined || this.state.organiserEventPhoto.length < 10) {
		// 	this.state.error_organiserEventPhoto = "Organiser Event Photo is invalid.";
		// 	valid = false;
		// }
		if (this.state.locationInternalOrExternal === "" || this.state.locationInternalOrExternal.length < 0) {
			this.state.error_locationInternalOrExternal = "Please select the criteria for clean up internal or external.";
			valid = false;
		}




		// document.getElementById("error-time").innerHTML = this.state.error_time;
		document.getElementById("error-name").innerHTML = this.state.error_name;
		document.getElementById("error-description").innerHTML = this.state.error_description;
		document.getElementById("error-time").innerHTML = this.state.error_time;
		document.getElementById("error-organiserName").innerHTML = this.state.error_organiserName;
		// document.getElementById("error-organiserLogo").innerHTML = this.state.error_organiserLogo;
		document.getElementById("error-organiserSlogan").innerHTML = this.state.error_organiserSlogan;
		document.getElementById("error-organiserDescription").innerHTML = this.state.error_organiserDescription;
		// document.getElementById("error-organiserEventPhoto").innerHTML = this.state.error_organiserEventPhoto;
		document.getElementById("error-locationInternalOrExternal").innerHTML = this.state.error_locationInternalOrExternal;
		return valid;
	}

	onSubmit(lat, lng, e) {
		if (this.state.id == '') {
			console.log('register')
			// console.log('passed values', 'lat', lat, 'lng', lng)
			e.preventDefault();
			if (!this.checkRegistrationForm()) {
				return;
			} else if(this.state.hasCreatedLocation === true){
				alert('Error! You have already created a location!')
			}
			else {
				this.registerLocation(lat, lng);
				// 		console.log(`The values are ${this.state.name}, ${this.state.time},  
				// ${this.state.description}, ${this.state.address}, and  lat ${lat}, lng ${lng}`)
				// lat ${this.state.markerPosition.lat}, lng ${this.state.markerPosition.lng}
				this.setState({
					name: '',
					time: '',
					description: '',
					lat: '',
					lng: '',
					startDate: null,
					endDate: null,
					organiserName: '',
					organiserLogo: ''
				})
			}
		}
		else {
			console.log('poop')
			this.editLocation(lat, lng)
		}
	}
	setLocationImage(type, imageUrl){
		console.log(imageUrl)
		if(type ==='orgLogo'){
			this.setState({
				organiserLogo: imageUrl
			})
		}else{
			this.setState({
				organiserEventPhoto: imageUrl
			})
		}
		
	}

	registerLocation(lat, lng) {
		const { name, address, time, description, startDate, endDate } = this.state
		// console.log('lat', lat, 'lng', lng)

		this.state.startDatee = new Date(startDate)
		// var startTimee = new Date(startTime)
		this.state.endDatee = new Date(endDate)
		localStorage.setItem('epochStartDate', this.state.startDate)
		localStorage.setItem('epochEndDate', this.state.endDate)
		this.state.epochStartDate = localStorage.getItem('epochStartDate')
		this.state.epochEndDate = localStorage.getItem('epochEndDate')
		
		fetch(urlLocation, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'

			},
			method: 'POST',
			body: JSON.stringify({
				// add more values
				"name": this.state.name,
				"organiserName": this.state.organiserName,
				"organiserLogo": this.state.organiserLogo,
				"organiserSlogan": this.state.organiserSlogan,
				"organiserDescription": this.state.organiserDescription,
				"organiserEventPhoto": this.state.organiserEventPhoto,
				"locationInternalOrExternal": this.state.locationInternalOrExternal,

				"address": this.state.address,
				"time": this.state.startDatee + "\n to \n" + this.state.endDatee,
				"startDate": this.state.startDate + '',
				"endDate": this.state.endDate + '',
				"description": this.state.description,
				"lng": lng,
				"lat": lat,
				"locationOwner": localStorage.getItem("email"),
				"input": {
					attended: 0,
					cost: 0,
					kilos: 0,
					isSubmitted: false,
					//assignment 3 requirement
					trashNumber: 0.0,
					organic: 0.0,
					recycable: 0.0,
					nonRecycable: 0.0,
					afterEventPhoto: ''
				},
				"requestedTools": {
					default: {
						toolKit: 0,
						Tshirt: 0,
						fullSet: 0
					}
				},
				payStatus: false,
			}
			
			)
			
		})
			
			.then(resp => resp.json(this.props.history.push('/')))
			this.setState({
				hasCreatedLocation: true
			})
			this.state.hasCreatedLocation = true
			this.editCreatedStatus()
			
			

	}

	editCreatedStatus() {
		// console.log('edit create stat', this.state.hasCreatedLocation)
		const { hasCreatedLocation
		} = this.state
		fetch(editUser, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({
				userEmail: localStorage.getItem("email"),
				hasCreatedLocation: hasCreatedLocation
			}
			)
		})
			.then(resp => resp.json())

	}


 
	async componentDidMount() {
		// console.log()

		try {
			if (await Auth.currentSession()) {
				this.userHasAuthenticated(true)
				this.setState({
					adminEmail: localStorage.getItem('email')
				});


				this.fetchOwner();
			}
		} catch (e) {
			if (e !== 'No current user') {
				alert(e);
			}
		}

		this.setState({
			isAuthenticating: false
		});

		this.fetchOwner()

	}

	userHasAuthenticated = authenticated => {
		this.setState({ isAuthenticated: authenticated });
	};

	handleLogout = async event => {
		await Auth.signOut();
		localStorage.clear();
		this.userHasAuthenticated(false);
		this.props.history.push('/login');
	};

	// testing admin account
	windowOnload() {
		// console.log('load')
		if (!window.location.hash) {
			window.location = window.location + '#loaded';
			window.location.reload();
		}
	}

	fetchOwner() {
		// const {locationOwner} = this.state

		fetch(fetchUserByEmail_URL, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'

			},
			method: 'POST',
			body: JSON.stringify({
				'userEmail': this.state.adminEmail
			}
			)
		})
			.then(resp => resp.json())
			.then(data => {
				// console.log('user info', data)
				if (data) {
					const { fName, lName, age, gender, userType, hasCreatedLocation } = data
					// console.log(data.name)
					this.setState({
						fName: fName,
						lName: lName,
						age: age,
						gender: gender,
						userType: userType,
						hasCreatedLocation: hasCreatedLocation
						// phoneNumber: phoneNumber,

					})
				}




			})

	}




	render() {

		const childProps = {
			appdata: this.state,
			testDropping: this.testDropping,
			isAuthenticated: this.state.isAuthenticated,
			userHasAuthenticated: this.userHasAuthenticated,
			onChangeDescription: this.onChangeDescription,
			onChangeName: this.onChangeName,
			onSubmit: this.onSubmit,
			//edit location
			handleEdit: this.handleEdit,
			//delete location
			handleDeleteLocation: this.handleDeleteLocation,
			//assignemnt 3 
			//start time
			onChangeStartTime: this.onChangeStartTime,
			onChangeEndTime: this.onChangeEndTime,
			onChangeStartDate: this.onChangeStartDate,
			//start date
			onChangeStartDate: this.onChangeStartDate,
			onStartChangeDate: this.onStartChangeDate,
			handleStartOpenChangeDate: this.handleStartOpenChangeDate,
			//End date
			onChangeEndDate: this.onChangeEndDate,
			onStartChangeEndDate: this.onStartChangeEndDate,
			handleStartOpenChangeEndDate: this.handleStartOpenChangeEndDate,
			// organization name and logo
			onChangeOrgName: this.onChangeOrgName,
			onChangeOrgLogo: this.onChangeOrgLogo,
			onChangeOrgSlogan: this.onChangeOrgSlogan,
			onChangeOrgDescription: this.onChangeOrgDescription,
			onChangeOrgEventPhoto: this.onChangeOrgEventPhoto,
			handleChangeInternalExternal: this.handleChangeInternalExternal,

			showOnMap: this.showOnMap,
			setLocationImage: this.setLocationImage

		};
		var currentUser = localStorage.getItem('email')
		// console.log('currentUser', currentUser)
		if (this.state.userType === 'admin') {

			return (
				<div className="App container" style={{ width: 1600 }} >

					<Navbar fluid collapseOnSelect>
						<Navbar.Header>
							<Navbar.Brand>
								<Link to="/">
									Home
									{/* <img style={{ width: 110 }} src="http://build-projects.org/wp-content/uploads/2018/10/svx-logo.png" /> */}
								</Link>
							</Navbar.Brand>
							<Navbar.Toggle />
						</Navbar.Header>
						<Navbar.Collapse>
							<Nav pullRight>
								{this.state.isAuthenticated ? (
									<Fragment>
										
										<NavItem ><Link to="/ReportPage">Run Report</Link></NavItem>

										<NavItem ghost={this.state.hasCreatedLocation ? true : false} type={this.state.payStatus ? 'primary': 'default'}>
                           
                            {this.state.hasCreatedLocation ? 'Location Created': <Link to="/CreateLocationPage">Create Location</Link>}</NavItem>

										{/* <NavItem ><Link to="/CreateLocationPage">Create Location</Link></NavItem> */}
										<NavItem onClick={this.handleLogout}>Logout</NavItem>
									</Fragment>
								) : (
										<Fragment>

											{/* <LinkContainer to="/signup">
												<NavItem>Signup</NavItem>
											</LinkContainer> */}
											<LinkContainer to="/login">
												<NavItem>Login</NavItem>
											</LinkContainer>
											{/* <LinkContainer to="/loginWFacebook">
												<NavItem>Facebook Login</NavItem>
											</LinkContainer> */}
										</Fragment>

									)}
							</Nav>
						</Navbar.Collapse>
					</Navbar>

					<Routes childProps={childProps}
					/>
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />

					<Navbar fluid collapseOnSelect fixed="bottom">
						<Navbar.Header>
							<Navbar.Brand>
							</Navbar.Brand>
							<Navbar.Toggle />
						</Navbar.Header>
						<Navbar.Collapse>
							<Nav pullRight>
								{this.state.isAuthenticated ? (
									<Fragment>
										<NavItem ><Link to="/AboutUs">About Us</Link></NavItem>
										<NavItem ><Link to="/Emailjs">Contact Support</Link></NavItem>
										<NavItem ><Link to="/Resource">Resource</Link></NavItem>

									</Fragment>
								) : (
										<Fragment>
											<NavItem ><Link to="/AboutUs">About Us</Link></NavItem>
											<NavItem ><Link to="/Emailjs">Contact Support</Link></NavItem>
											<NavItem ><Link to="/Resource">Resource</Link></NavItem>

										</Fragment>
									)}
							</Nav>
						</Navbar.Collapse>
					</Navbar>
				</div>
			);
		}
		else {
			return (

				<div className="App container" style={{ width: 1600 }}>

					<Navbar fluid collapseOnSelect>
						<Navbar.Header>
							<Navbar.Brand style={{ marginBottom: 10 }}>
								<Link to="/"><img style={{ width: 110 }} src="http://build-projects.org/wp-content/uploads/2018/10/svx-logo.png"></img></Link>
							</Navbar.Brand>
							<Navbar.Toggle />
						</Navbar.Header>
						<Navbar.Collapse>
							<Nav pullRight>
								{this.state.isAuthenticated ? (
									<Fragment>
										<NavItem>Hello, {currentUser}</NavItem>
										<NavItem ghost={this.state.hasCreatedLocation ? true : false} type={this.state.payStatus ? 'primary': 'default'}>
                           
                            {this.state.hasCreatedLocation ? 'Location Created': <Link to="/CreateLocationPage">Create Location</Link>}</NavItem>
										{/* <NavItem ><Link to="/CreateLocationPage">Create Location</Link></NavItem> */}
										<NavItem onClick={this.handleLogout}>Logout</NavItem>
									</Fragment>
								) : (
										<Fragment>

											{/* <LinkContainer to="/signup">
												<NavItem>Signup</NavItem>
											</LinkContainer> */}
											<LinkContainer to="/login">
												<NavItem>Login</NavItem>
											</LinkContainer>
											{/* <LinkContainer to="/loginWFacebook">
												<NavItem>Facebook Login</NavItem>
											</LinkContainer> */}
										</Fragment>
									)}
							</Nav>
						</Navbar.Collapse>
					</Navbar>

					<Routes childProps={childProps}
					/>
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />

					<Navbar fluid collapseOnSelect fixed="bottom">
						<Navbar.Header>
							<Navbar.Brand>
							</Navbar.Brand>
							<Navbar.Toggle />
						</Navbar.Header>
						<Navbar.Collapse>
							<Nav pullRight>
								{this.state.isAuthenticated ? (
									<Fragment>
										<NavItem ><Link to="/AboutUs">About Us</Link></NavItem>
										<NavItem ><Link to="/Emailjs">Contact Support</Link></NavItem>
										<NavItem ><Link to="/Resource">Resource</Link></NavItem>
									</Fragment>
								) : (
										<Fragment>
											<NavItem ><Link to="/AboutUs">About Us</Link></NavItem>
											<NavItem ><Link to="/Emailjs">Contact Support</Link></NavItem>
											<NavItem ><Link to="/Resource">Resource</Link></NavItem>
										</Fragment>
									)}
							</Nav>
						</Navbar.Collapse>
					</Navbar>
				</div>
			)
		}
	}
}
// registerServiceWorker();
export default withRouter(App);
