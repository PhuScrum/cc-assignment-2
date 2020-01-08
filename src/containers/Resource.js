import React, { Component } from 'react';
import { PageHeader, ListGroup, Carousel } from 'react-bootstrap';




export default class Resource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: localStorage.getItem('members')
        }
    }




    renderTest() {
        const JSON = require('circular-json');
        const json = JSON.stringify(this.state.members);

        return (
            <div className="test">

                <PageHeader> Resources </PageHeader>

                <img style={{ height: 450 }}
                    className="d-block w-100"
                    src="http://build-projects.org/wp-content/uploads/2018/10/svx-logo.png"
                    alt="First slide" />

                <br /><br />

                <PageHeader><strong>Tip and Experiences - Guide to Safe Litter Cleanup</strong> </PageHeader>
                <br />
                <h4>
                    Thank you for lending a hand to beautify our Vietnam Sach and Xanh! Your participation in our program helps to keep our streets, parks, trails, and creeks healthy and clean.

                <br></br>Before you start, don't forget: your safety is our number one priority. Read on for tips to ensure your cleanup is a safe one.
                </h4>

                <h4>
                    <br />

                    <br />Role of the contact
                        The contact person is responsible for submitting all required documentation and serves as the liaison between organizers and any volunteers represented. The contact is also responsible for reminding volunteers to use good judgment and safe practice during cleanup activities. The items in this guide should be discussed with the group prior to each cleanup event.

                        Remember safety first! Under no circumstance is the welfare of a participant to be compromised during cleanup activities.
                    <br /><br />
                    <br />Walking on streets
                        Work on one side of the street at a time.
                        Start your litter pick up at the opposite end of the road from your adopt-a-street sign.
                        Pick up litter walking against traffic. This ensures all volunteers are facing oncoming traffic and are aware of dangers.
                        Leave garbage bags at each adopt-a-program sign, if possible. If bags are too heavy, leave them at the location where filled.
<br /><br />
                    <h2><strong>Volunteer clothing</strong></h2>

                    <br></br>• Always wear the safety vests provided
                    <br></br>• Participants should wear suitable footwear – boots or closed-toe shoes
                    <br></br>• Dress appropriately for the weather
                    <br></br>• Avoid use of headphones or restrictive clothing
<br /><br /><br /><br />
                    <h2><strong>Emergencies</strong></h2>

                    <br />• Keep a cell phone handy or know where the nearest phone is
<br />
                    <br />• Have transportation available
<br />
                    <br />• Report your cleanup activities to your program coordinator as indicted on the cleanup report form.
<br />
                    <br></br>

                    <br />
                    <br></br>
                    <h2><strong>General Tips</strong></h2>
                    <br />• Avoid horseplay while working
<br />
                    <br />• Keep an adequate supply of water
<br />
                    <br />• Report your cleanup activities to your program coordinator as indicted on the cleanup report form.
<br />
                    <br />• Prohibit alcohol and/or illegal drugs
<br />
                    <br />• Include significant irregularities and report injuries immediately.
<br /><br /><br /><br />

                    <h2><strong>Guildline</strong></h2>

                    <br />• 1st Step: Log in success
<br />
                    <br />• 2nd Step: Click Create Location
<br />
                    <br />• 3rd Step: Fill in the information needed (Remember insert the photo included for previous event)
<br />
                    <br />• 4nd Step: Click Create and then the information will be shown up on the map
<br />
                    <br />• 5th Step: The user can filter the user with the filter bar
<br /><br /><br /><br />

                    <h2><strong>Watch a Video Guildline</strong></h2>

                    <br></br> 




                    Since all of them were established for so many years ago and still exist until today, we believe that this battle will take patience and endurance.</h4>


            </div>




        );
    }

    render() {

        return <div className="Home">{!this.props.isAuthenticated ? this.renderTest() : this.renderTest()}</div>;

        //        const rootElement = document.getElementById("root");
        //        ReactDOM.render(<App />, rootElement);
    }
}
