import React, { Component } from 'react';
import { PageHeader, ListGroup, Row, Col, Carousel } from 'react-bootstrap';
// import { API } from 'aws-amplify';
import './Home.css';
import MarkedMap from './markedMap.js';
import LocationList from './LocationList';
// import { Marker } from 'google-maps-react';
// import { FaListUl } from 'react-icons/fa';
const urlLocation = 'http://localhost:8080/location'

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			location: []

		};
	}


	fetchLocation() {
		console.log('fetch location')
		fetch(urlLocation)
			.then(response => response.json())
			.then(data => {
				this.setState({ location: data })
				console.log(this.state.location.address)
			})
	}

	


	async componentDidMount() {
		console.log(this.props.isAuthenticated)
		this.fetchLocation()
		if (!this.props.isAuthenticated) {
			return;
		}
		this.setState({ isLoading: false });
		
	}



	renderLander() {
		return (
			<div className="lander" >
				{/* <h1>Test web app</h1>
				<p>A simple react test app</p> */}
				<Carousel >
  <Carousel.Item style={{height: 500}}>
    <img
      className="d-block w-100"
      src="http://build-projects.org/wp-content/uploads/2018/10/svx-logo.png"
      alt="First slide"
    />
    {/* <Carousel.Caption> */}
      {/* <h3>First slide label</h3> */}
      {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
    {/* </Carousel.Caption> */}
  </Carousel.Item>
  <Carousel.Item style={{height: 500}}>
    <img
	height={500}
      className="d-block w-100 h-100"
      src="https://4.bp.blogspot.com/-oxAP42k9ulA/XbVI5-_vvEI/AAAAAAAAJfw/Y4eTxtWpa2Ev349IE_V4ZnGTr_Zah0hywCLcBGAsYHQ/s1600/trees-mr-beast-n.jpg"
      alt="Third slide"
    />

    {/* <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption> */}
  </Carousel.Item>
  <Carousel.Item style={{height: 500}}>
    <img
	
      className="d-block w-100"
      src="https://www.collegechoice.net/wp-content/uploads/2018/06/Best-Master_s-in-Environmental-Management.jpg"
      alt="Third slide"
    />

    {/* <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption> */}
  </Carousel.Item>
</Carousel>
			

			</div>
		);
	}

	renderTest() {
		return (
			<div>
				<div className="test">
					<PageHeader>Welcome to Viet Nam Sach Va Xanh.</PageHeader>
					
					
					<Row>
					
						<Col sm={8}>
						<h3>Here are the current registered locations to select from.</h3>
							<MarkedMap
							data={this.state}
							google={this.props.google}
							center={{ lat: 10.8231, lng: 106.6297 }}
							height='400px'
							zoom={8}>
						</MarkedMap>
						</Col>
						<Col sm={4}>
						<h3> Location List</h3>
							<LocationList {...this.props} data={this.state} />
						</Col>
					</Row>

					<ListGroup>{!this.state.isLoading}</ListGroup>

				</div>

			</div>
		);
	}

	render() {
		return <div className="Home">{this.props.isAuthenticated ? this.renderTest() : this.renderLander()}</div>;
	}
}
