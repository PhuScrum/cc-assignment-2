import React, { Component } from 'react'

const fetchUserByEmail_URL =  'http://localhost:8080/fetchUserByEmail'


export default class SingleMember extends Component {
    constructor(props){
        super(props)
        this.state ={
            fName: '',
            lName: '',
            age: '',
            gender: '',
            phoneNumber: ''
        }
    }

    fetchMember(id){
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
            .then(data => {
                console.log(data)
                const {fName, lName, age, gender, phoneNumber} = data
                this.setState({
                    fName: fName,
                    lName:lName ,
                    age: age,
                    gender: gender,
                    phoneNumber: phoneNumber,
                })        
              

            })
    }
    componentDidMount(){
        console.log(this.props.data)
        // email fetching
        this.fetchMember(this.props.data)
    }

    render() {
        const {fName, lName, age, gender, phoneNumber} = this.state
        return (
            <div>
                {fName} {lName} <br/>
                {this.props.data} <br/>
                {age} <br/>
                {gender} <br/>
                {phoneNumber} <br/>
                <hr/>
            </div>
        )
    }
}
