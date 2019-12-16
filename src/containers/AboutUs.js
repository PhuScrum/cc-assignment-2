import React, { Component } from 'react';
import { PageHeader, ListGroup, Carousel } from 'react-bootstrap';

export default class AboutUs extends Component {
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

                <PageHeader>About Us </PageHeader>
              
  
    <img style={{height: 450}}
      className="d-block w-100"
      src="http://build-projects.org/wp-content/uploads/2018/10/svx-logo.png"
      alt="First slide"/>
  


  
<br/><br/>

                <h4>Our goal at <strong>Keep Vietnam Clean & Green (KVCG)</strong> is to raise awareness about the litter & trash problem in Vietnam. While we understand there are many other issues that impact the environment, our focus is on littering, as we believe it to be the most basic of environmental issues and the foundational basis of environmental education. We believe, “How can we educate people about issues like climate change, sustainable building, reusable energies and recycling when we can’t get the general population to stop littering?”

                </h4>
                <h4>
                    <br/>

                    <br/>Our first program, started in June 2013, was the Green Ribbon Campaign that won the international Youth4Asia competition sponsored by the Asian Development Bank in 2015 when we worked with 15 universities in Vietnam to get over 40,000 pledges to not litter. We were honored to present our program to the Environment Ministers of all the countries in the Greater Mekong Region in Myanmar and then again in 2016 at the Asia Youth Conference in the Philippines.
                    <br/><br/>
<br/>In April 2015, we started our second program the Community Clean Ups on Phu Quoc Island. We have, since then, also organized clean ups in Han Noi, HCMC, Hoi An, Hue and Can Tho and have engaged over organizations to join the clean ups.
<br/><br/>
<br/>In 2016, we developed the characters for the Green Turtle Army, a campaign targeting children. We are excited as these mascots will educate children about the negative impacts of littering. Our partners in this effort are (1) RMIT University’s Centre of Communication and Design, whose students designed the characters and (2) Saigon South International School, whose elementary and middle school students helped to create activities based on the Green Turtle Army characters.
<br/><br/><br/><br/>
<h1>Our Inspiration</h1>
<br/>
In developed countries, organizations that combat litter are numerous. We draw our inspiration from them and aspire to be like them. Our main source of inspiration is the four organizations below, including:
<br/><br/>
<br/>• Keep America Beautiful (founded in 1953)
<br/>
<br/>• Keep Britain Tidy (founded in 1955)
<br/>
<br/>• Keep Australia Beautiful (founded in 1969)
<br/>
<br/>• Don’t Mess With Texas (founded in 1985)
<br/><br/><br/><br/>

Since all of them were established for so many years ago and still exist until today, we believe that this battle will take patience and endurance.</h4>


            </div>
        );
    }

    render() {
        return <div className="Home">{!this.props.isAuthenticated ? this.renderTest() : this.renderTest()}</div>;
    }
}
