import React from 'react';
import emailjs from 'emailjs-com';
import { Modal, Button } from 'antd';

export default class ContactAllMembers extends React.Component {
  constructor(props) {
	super(props);
    this.state = { feedback:'',
    
     name: localStorage.getItem('email'),
    email: localStorage.getItem('email'),
    publishMembers: localStorage.getItem('PublishMembers'),
    publishMembersNoAccount: localStorage.getItem('PublishMembersNoAccount'),
    allMembers: localStorage.getItem('PublishMembers') + ','+ localStorage.getItem('PublishMembersNoAccount')

 };

	this.handleChange = this.handleChange.bind(this);
	this.handleChangeTitle = this.handleChangeTitle.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
  }
  
// validate
checkRegistrationForm() { 
    var valid = true;
    var error_feedback = "";

    if (this.state.feedback == undefined || this.state.feedback.length < 20) {
      error_feedback = "Message needs at least 20 characters  ";
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
    
    return valid;
  }

  sendFeedback (templateId, variables, user_id) {
	// emailjs.send('gmail', templateId, variables, user_id
	var templateParams = {
		// name: 'James',
		requester_email: this.state.email,
        feedback: "This is a notice to all members from Owner " + this.state.email +": "+ this.state.feedback,
        locationOwner: this.state.allMembers,
        
		// notes: 'Check this out!'
	};
	emailjs.send('vnclean_green','contactsiteowner', templateParams, 'user_fUIi3DXmEKTq1SDEYsLg3'
  	).then(res => {
    	console.log('Email successfully sent!')
  	})
  	// Handle errors here however you like, or use a React error boundary
  	.catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
  }
  showModal = () => {
    var isLoggedIn = localStorage.getItem('email')
    if(isLoggedIn === null){
      alert("You need to login to use this function!\nPlease click on the login button to continue." )
    }
    else{
        console.log(this.props.data.email)
    this.setState({
      visible: true,
    });
  }
  };

  handleOk = e => {
    if (!this.checkRegistrationForm()) {
        return;
      } else {
    console.log(e);
   
    this.setState({
      visible: false,
    });
    this.handleSubmit()
    setTimeout(function(){ alert('Your message has been sent') }, 500)
}
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    console.log('all members', this.state.allMembers)
    
	return (
        <div>
        <Button onClick={this.showModal}>
         Publish Notice to All Members
                </Button>
        <Modal
          title={<h1>Publishing notice to all members</h1>}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          	<form className="test-mailing" >
		
    	<div>
		<h3>Enter a notice you wish to publish</h3>
      	<textarea
        	id="test-mailing"
        	name="test-mailing"
        	onChange={this.handleChange}
        	placeholder="Message..."
        	required
        	value={this.state.feedback}
        	style={{width: '100%', height: '200px', fontSize: 16}}
      	/>
    	</div>
        <div style={{ color:'red'}} className="error" id="error-feedback" />
    	{/* <input type="button" value="Submit" className="btn btn--submit" onClick={this.handleSubmit} /> */}
		
  	</form>
        </Modal>
  
	  </div>
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
	// this.routeChange()
  }
}
 