import React, { Component } from 'react';
import { PageHeader, ListGroup } from 'react-bootstrap';
import '../Home.css';
import {Col, Row} from 'react-bootstrap'

const urlLocation = 'http://localhost:8080/location'

export default class InputInformation extends Component {
    constructor(props) {
        super(props);
        this.onChangeKilos = this.onChangeKilos.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeAttended = this.onChangeAttended.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            isLoading: true,
            kilos: '',
            attended: '',
            cost: ''


        };
    }

    onSubmit() {
        
        const { kilos, attended, cost } = this.state
        var input = { kilos, attended, cost }
        console.log('fuck uck', input)
        this.registerInput();
        this.setState({
            kilos: '',
            attended: '',
            cost: ''
        })

    }

    // registerInput(lat, lng){
    // 	const {name, address, time, description} = this.state
    // 	console.log('lat',lat, 'lng',lng)
    // 	fetch(urlLocation, {
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'

    //         },
    //         method: 'POST',
    //         body: JSON.stringify({

    // 			// add more values
    //            input : { kilo: this.state.kilo,
    //         }
    //         }
    //         )
    //     })
    //         .then(resp => resp.json(this.props.history.push('/')))

    // }

    onChangeKilos(e) {
        this.setState({
            kilos: e.target.value


        });
    }
    onChangeAttended(e) {
        this.setState({
            attended: e.target.value


        })
    }
    onChangeCost(e) {
        this.setState({
            cost: e.target.value

        })
    }

    //   onSubmit(e) {
    // 	e.preventDefault();
    // 	const obj = {
    // 	  person_name: this.state.person_name,
    // 	  business_name: this.state.business_name,
    // 	  business_gst_number: this.state.business_gst_number
    // 	};
    // 	this.setState({
    // 	  person_name: '',
    // 	  business_name: '',
    // 	  business_gst_number: ''
    // 	})
    //   }



    render() {
        return (
            <div>
                <h5>Input data after cleanup completion</h5>
                <ListGroup>{!this.state.isLoading}</ListGroup>
                {/* <container>
                    <Row className="justify-content-md-center">
                        <Col xs lg="2">
                            {this.state.input.kilos}
                        </Col>
                        <Col xs lg="2">{this.state.input.attended}</Col>
                        <Col xs lg="2">
                        {this.state.input.cost}
                        </Col>
                    </Row>
                    </container> */}
                    <div style={{ marginTop: 10 }}>
                        <div className="form-group">
                            <label>Amount of collected waste:  </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.kilos}
                                onChange={this.onChangeKilos}
                            />
                        </div>
                        <div className="form-group">
                            <label>Amount of attendees: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.attended}
                                onChange={this.onChangeAttended}
                            />
                        </div>
                        <div className="form-group">
                            <label>Cost of operation: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.cost}
                                onChange={this.onChangeCost}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={this.onSubmit.bind(this)}>Input Info</button>


                    </div>
            </div>
                );
            }
        
        
        }
