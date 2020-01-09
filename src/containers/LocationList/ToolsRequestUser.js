import React from 'react';
import emailjs from 'emailjs-com';
import { Modal, Button} from 'antd';
import {FormControl, Row, Col} from 'react-bootstrap'
// const editUser = 'http://localhost:8080/editUser'

const requestEquipmentUrl = 'https://vietnamsachvaxanh.com/requestEquipment'

export default class ToolsRequestUser extends React.Component {
  constructor(props) {
	super(props);
    this.state = {  
        toolKit:'',
        Tshirt:'',
        fullSet:'',


     name: localStorage.getItem('email'),
    email: localStorage.getItem('email')

     };
	this.handleChangeToolKit = this.handleChangeToolKit.bind(this);
    this.handleChangeTshirt = this.handleChangeTshirt.bind(this);
    this.handleChangeFullSet = this.handleChangeFullSet.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
  }
  
// validate
checkRegistrationForm() { 
    var valid = true;
    var error_toolKit = "";
    var error_Tshirt = "";
    var error_fullSet = "";

    if (this.state.toolKit == undefined || this.state.toolKit.length < 1) {
      error_toolKit = "Tool Kit needs at least 1 integer  ";
      valid = false;
    }
    if (this.state.Tshirt == undefined || this.state.Tshirt.length < 1) {
        error_Tshirt = "Tshirt needs at least 1 integer  ";
        valid = false;
      }
    if (this.state.fullSet == undefined || this.state.fullSet.length < 1) {
        error_fullSet = "Tool Kit needs at least 1 integer  ";
        valid = false;
      }


    document.getElementById("error-toolKit").innerHTML = error_toolKit;
    document.getElementById("error-Tshirt").innerHTML = error_Tshirt;
    document.getElementById("error-fullSet").innerHTML = error_fullSet;
    
    return valid;
  }


  showModal = () => {
    var isLoggedIn = localStorage.getItem('email')
    if(isLoggedIn === null){
      alert("You need to login to use this function!\nPlease click on the login button to continue." )
    }
    else{
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
    setTimeout(function(){ alert('Your Request has been added.') }, 500)
}
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    
	return (
        <div>
        <Button onClick={this.showModal} >
          Request for your Tools
                </Button>
        <Modal
          title={<h1>Request for your Tools</h1>}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          	<form className="test-mailing" >
		
    	<div>
		<h3>Tool Kit (Tong, Gloves, Bags): </h3>
          <FormControl type='tel' pattern="^-?[0-9]\d*\.?\d*$" value={this.state.toolKit}  onChange={this.handleChangeToolKit}/>
    	</div>
        <div style={{ color:'red'}} className="error" id="error-toolKit" />

        <br/>
          
		<div>
        
          <h3>Number of Earth Day T-Shirt: </h3>
      	<FormControl type='tel' pattern="^-?[0-9]\d*\.?\d*$" value={this.state.Tshirt}  onChange={this.handleChangeTshirt}/>
        </div>
        <div style={{ color:'red'}} className="error" id="error-Tshirt" />
        {/* <div style={{ color:'red'}} className="error" id="error-feedback" /> */}
        <br/>
          
          <div>
        
          <h3>Number of Full Set (T-Shirt + Tool Kit): </h3> 
      	<FormControl type='tel' pattern="^-?[0-9]\d*\.?\d*$" value={this.state.fullSet}  onChange={this.handleChangeFullSet}/>
        </div>
        <div style={{ color:'red'}} className="error" id="error-fullSet" />
<br/>
<p><i>The site owner will collect the fees on the clean up day. They have the right to refuse to not give out tools if payments have not been made.*</i></p>
  	</form>
        </Modal>
  
	  </div>
	)
  }
  routeChange() {
    let path = `/EmailjsRedirect`;
    this.props.history.push(path);
  }
  handleChangeToolKit(e) {
    const val = e.target.value;
		// If the current value passes the validity test then apply that to state
		if (e.target.validity.valid) this.setState({toolKit: e.target.value});
		// If the current val is just the negation sign, or it's been provided an empty string,
		// then apply that value to state - we still have to validate this input before processing
		// it to some other component or data structure, but it frees up our input the way a user
		// would expect to interact with this component
		else if (val === '' || val === '-') this.setState({toolKit: val});
  }
  handleChangeTshirt(e) {
    this.setState({Tshirt: e.target.value})
  }
  handleChangeFullSet(e) {
    this.setState({fullSet: e.target.value})
  }

  handleSubmit (event, e) {
	// const templateId = 'vnclean_green';
	// const user_id = 'user_fUIi3DXmEKTq1SDEYsLg3';

	// this.sendFeedback(templateId, {message_html: this.state.feedback, from_name: this.state.name, reply_to: this.state.email})
    // this.routeChange()
    this.requestTools()
  }

  requestTools(){
      // console.log('register input')
      var userEmail = localStorage.getItem('email')
      console.log(userEmail)
    fetch(requestEquipmentUrl, {

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'

      },
      method: 'PUT',

      body: JSON.stringify({
        'locationId': this.props.location.locationId,
        'userEmail': userEmail,
        'toolKit': this.state.toolKit,
        'Tshirt': this.state.Tshirt,
        'fullSet': this.state.fullSet,
        
      }
      )
    //   body: JSON.stringify({
    //     'userEmail': this.props.data
    // }
    // )

    })
      .then(resp => resp.json(), setTimeout(function () { window.location.reload(); }, 500))

  }
}
 