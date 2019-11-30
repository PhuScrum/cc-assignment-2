import { LinkContainer } from 'react-router-bootstrap';
import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Nav, Navbar, NavItem } from 'react-bootstrap';
import Routes from './Routes';
import { Auth } from 'aws-amplify';
import 'antd/dist/antd.css';
import './index.css';
import {Button, Modal} from 'antd'
import './App.css';
import { id } from 'date-fns/locale';
import ReportPage from './containers/RunReport'
// const fetchUserByEmail_URL =  'http://localhost:8080/fetchUserByEmail'
const urlLocation = 'http://localhost:8080/location'

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			time:'',
			address:'',
			description:'',
			lat: 10.8231,
			lng: 106.6297,
			isAuthenticated: false,
			isAuthenticating: true,
			id: '',
			zoom:15,
			siteOwner:''
			
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
		//delete location
		this.handleDeleteLocation = this.handleDeleteLocation.bind(this);
		
	}
	//edit location

	handleEdit( name, e, description, _id, time, lat, lng){
		// console.log('name', name, 'time', time, 'id', _id, 'description',  description,  'lat', lat, 'lng', lng )
		console.log('handleEdit', lat, lng)
		// e.preventDefault();
		this.setState({
			id: _id,
			name: name,
			time: time,
			description: description,
			lat: lat,
			lng: lng,
			cost: 0.0,
			kilos:0.0,
			attended:0.0
		})
		this.props.history.push('/CreateLocationForm')
		

		
	}

	handleDeleteLocation(_id) {
		console.log('delete this', _id)
        // e.preventDefault()
		if (window.confirm('Are you sure?')) {
            fetch(urlLocation + '/' + _id, { 
           method: 'delete'
            })
                .then(res => window.location.reload(), console.log('delete phase2'))
        }
    }


	editLocation(lat, lng){
		console.log('editLocation function')
		const {id, name, address, description, time} = this.state
		console.log(this.state.id, name, address, description, lat, lng, time)
		console.log('outputting lat',lat, 'lng',lng)
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
			   time: time,
			   description: description,
			   lng: lng,
			   lat: lat,
			   locationOwner: localStorage.getItem("email")
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
		if(this.state.id == '') {
		console.log('register')
		// console.log('passed values', 'lat', lat, 'lng', lng)
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
	}else{
		console.log('poop')
		this.editLocation(lat, lng)
	}
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
			   "locationOwner": localStorage.getItem("email"),
			   "input": {
				   attended:0,
				   cost: 0,
				   kilos:0
			   }
            }
            )
        })
            .then(resp => resp.json(this.props.history.push('/')))

	}

	async componentDidMount() {
		console.log()
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
			//delete location
			handleDeleteLocation: this.handleDeleteLocation,
		};
		var ownerLogin = localStorage.getItem('email')
        if(ownerLogin === 'vncleangreen@gmail.com'){
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
								<NavItem ><Link to="/ReportPage">Run Report</Link></NavItem>
								<NavItem ><Link to="/CreateLocationPage">Create Location</Link></NavItem>
								<NavItem onClick={this.handleLogout}>Logout</NavItem>
								</Fragment>
							) : (
								<Fragment>
									
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
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
			
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
								<NavItem ><Link to="/Emailjs">Contact Support</Link></NavItem>
								</Fragment>
							) : (
								<Fragment>
									
									
								</Fragment>
							)}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
							}
							else{
								return(<div className="App container">
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
												
												<NavItem ><Link to="/CreateLocationPage">Create Location</Link></NavItem>
												<NavItem onClick={this.handleLogout}>Logout</NavItem>
												</Fragment>
											) : (
												<Fragment>
													
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
								<br/>
								<br/>
								<br/>
								<br/>
								<br/>
								<br/>
								<br/>
								<br/>
								<br/>
								<br/>
								<br/>
							
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
												<NavItem ><Link to="/Emailjs">Contact Support</Link></NavItem>
												</Fragment>
											) : (
												<Fragment>
													
													
												</Fragment>
											)}
										</Nav>
									</Navbar.Collapse>
								</Navbar>
							</div>)
							}
	}
}

export default withRouter(App);
