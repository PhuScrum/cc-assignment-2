import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import Map from '../containers/Map.js';
import { Link} from 'react-router-dom';

export default class Facebook extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: ""
  };

  responseFacebook = response => {
    // console.log(response);

    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    });
  };

  componentClicked = () => console.log("clicked");
//test 

  render() {
    let fbRender;

    if (this.state.isLoggedIn) {
      fbRender = (
        <div>
        <div
          style={{width: "400px",margin: "auto",background: "#f4f4f4",padding: "20px"}}
        >
          <img src={this.state.picture} alt={this.state.name} />
          <h2>Welcome {this.state.name}</h2>
          Email: {this.state.email}
          
				
        </div>
        <div>
        {/* <Map
					google={this.props.google}
					center={{lat: 10.8231, lng: 106.6297}} 
					height='300px'
          zoom={15}
          /> */}
          <button> <Link to="/Home2"> Go to Crud </Link> </button>
        </div>
        </div>
        

      );
    } else {
      fbRender = (
        <FacebookLogin
          appId="985020555176750"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
        
      );
    }
    // here

    return <div>{fbRender}</div>;
  }
}