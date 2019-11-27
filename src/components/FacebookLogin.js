import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import { Link } from 'react-router-dom';
import { HelpBlock, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
const urlRegister = 'http://localhost:8080/register'
const fetchUserByEmail_URL =  'http://localhost:8080/fetchUserByEmail'
export default class Facebook extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    // name:"",
    fname: "",
    age: "",
    // lname:"",
    email: "",
    imageUrl: "",
    phoneNumber: "",
    gender: "",
    locationOwner: '',
  };

  

  signUp() {
    const { email, fname, age, gender, phoneNumber, imageUrl } = this.state
    console.log(email, fname, age, gender, phoneNumber, imageUrl)
    // localStorage.setItem("email", this.state.email);
    // localStorage.setItem("containermail", email);
    // localStorage.setItem("name", fname);
    // localStorage.setItem("age", age);
    // localStorage.setItem("gender", gender);
    // localStorage.setItem("phone", phoneNumber);
    // localStorage.setItem("img", imageUrl);
    fetch(urlRegister, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'

      },
      method: 'POST',
      body: JSON.stringify({
        // add more values
        "email": email,
        "fName": fname,
        "age": age,
        "gender": gender,
        "phoneNumber": phoneNumber,
        "imageUrl": imageUrl

      }
      )
    })
      .then(resp => resp.json())

  }


  responseFacebook = response => {
    // console.log(response);
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      fname: response.name,
      email: response.email,
      imageUrl: response.picture.data.url
    });

    localStorage.setItem("email", response.email);
  };

  //test 
  handleSubmitNoSignUp() {
    this.setState({ isLoading: true });
    try {
      this.props.userHasAuthenticated(true);
      this.props.history.push('/');
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };
  
  handleSubmit() {
    this.setState({ isLoading: true });
    this.signUp();
    try {
      this.props.userHasAuthenticated(true);
      this.props.history.push('/');
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  fetchMember(FacebookEmail){
    var FacebookEmail = localStorage.getItem('email')
    fetch(fetchUserByEmail_URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

        },
        method: 'POST',
        body: JSON.stringify({
          
            'userEmail': FacebookEmail
        }
        )
    })
        .then(resp => resp.json())
        .then(data => {
            console.log(data.phoneNumber)
            console.log(typeof(data.phoneNumber))
            this.setState({
                phoneNumber: data.phoneNumber,
                age: data.age,
                gender: data.gender
            })        
          

        })
}




  render() {
    let fbRender;
    if (this.state.isLoggedIn) {
     if(this.state.phoneNumber === ""){fbRender = (
        
      <div>

        <div
          style={{ width: "400px", margin: "auto", background: "#f4f4f4", padding: "20px" }}
        >

          <img src={this.state.imageUrl} alt={this.state.fname} />
          <br />
          <br />
          <h2>Welcome {this.state.fname}</h2>
          <h5>Email: {this.state.email}</h5>

          <br />
          <p>You will need to provide additional info on the first sign-in with Facebook.</p>
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


          <button onClick={() => { this.handleSubmit() }} > Procceed to Page </button>
        </div>


      </div>
    );
  }else{
    return(
      <div>

        <div
          style={{ width: "400px", margin: "auto", background: "#f4f4f4", padding: "20px" }}
        >

          <img src={this.state.imageUrl} alt={this.state.fname} />
          <br />
          <br />
          <h2>Welcome {this.state.fname}</h2>
          <h5>Email: {this.state.email}</h5>
          <h5>Age: {this.state.age}</h5>
          <h5>Gender: {this.state.gender}</h5>
          <h5>Phone Number: {this.state.phoneNumber}</h5>


          <button onClick={() => { this.handleSubmitNoSignUp() }} > Procceed to Page </button>
        </div>


      </div>
    )
  }
    
      
  
    
    } else {
      fbRender = (
        <FacebookLogin
          appId="985020555176750"
          autoLoad={true}
          fields="name,email,picture"
          callback={this.responseFacebook}
          onClick={() => { this.fetchMember() }}
        />

      );
    }
    // here

    return <div>{fbRender}</div>;
  }
}