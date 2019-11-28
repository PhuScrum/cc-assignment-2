import React, { Component } from 'react'
import { CSVLink, CSVDownload } from "react-csv";

const fetchUserByEmail_URL = 'http://localhost:8080/fetchUserByEmail'
let arr = []
let copyArr = arr
export default class SingleMember extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fName: '',
            lName: '',
            age: '',
            gender: '',
            phoneNumber: 0,
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
                const { fName, lName, age, gender, phoneNumber } = resp
                this.setState({
                    fName: fName,
                    lName: lName,
                    age: age,
                    gender: gender,
                    phoneNumber: phoneNumber
                })
                // console.log('member', fName +', '+ this.props.data)
                // console.log(resp.fName)
                this.collectData(respName, respPhone)
            })
    }
     windowOnload() {
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    }
    collectData(respName, respPhone){
        // console.log(resp2)
        copyArr.push('Name: ' + respName + ' Phone Number: ' + respPhone + ' Email: ' + this.props.data + "||||||") 
        this.setState({
            arr: copyArr
          });
        //   console.log(this.state.arr)
          localStorage.setItem('members', this.state.arr)
        // for (var i = 0; i < this.state.arr.length; i++) {
        //     document.write(this.state.arr[i]);
            
        //   }
        
    }
    
    componentDidMount() {
        // console.log(this.props.data)
        // email fetching
        this.fetchMember(this.props.data)

    
    }

    render() {
        // console.log(this.props.data)
        
        
        const { fName, lName, age, gender, phoneNumber } = this.state
        return (
            <div>
                {fName} {lName} <br />
                {this.props.data} <br />
                {age} <br />
                {gender} <br />
                {phoneNumber} <br />
                <hr />
                
            </div>
        )
    }
}
