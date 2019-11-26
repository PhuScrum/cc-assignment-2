import React, { Component } from 'react';
import { HelpBlock, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import { Auth } from 'aws-amplify';


import './Signup.css';

const urlRegister = 'http://localhost:8080/register'

export default class Signup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			email: '',
			password: '',
			fname:'',
			lname:'',
			age:'',
			gender:'',
			phoneNumber:'',
			imageUrl:'',
			confirmPassword: '',
			confirmationCode: '',
			newUser: null
		};

		this.signUp = this.signUp.bind(this)
	}

	

	signUp(){
		const {email, fname, lname, age, gender, phoneNumber, imageUrl} = this.state
		console.log(email, fname, lname, age, gender, phoneNumber, imageUrl)
		localStorage.setItem("email", this.state.email);
		fetch(urlRegister, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
 
            },
            method: 'POST',
            body: JSON.stringify({
				// add more values
			   "email": this.state.email,
			   "fName": this.state.fname,
			   "lName": this.state.lname,
			   "age": this.state.age,
			   "gender": this.state.gender,
			   "phoneNumber": this.state.phoneNumber,
			   "imageUrl": this.state.imageUrl

            }
            )
        })
            .then(resp => resp.json())

	}

	validateForm() {
		return (
			this.state.email.length > 0 &&
			this.state.password.length > 0 &&
			this.state.password === this.state.confirmPassword
		);
	}

	validateConfirmationForm() {
		return this.state.confirmationCode.length > 0;
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	handleSubmit = async event => {
		event.preventDefault();
		this.signUp()

		this.setState({ isLoading: true });

		try {
			const newUser = await Auth.signUp({
				username: this.state.email,
				password: this.state.password
			});
			this.setState({
				newUser
			});
		} catch (e) {
			alert(e.message);
		}

		this.setState({ isLoading: false });
	};

	handleConfirmationSubmit = async event => {
		event.preventDefault();

		this.setState({ isLoading: true });

		try {
			await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
			await Auth.signIn(this.state.email, this.state.password);

			this.props.userHasAuthenticated(true);
			this.props.history.push('/');
		} catch (e) {
			alert(e.message);
			this.setState({ isLoading: false });
		}
	};

	renderConfirmationForm() {
		return (
			<form onSubmit={this.handleConfirmationSubmit}>
				<FormGroup controlId="confirmationCode" bsSize="large">
					<ControlLabel>Confirmation Code</ControlLabel>
					<FormControl autoFocus type="tel" value={this.state.confirmationCode} onChange={this.handleChange} />
					<HelpBlock>Please check your email for the code.</HelpBlock>
				</FormGroup>
				<LoaderButton
					block
					bsSize="large"
					disabled={!this.validateConfirmationForm()}
					type="submit"
					isLoading={this.state.isLoading}
					text="Verify"
					loadingText="Verifying…"
				/>
			</form>
		);
	}

	renderForm() {
		return (
			<form onSubmit={this.handleSubmit}>
				<FormGroup controlId="email" bsSize="large">
					<ControlLabel>Email</ControlLabel>
					<FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange} />
				</FormGroup>
				
				<FormGroup controlId="fname" bsSize="large">
						<ControlLabel>First Name</ControlLabel>
						<FormControl value={this.state.fname} onChange={this.handleChange} type="fname" />
					</FormGroup>
					<FormGroup controlId="lname" bsSize="large">
						<ControlLabel>Last Name</ControlLabel>
						<FormControl value={this.state.lname} onChange={this.handleChange} type="lname" />
					</FormGroup>
					<FormGroup controlId="age" bsSize="large">
						<ControlLabel>Age</ControlLabel>
						<FormControl value={this.state.age} onChange={this.handleChange} type="age" />
					</FormGroup>
					<FormGroup controlId="gender" bsSize="large">
						<ControlLabel>Gender</ControlLabel>
						<FormControl value={this.state.gender} onChange={this.handleChange} type="gender" />
					</FormGroup>
					<FormGroup controlId="phoneNumber" bsSize="large">
						<ControlLabel>Phone Number</ControlLabel>
						<FormControl value={this.state.phoneNumber} onChange={this.handleChange} type="phoneNumber" />
					</FormGroup>
					<FormGroup controlId="imageUrl" bsSize="large">
						<ControlLabel>Photo URL</ControlLabel>
						<FormControl value={this.state.imageUrl} onChange={this.handleChange} type="imageUrl" />
					</FormGroup>
			
					<FormGroup controlId="password" bsSize="large">
					<ControlLabel>Password</ControlLabel>
					<FormControl value={this.state.password} onChange={this.handleChange} type="password" />
				</FormGroup>
				<FormGroup controlId="confirmPassword" bsSize="large">
					<ControlLabel>Confirm Password</ControlLabel>
					<FormControl value={this.state.confirmPassword} onChange={this.handleChange} type="password" />
				</FormGroup>
				<LoaderButton 
				
					block
					bsSize="large"
					disabled={!this.validateForm()}
					type="submit"
					isLoading={this.state.isLoading}
					text="Signup"
					loadingText="Signing up…"
				/>
			</form>
		);
	}

	render() {
		return (
			<div className="Signup">{this.state.newUser === null ? this.renderForm() : this.renderConfirmationForm()}</div>
		);
	}
}
