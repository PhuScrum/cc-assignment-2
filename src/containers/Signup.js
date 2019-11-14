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
			confirmPassword: '',
			confirmationCode: '',
			newUser: null
		};

		this.signUp = this.signUp.bind(this)
	}

	signUp(){
		const {email, fname, lname} = this.state
		console.log(email, fname, lname)
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
			   "lName": this.state.lname
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
