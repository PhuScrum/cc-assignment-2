import React from 'react';
import emailjs from 'emailjs-com'; 

export default class Emailjs extends React.Component {
  constructor(props) {
	super(props);
	this.state = { feedback: '', feedbackTitle:'', name: localStorage.getItem('email'), email: localStorage.getItem('email') };
	this.handleChange = this.handleChange.bind(this);
	this.handleChangeTitle = this.handleChangeTitle.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	
  }

  checkRegistrationForm() {
    var valid = true;
	var error_feedback = "";
	var error_feedbackTitle = "";

    if (this.state.feedback == undefined || this.state.feedback.length < 10) {
      error_feedback = "Feedback needs at least 20 characters  ";
      valid = false;
	}
	
	
    if (this.state.feedbackTitle == undefined || this.state.feedbackTitle.length < 10) {
		error_feedbackTitle = "Feedback title needs at least 10 characters  ";
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

	document.getElementById("error-feedback").innerHTML = error_feedback;
	document.getElementById("error-feedbackTitle").innerHTML = error_feedbackTitle;
    
    return valid;
  }
  

  sendFeedback (templateId, variables, user_id) {
	// emailjs.send('gmail', templateId, variables, user_id
	var templateParams = {
		// name: 'James',
		requester_email: this.state.email,
		feedbackTitle: this.state.feedbackTitle,
		feedback: this.state.feedback
		// notes: 'Check this out!'
	};
	emailjs.send('vnclean_green','template_x593QfMH', templateParams, 'user_fUIi3DXmEKTq1SDEYsLg3'
  	).then(res => {
    	console.log('Email successfully sent!')
  	})
  	// Handle errors here however you like, or use a React error boundary
  	.catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
  }


  render() {
	return (
  	<form className="test-mailing" style={{ justifyContent:'center', alignItems:'center', marginRight:'300px', marginLeft:'300px' }}>
		  <br/>
		  <br/>
		  <br/>
    	<h1>Contact Support</h1>
		<br/>
		<h3>Title of request</h3>
		<textarea
        	id="test-mailing"
        	name="test-mailing"
        	onChange={this.handleChangeTitle}
        	placeholder="Title of request"
        	required
        	value={this.state.feedbackTitle}
        	style={{width: '100%', height: '50px', fontSize: 18}}
      	/>
    	<div>
		<div style={{ color:'red'}} className="error" id="error-feedbackTitle" />
			<br/>
		<h3>Please Describe Your Issue</h3>
      	<textarea
        	id="test-mailing"
        	name="test-mailing"
        	onChange={this.handleChange}
        	placeholder="Request Description"
        	required
        	value={this.state.feedback}
        	style={{width: '100%', height: '150px', fontSize: 16}}
      	/>
    	</div>
		<div style={{ color:'red'}} className="error" id="error-feedback" />
    	<input type="button" value="Submit" className="btn btn--submit" onClick={this.handleSubmit} />
		<br/>
		  <br/>
		  <br/>
		  <br/>
		  <br/>
  	</form>
	  
	)
  }
  routeChange() {
    let path = `/EmailjsRedirect`;
    this.props.history.push(path);
  }
  handleChange(event) {
    this.setState({feedback: event.target.value})
  }
  handleChangeTitle(e) {
    this.setState({feedbackTitle: e.target.value})
  }

  handleSubmit (event, e) {
	if (!this.checkRegistrationForm()) {
        return;
      } else {
	const templateId = 'vnclean_green';
	const user_id = 'user_fUIi3DXmEKTq1SDEYsLg3';

	this.sendFeedback(templateId, {message_html: this.state.feedback, from_name: this.state.name, reply_to: this.state.email})
	this.routeChange()
  }
}
}
 