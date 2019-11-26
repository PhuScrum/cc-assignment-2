import { LinkContainer } from 'react-router-bootstrap';
import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Nav, Navbar, NavItem } from 'react-bootstrap';
import Routes from './Routes';
import { Auth } from 'aws-amplify';
import 'antd/dist/antd.css';
import './index.css';
import {Button} from 'antd'
import './App.css';
import { id } from 'date-fns/locale';

const urlLocation = 'http://localhost:8080/location'

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: 'chai fu22',
			time:'',
			address:'',
			description:'',
			lat: 0.0,
			lng: 0.0,
			isAuthenticated: false,
			isAuthenticating: true,
			
		};

		this.testDropping = this.testDropping.bind(this)
		// createlocation
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeTime = this.onChangeTime.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		// this.registerLocation = this.registerLocation.bind(this);
		//edit location
		this.handleEdit = this.handleEdit.bind(this);
		
	}
	//edit location

	handleEdit( name, e, description, _id, time, lat, lng){
		console.log('name', name, 'time', time, 'id', _id, 'description',  description,  'lat', lat, 'lng', lng )
		// e.preventDefault();
		this.setState({
			name: name,
			time: time,
			description: description,
			lat: lat,
			lng: lng
		})
		this.props.history.push('/home2')
		// this.editLocation();

		
	}

	editLocation(){
		const {name, address, time, description} = this.state
		// console.log('lat',lat, 'lng',lng)
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
			//    "lng": lng,
			//    "lat": lat,
			   "locationOwner": localStorage.getItem("email")
            }
            )
        })
            .then(resp => resp.json(this.props.history.push('/')))

	}

	testDropping(){
		console.log('test dropping')
	}

	//createlocation function
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

	onSubmit(lat, lng, e) {
		console.log('passed values', 'lat', lat, 'lng', lng)
		e.preventDefault();
		this.registerLocation(lat, lng);
		console.log(`The values are ${this.state.name}, ${this.state.time},  
		${this.state.description}, ${this.state.address}, and  lat ${lat}, lng ${lng}`)
		// lat ${this.state.markerPosition.lat}, lng ${this.state.markerPosition.lng}
		this.setState({
			name: '',
			time: '',
			description:'',
			lat: '',
			lng:''
		})
	}
	registerLocation(lat, lng){
		const {name, address, time, description} = this.state
		console.log('lat',lat, 'lng',lng)
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
			   "lng": lng,
			   "lat": lat,
			   "locationOwner": localStorage.getItem("email")
            }
            )
        })
            .then(resp => resp.json(this.props.history.push('/')))

	}

	async componentDidMount() {
		try {
			if (await Auth.currentSession()) {
				this.userHasAuthenticated(true);
			}
		} catch (e) {
			if (e !== 'No current user') {
				alert(e);
			}
		}

		this.setState({ isAuthenticating: false });
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

	

	render() {
		const childProps = {
			appdata: this.state,
			testDropping: this.testDropping,
			isAuthenticated: this.state.isAuthenticated,
			userHasAuthenticated: this.userHasAuthenticated,
			onChangeDescription: this.onChangeDescription,
			onChangeName: this.onChangeName,
			onChangeTime: this.onChangeTime,
			onSubmit: this.onSubmit,
			//edit location
			handleEdit: this.handleEdit,
		};
		return (
			<div className="App container">
				<Navbar fluid collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to="/">CleanUp Home</Link>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav pullRight>
							{this.state.isAuthenticated ? (
								<Fragment>
								<NavItem ><Link to="/createVolunteer">Add Volunteers</Link></NavItem>
								<NavItem ><Link to="/home2">Create Location</Link></NavItem>
								<NavItem onClick={this.handleLogout}>Logout</NavItem>
								</Fragment>
							) : (
								<Fragment>
									{/* <LinkContainer to="/home2">
										<NavItem>create location</NavItem>
									</LinkContainer> */}
									<LinkContainer to="/signup">
										<NavItem>Signup</NavItem>
									</LinkContainer>
									<LinkContainer to="/login">
										<NavItem>Login</NavItem>
									</LinkContainer>
									<LinkContainer to="/loginWFacebook">
										<NavItem>Facebook Login</NavItem>
									</LinkContainer>
								</Fragment>
							)}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<Routes childProps={childProps} 

				/>
			</div>
		);
	}
}

export default withRouter(App);
