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
	// validate
	checkRegistrationForm() {
		var valid = true;
		var error_fname = "";
		var error_lname = "";
		var error_age = "";
		var error_gender = "";
		var error_phoneNumber = "";
	
		if (this.state.fname == undefined || this.state.fname.length < 1) {
		  error_fname = "fname with at least 1 characters  ";
		  valid = false;
		}
	
		if (this.state.lname == undefined || this.state.lname.length < 4) {
		  error_lname = "lname must have at least 5 characters" ;
		  valid = false;
		}

		if (this.state.age == undefined || this.state.age == "String" || this.state.age.length < 1 ) {
			error_age = "Your age is invalid ";
			valid = false;
		}

		if (this.state.gender == undefined || this.state.gender.length < 1) {
			error_gender = "Please select a gender ";
			valid = false;
		}

		if (this.state.phoneNumber == undefined || this.state.phoneNumber.length < 9) {
			error_phoneNumber = "Invalid. A phone number must have more than 9 numbers ";
			valid = false;
		}
		  
	
		// if (this.state.pwd == undefined || this.state.pwd.length < 5) {
		//   error_pwd = "Password must have at least 5 characters";
		//   valid = false;
		// }
	
		// if (this.state.verify_pwd != this.state.pwd && this.state.pwd != "") {
		//   error_verify = "Retyped password does not match orginal password";
		//   this.setState({ pwd: "", verify_pwd: "" });
		//   valid = false;
		// }
	
		document.getElementById("error-fname").innerHTML = error_fname;
		document.getElementById("error-lname").innerHTML = error_lname;
		document.getElementById("error-age").innerHTML = error_age;
		document.getElementById("error-gender").innerHTML = error_gender;
		document.getElementById("error-phoneNumber").innerHTML = error_phoneNumber;
		return valid;
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
		if (!this.checkRegistrationForm()) {
			return;
		  } else {
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
	}
	};

	onChangeAge = (e) => {
		const val = e.target.value;
		// If the current value passes the validity test then apply that to state
		if (e.target.validity.valid) this.setState({age: e.target.value});
		// If the current val is just the negation sign, or it's been provided an empty string,
		// then apply that value to state - we still have to validate this input before processing
		// it to some other component or data structure, but it frees up our input the way a user
		// would expect to interact with this component
		else if (val === '' || val === '-') this.setState({age: val});
	  }

	  onChangePhoneNumber = (e) => {
		const val = e.target.value;
		// If the current value passes the validity test then apply that to state
		if (e.target.validity.valid) this.setState({phoneNumber: e.target.value});
		// If the current val is just the negation sign, or it's been provided an empty string,
		// then apply that value to state - we still have to validate this input before processing
		// it to some other component or data structure, but it frees up our input the way a user
		// would expect to interact with this component
		else if (val === '' || val === '-') this.setState({phoneNumber: val});
	  }


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
						<div style={{ color:'red'}} className="error" id="error-fname" />
					</FormGroup>
					
					<FormGroup controlId="lname" bsSize="large">
						<ControlLabel>Last Name</ControlLabel>
						<FormControl value={this.state.lname} onChange={this.handleChange} type="lname" />
						<div style={{ color:'red'}} className="error" id="error-lname" />
					</FormGroup>
					
					<FormGroup controlId="age" bsSize="large" >
						<ControlLabel>Age</ControlLabel>
						<FormControl type='tel' pattern="^-?[0-9]\d*\.?\d*$" value={this.state.age}  onChange={this.onChangeAge} type="age" />
						<div style={{ color:'red'}} className="error" id="error-age" />
					</FormGroup>
					
					<FormGroup controlId="gender" bsSize="large">
						<ControlLabel>Gender</ControlLabel>
						<br/>
						{/* <FormControl value={this.state.gender} onChange={this.handleChange} type="gender" />
						<div style={{ color:'red'}} className="error" id="error-gender" /> */}
					<select gender={this.state.gender} onChange={this.handleChange}>
						<option gender="grapefruit">Male</option>
						<option gender="lime">Female</option>
						<option gender="coconut">Other</option>
						<option gender="mango">Prefer not to say</option>
					</select>
					</FormGroup>
					
					<FormGroup controlId="phoneNumber" bsSize="large">
						<ControlLabel>Phone Number</ControlLabel>
						<FormControl type='tel' pattern="^-?[0-9]\d*\.?\d*$" value={this.state.phoneNumber} onChange={this.onChangePhoneNumber} type="phoneNumber" />
						<div style={{ color:'red'}} className="error" id="error-phoneNumber" />
					</FormGroup>
					
					<FormGroup controlId="imageUrl" bsSize="large">
						<ControlLabel>Photo URL</ControlLabel>
						<FormControl value={this.state.imageUrl} onChange={this.handleChange} placeholder={'Optional'} type="imageUrl" />
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
