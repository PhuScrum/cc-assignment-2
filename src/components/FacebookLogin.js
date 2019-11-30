import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import { Link } from 'react-router-dom';
import { HelpBlock, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';


const urlRegister = 'http://localhost:8080/register'
const fetchUserByEmail_URL =  'http://localhost:8080/fetchUserByEmail'

export default class Facebook extends Component {
  constructor(props) {
		super(props);
		this.state = {
		}

	}
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
    locationOwner: ''
    
  };

  

  signUp() {
    const { email, fname, age, gender, phoneNumber, imageUrl, isRegistered } = this.state
  this.setState({
    isRegistered: true
  })
  console.log("test is regis", this.state.isRegistered)
    console.log(email, fname, age, gender, phoneNumber, imageUrl, isRegistered)
   
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
        "imageUrl": imageUrl,
        "isRegistered": true

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
    
    localStorage.setItem("email", this.state.email);
    localStorage.setItem("CognitoIdentityServiceProvider.1ttne14j3121llt108u9q9pco9.aa526432-1cc6-4db9-a9a5-0751975ed378.refreshToken",
     "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.VAoHCpHEkyZNMQfQjw_OgaLcJEDlnMQg3epPRd459PupY70MPE1EJOaZDBbicf1qKRieutVBElCKZg8pdo4NG1jaAGKY47UdiyhEQGiOAyke0RFMMyqXHUUIG479_qSTCsN_SgzaVKFzoe3OQyQdpSaRy1fPWzlqSuh9pPkOlJJOiCn1vHwiT33abGX2_OVzsLu_XLDZZgWtfN54DswBvenRC4z5J4NsDG8MPlo3E2sIMcZdfaelDFjrwqUEFYMxy5JDDntu8qBxSrpto7dHtAWN4NmyxPJpzBfletiRqJE-tUbvKwnlg43mjcrymzbDXXkABlyW-_urZyUTwqJVFA.SYNwz-sfkLKEEvlC.VLsdScb-nMMTid31PCNIxo8yvmU5r4Fk8XyKF1Jy_6v_6UX0NdEw273LdG-t7MI8_5Bf38JYTecPGpgJ5J-nxH-yTNcVlhEZ3FCRmmcWNGQQtzTo55Eq4q8RVax05ccUSV1krYMDEuZZs2BxUx0-blkJtv0csM8aguMhv3jGXbodc033UONfE6puBXVCweuOMy2s1TQXSjtNhZ4Bs0zVDqR8m0qbLGRpYhmHiVnZ7AFhSu9ngC6xbuNuEIs8bui7ashgaampjoWgEASsNJTbQcM4HDBSEcu7IoPQuxtCRl3xojS-jpGUC048ML2cQm8_E8HAfO2PNn7gQIpCZHbTpE_slkB_gYMT72GkYRuKbPTxAPgaNB4jxxsq6KxqG1a0gpA5SEhYeVN2aJNK-7n6AQM5UNGhxPBDpSU-eRI9PIYZgoPuPZks9DkYA8B_HhLqm8LbNo1q5tnKv9WK5ZQibE_dg89ZtRK6HS4EbhfsbBty0FGI8JWVmFADui9VRpX2kRlONCWK_hMGNYE4-9_de9eRbkUqyXLbYhztQ90EkpFdvgbXdTD0pz-w0kOwegbty8geBp1KDPxLF8DcWwraLIuEMVwmXoz9RtU5sZiHYTtMDhX2Li4Za8CDYG3ZDlomvJHwCdT-zs4eTguDCyOr_QPFrvMtG-F785Fn2qTlimdIddkdSLMeyYKxkr7etc7n4vyBMJLk6N9z0Tr4sezeyIg2MFVPFjDhS7YLYoSOaW5d6jbS9OF535Uv7U3vAdtkMLvsPGKftU6bkmK1kosavtW68Ok87QPseO2zbWVYTPH34o342HURa_RsKnKOZs7YH4dOtuddEvMnJ7dpn_fMAvvAzmKu56U-Y8d6WCReUcr0zn8Glwf2Z9r_IUw6QWUYUq_Hb9VH0eeSxfeJQ5Dfmn7zpaxVeuRb75difqTI4auk8YDEpdS1ny6hlD026A32ATmuRxW5w-_CgGNdagGUBzj9kVI6VkiDgAO3j_vGxhNyJt37jUjKsGq39tURPdUfB2Np_2KPsGtHbyt6wf_THOLpMtoe-q_iXD4FlahZocHmt8LDT5NgQfmAnNFI_hitctqLoDIt_E61ZxAEL6Y8KOv4tQ1RsI6lnAEZLneumFo5iJVdbMh5tUxnaJZi_LNds0ukZiudDwRN3NUuT56tnEKF51r1IO6x6lEEgIe8XYQn4iIjzgMyaW1imjfjjG-8AAn-_ZrnX9W6yyJTGF8JJ2Tskf0f2jHVzAhEPbgAinlBbevvEEMVAWcSad0Mg9dwQnlZswf-txcWS9B9JTKhRM7H_ukbR0FQzaiel88Kmt3ndw-L3sTTy9_WAnw.L4YljzA_Yvl-Oh3v34aMZg");
    localStorage.setItem("CognitoIdentityServiceProvider.1ttne14j3121llt108u9q9pco9.aa526432-1cc6-4db9-a9a5-0751975ed378.idToken",
      "eyJraWQiOiJEb2VCNHlBa2gyZE1wUkNEMjJuV1h2V2RRZTZON2k1RkJsYnZld1NUVVd3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhYTUyNjQzMi0xY2M2LTRkYjktYTlhNS0wNzUxOTc1ZWQzNzgiLCJhdWQiOiIxdHRuZTE0ajMxMjFsbHQxMDh1OXE5cGNvOSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6ImYyNGQ2OWZhLWY4ZmItNGFmYS05MmIwLTI2YTYzNGQ3ZmY1NyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTc0OTIwMjc0LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV85eUhFYWhQV3kiLCJjb2duaXRvOnVzZXJuYW1lIjoiYWE1MjY0MzItMWNjNi00ZGI5LWE5YTUtMDc1MTk3NWVkMzc4IiwiZXhwIjoxNTc0OTIzODc2LCJpYXQiOjE1NzQ5MjAyNzYsImVtYWlsIjoidGhhbmgubmd1eWVubmdvY0BybWl0LmVkdS52biJ9.K5uI_VcVRFuG66X__kfaVjdtsu9da8OmO0at1LeUgs5-X0QmHvx5_V_CBpsrtHn8rPXLCV0AyzBmBI6pElxQLdrA2UzqnR4hWQTfJDN1goTi1ogjMwBvUy9O8MyxBCEE1DGdzU75JaFC09Y7ubKsdSdqyG8K3nnF9YktvKPHZCZ5A8Jc0M7wkXt3j2soY16XKe_aISYWJfBk4vdFWjQD-te4arW1wMTtiRj_Icl9jKFolcHkremf8DhdKAtni0_97HFwE2SewUILwbxROdRSznPrQ7uY-u3Se1XO-LDj5ELD55DtKOosVE_UvMWCV143e31dD7LZNQtjN-RGGzJpOQ");
    localStorage.setItem("CognitoIdentityServiceProvider.1ttne14j3121llt108u9q9pco9.aa526432-1cc6-4db9-a9a5-0751975ed378.accessToken",
     "eyJraWQiOiJiVlUxTkdqcGtzdUpDSURmdGQ4OVFZQWo2Ymk5eEZwb1pmajRONjVvbzY0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhYTUyNjQzMi0xY2M2LTRkYjktYTlhNS0wNzUxOTc1ZWQzNzgiLCJldmVudF9pZCI6ImYyNGQ2OWZhLWY4ZmItNGFmYS05MmIwLTI2YTYzNGQ3ZmY1NyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1NzQ5MjAyNzQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xXzl5SEVhaFBXeSIsImV4cCI6MTU3NDkyMzg3NiwiaWF0IjoxNTc0OTIwMjc2LCJqdGkiOiJlMmNhYTFmZi0xYjA2LTRlMWYtODg3Zi04NjI1NmQ3NWVkNDYiLCJjbGllbnRfaWQiOiIxdHRuZTE0ajMxMjFsbHQxMDh1OXE5cGNvOSIsInVzZXJuYW1lIjoiYWE1MjY0MzItMWNjNi00ZGI5LWE5YTUtMDc1MTk3NWVkMzc4In0.R7fpC8m13dLNkIIBLLxgkK-C_5Rwe4gdYojqAiLzZoXGihJhAJM5W1emvJJ0DQ115ledQyK5S9duXlA5LEan84oFMM6d-h_u6IIUa3SWiWFdPIsmICLNux9MdzT2zZYtsbYhTCOZXDaBbwSIIwrLYGQ2f6yAwu7Ir9wz1vLRyfVvEoLs2vpFvcbZ9D6yQ4f30lpTw29tIQIxyGeyq9lMXLE6dBJeras8AUJyey_A--aB9DH3-h91UAKz_tI4OvnXRLFQlhivHGoRGbOCKf6HLUIhFhODOxAOP8IuHCPLn-V6GeYdg24bayuRPhjnugck0VCG0B-UoIBy7PSrdEujgg");
     localStorage.setItem("CognitoIdentityServiceProvider.1ttne14j3121llt108u9q9pco9.aa526432-1cc6-4db9-a9a5-0751975ed378.clockDrift",
      "-2");
     localStorage.setItem("CognitoIdentityServiceProvider.1ttne14j3121llt108u9q9pco9.LastAuthUser", "aa526432-1cc6-4db9-a9a5-0751975ed378");

     localStorage.setItem("CognitoIdentityServiceProvider.1ttne14j3121llt108u9q9pco9.aa526432-1cc6-4db9-a9a5-0751975ed378.userData", 
     {"UserAttributes":[{"Name":"sub","Value":"aa526432-1cc6-4db9-a9a5-0751975ed378"},{"Name":"email_verified","Value":"true"},{"Name":"email","Value":"thanh.nguyenngoc@rmit.edu.vn"}],"Username":"aa526432-1cc6-4db9-a9a5-0751975ed378"});

     localStorage.setItem("amplify-signin-with-hostedUI", "false");
     this.fetchMember()
    
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
    this.setState({
      isLoading: true,
     });
    
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
            // console.log(data.phoneNumber)
            // console.log(typeof(data.phoneNumber))
            if(data){
            this.setState({
                phoneNumber: data.phoneNumber,
                age: data.age,
                gender: data.gender,
                isRegistered: data.isRegistered


            })
          }
            
          

        })
}




  render() {
    let fbRender;
    if (this.state.isLoggedIn) {
      console.log("FUCK", this.state.isRegistered)
     if(this.state.isRegistered === undefined){
       fbRender = (
        
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
          
          
        />

      );
    }
    // here

    return <div>{fbRender}</div>;
  }
}