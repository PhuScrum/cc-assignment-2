import React, { Component } from 'react';
import Facebook from "../components/FacebookLogin"

import './Login.css';

export default class LoginWFacebook extends Component {
	render() {
		return (
			<div className="Login">
				<form>
					<br/>
					<Facebook {...this.props}  />
				</form>
			</div>
		);
	}
}
