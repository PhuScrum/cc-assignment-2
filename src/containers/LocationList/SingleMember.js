import React, { Component } from 'react'
import { CSVLink, CSVDownload } from "react-csv";
import { Button, Modal } from "react-bootstrap"
import ContactSingleMember from './ContactSingleMember'
import ToolsRequestUser from './ToolsRequestUser'
import {Row, Col } from 'react-bootstrap'
// const fetchUserByEmail_URL = 'https://vietnamsachvaxanh.com/fetchUserByEmail'
const fetchUserByEmail_URL = 'http://localhost:8080/fetchUserByEmail'
let arr = []
let copyArr = arr
let publishMembers = []
let copyPublishMembers = publishMembers
export default class SingleMember extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fName: '',
            lName: '',
            age: '',
            gender: '',
            phoneNumber: 0,
            email: this.props.data,
            toolKit:0,
            Tshirt:0,
            fullSet:0,
            imageUrl:'',

            locationId: this.props.location.locationId,
        }

    }

    fetchMember(id) {
        fetch(fetchUserByEmail_URL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            },
            method: 'POST',
            body: JSON.stringify({
                'userEmail': this.props.data
            }
            )
        })
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp)
                // localStorage.setItem('members', resp)
                // localStorage.setItem('members:', data)
                var respName = JSON.stringify(resp.fName)
                var respPhone = JSON.stringify(resp.phoneNumber)
                const { fName, lName, age, gender, phoneNumber, toolKit, Tshirt, fullSet, imageUrl } = resp
                this.setState({
                    fName: fName,
                    lName: lName,
                    age: age,
                    gender: gender,
                    phoneNumber: phoneNumber,
                    toolKit: toolKit,
                    Tshirt: Tshirt,
                    fullSet: fullSet,
                    imageUrl: imageUrl
                })
                // console.log('member', fName +', '+ this.props.data)
                // console.log(resp.fName)
                this.collectData(respName, respPhone)
            })
    }
    windowOnload() {
        if (!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    }

    collectData(respName, respPhone) {
        // console.log(resp2)
        copyArr.push('Name: ' + respName + ' Phone Number: ' + respPhone + ' Email: ' + this.props.data + "||||||")

        this.setState({
            arr: copyArr
        });
        //   console.log(this.state.arr)
        localStorage.setItem('members', this.state.arr)

        copyPublishMembers.push(this.props.data) 

        this.setState({
            PublishMembers: copyPublishMembers
        });
        localStorage.setItem('PublishMembers', this.state.PublishMembers)
      
    }
 
    componentDidMount() {
        // console.log("didmount",this.props.data)
        // email fetching
        this.fetchMember(this.props.data)


    }
    //contact member
    contactSingleMember() {
        // console.log("contact", this.props.data)
        // console.log("location owner", this.props.data.locationOwner)

    }
   
    

    render() {
        // console.log(this.props.data)
      
        const { fName, lName, age, gender, phoneNumber, toolKit, Tshirt, fullSet, imageUrl } = this.state
        const locationOwner = localStorage.getItem('locationOwner')
        const loggedInEmail = localStorage.getItem('email')
        // console.log("single member", this.props.data)
        // localStorage.setItem('joined members', this.props.data)
        if(locationOwner === loggedInEmail ){

        return (
            
            <div> 
<Row>
    <Col sm='7'>{fName} {lName} <br />
                {this.props.data} <br />
                {age} <br />
                {gender} <br />
                {phoneNumber} <br />
                {/* <Button onClick={this.contactSingleMember()}>Contact This Member</Button> */}
                {/* <Button data-dismiss="modal" onClick={() => { this.contactSingleMember() }}>Contact This Member</Button> */}
                </Col>
                    <Col>
                    <img style={{ width: 100 }} src={imageUrl}></img>
                    </Col>
                </Row>
      <br/>          
                <p>This member requested for {toolKit} tool kit, {Tshirt} T-Shirt, {fullSet} fullset.</p>
                <ContactSingleMember data={this.state}/>
                <hr />
                

            </div>

        )
    }
    else if(this.props.data === loggedInEmail)
    return(
        <div> 

            <Row>
                <Col sm='7'>{fName} {lName} <br />
                    {this.props.data} <br />
                    {age} <br />
                    {gender} <br />
                    {phoneNumber} <br />
                    {/* <Button onClick={this.contactSingleMember()}>Contact This Member</Button> */}
                    {/* <Button data-dismiss="modal" onClick={() => { this.contactSingleMember() }}>Contact This Member</Button> */}
                </Col>
                <Col>
                    <img style={{ width: 100 }} src={imageUrl}></img>
                </Col>
            </Row>
                <ToolsRequestUser data={this.state} location={this.state}/>
                <hr />
                

            </div>
    )
    else{
        return(
            <div>
            
            <Row>
                <Col sm='7'>{fName} {lName} <br />
                    {this.props.data} <br />
                    {age} <br />
                    {gender} <br />
                    {phoneNumber} <br /> 
                    {/* <Button onClick={this.contactSingleMember()}>Contact This Member</Button> */}
                    {/* <Button data-dismiss="modal" onClick={() => { this.contactSingleMember() }}>Contact This Member</Button> */}
                </Col>
                <Col>
                    <img style={{ width: 100 }} src={imageUrl}></img>
                </Col>
            </Row>
            <hr />
            

        </div>
        )
    }

    }
}
