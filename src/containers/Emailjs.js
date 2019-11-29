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
	const templateId = 'vnclean_green';
	const user_id = 'user_fUIi3DXmEKTq1SDEYsLg3';

	this.sendFeedback(templateId, {message_html: this.state.feedback, from_name: this.state.name, reply_to: this.state.email})
	this.routeChange()
  }
}
 