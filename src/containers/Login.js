import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import { Auth } from 'aws-amplify';

import { Link} from 'react-router-dom';
// import LoginWFacebook from './LoginWFacebook'
import './Login.css';

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			email: '',
			password: ''
		};
	}
	windowOnload() {
		console.log('load')
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
	}
	validateForm() {
		return this.state.email.length > 0 && this.state.password.length > 0;
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	handleSubmit = async event => {
		event.preventDefault();
		localStorage.setItem("email", this.state.email);
		this.setState({ isLoading: true });

		try {
			await Auth.signIn(this.state.email, this.state.password);
			this.props.userHasAuthenticated(true);
			this.props.history.push('/');
			this.windowOnload()
		} catch (e) {
			alert(e.message);
			this.setState({ isLoading: false });
		}
	};

	render() {
		return (
			<div className="Login">
				<form onSubmit={this.handleSubmit}>
					<FormGroup controlId="email" bsSize="large">
						<ControlLabel>Email</ControlLabel>
						<FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange} />
					</FormGroup>
					<FormGroup controlId="password" bsSize="large">
						<ControlLabel>Password</ControlLabel>
						<FormControl value={this.state.password} onChange={this.handleChange} type="password" />
					</FormGroup>
					 
					<LoaderButton
						block
						bsSize="large"
						disabled={!this.validateForm()}
						type="submit"
						isLoading={this.state.isLoading}
						text="Login"
						loadingText="Logging in…"
					/>
					<br/>
					<p>Dont have an account? Click <Link to="/Signup">here</Link> to Sign Up now</p>
					<br/>
					<p>or log in with <Link to="/loginWFacebook"> Facebook</Link></p>

					{/* <LoginWFacebook {...this.props} /> */}

					
					<br/>
				</form>
			</div>
		);
	}
}
