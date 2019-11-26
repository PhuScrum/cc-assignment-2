import React, { Component } from 'react';
import { PageHeader, ListGroup } from 'react-bootstrap';
import '../Home.css';
import { Col, Row } from 'react-bootstrap';

import { Modal, Button } from 'antd';
const locationUrl = 'http://localhost:8080/locationDetails'

const urlLocation = 'http://localhost:8080/Input'

export default class InputInformation extends Component {
    constructor(props) {
        super(props);
        this.onChangeKilos = this.onChangeKilos.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onChangeAttended = this.onChangeAttended.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            isLoading: true,
            kilos: 0.0,
            attended: 0.0,
            cost: 0.0


        };
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

    componentDidMount() {
        console.log(this.props.locationId)
        console.log(this.props)
    }

    onSubmit() {
        const { kilos, attended, cost } = this.state
        var input = { kilos, attended, cost }
        
        console.log("datatype", typeof(kiloss))
        this.registerInput();
        this.setState({
            kilos: 0.0,
            attended: 0.0,
            cost: 0.0
        })

    }

    registerInput() {
        console.log('register input')
        const { kilos, attended, cost } = this.state
        var kiloss = parseFloat(kilos)
        var attendedd = parseFloat(attended)
        var costt = parseFloat(cost)
        fetch(urlLocation, {
            
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            },
            method: 'POST',
            
            body: JSON.stringify({
                // add more values
                
                locationId: this.props.locationId,
                input: {
                    kilos: kiloss,
                    attended: attendedd,
                    cost: costt
                }
            }
            )
        })
            .then(resp => resp.json(), window.location.reload())

    }

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
                <container>
                    <Row className="justify-content-md-center">
                        <Col xs lg="2">
                            {this.props.input.kilos}
                        </Col>
                        <Col xs lg="2">
                            {this.props.input.attended}
                            </Col>
                        <Col xs lg="2">
                        {this.props.input.cost}
                        </Col>
                    </Row>
                    </container>
<br/>

                <button type="submit" className="btn btn-primary pull-right" 
                onClick={this.showModal }>Input / Edit</button>
                <Modal
 title={<h3>Fill in information after Site CleanUp</h3>}
                    visible={this.state.visible}
                    onOk={this.onSubmit.bind(this)}
                    onCancel={this.handleCancel}
                    >
                        <div style={{ marginTop: 10 }}>
                    <div className="form-group">
                        <label>Amount of collected waste(kilos) : </label>
                        <input
                            
                            className="form-control"
                            value={this.state.kilos}
                            onChange={this.onChangeKilos}
                        />
                    </div>
                    <div className="form-group">
                        <label>Amount of attendees:  </label>
                        <input 
                            className="form-control"
                            value={this.state.attended}
                            onChange={this.onChangeAttended}
                        />
                    </div>
                    <div className="form-group">
                        <label>Cost of operation (VND): </label>
                        <input 
                            className="form-control"
                            value={this.state.cost}
                            onChange={this.onChangeCost}
                        />
                    </div>
                    {/* <button type="submit" className="btn btn-primary" onClick={this.onSubmit.bind(this)}>Input / Edit</button> */}


                </div>
                    </Modal>

                
            </div>
        );
    }


}
