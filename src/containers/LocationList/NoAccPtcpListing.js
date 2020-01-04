import React from 'react'
import {Row, Col} from 'react-bootstrap'
import ContactSingleMember from './ContactSingleMember'
let publishMembers = []
let copyPublishMembers = publishMembers
export default class NoAccPtcp extends React.Component{
    constructor(props){
        super(props)
        this.state ={
          
            
            
        }
    }
    
    collectData() {
    
        

        copyPublishMembers.push(this.props.data.email) 
        console.log('collect array of no acc emails', copyPublishMembers)

        // this.setState({
        //     PublishMembers: copyPublishMembers
        // });
        
        localStorage.setItem('PublishMembersNoAccount', copyPublishMembers)
      
    }
    componentDidMount(){
        this.collectData()
    }

    render(){
        const {name, email, phoneNumber} = this.props.data
        const loggedInEmail = localStorage.getItem('email') 
        const locationOwner = localStorage.getItem('locationOwner')
        
        if(loggedInEmail === locationOwner){
        return(
            <div>
                <span class="badge badge-warning">No account participant</span>
                <Row>
                <Col sm='7'>{name}<br/>
                    {email} <br />
                    {phoneNumber} <br />
                </Col>
                
            </Row>
            <br/>
            <ContactSingleMember data={this.props.data}/>
                
                <hr/>
            </div>
        )
        }else {
            return(
                <div>
                <span class="badge badge-warning">No account participant</span>
                <Row>
                <Col sm='7'>{name}<br/>
                    {email} <br />
                    {phoneNumber} <br />
                </Col>
                
            </Row>
            <br/>
            </div>
            )
        }
    }
}