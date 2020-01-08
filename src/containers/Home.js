import React, { Component } from 'react';
import { PageHeader, ListGroup, Row, Col, Carousel, FormControl } from 'react-bootstrap';
// import { API } from 'aws-amplify';
import './Home.css';
import MarkedMap from './markedMap.js';
import LocationList from './LocationList';
// import selectItem from './selectItem';
import cityData from './data/city.json';
import districtData from './data/district.json';
// import { Marker } from 'google-maps-react';
// import { FaListUl } from 'react-icons/fa';
// const urlLocation = 'https://vietnamsachvaxanh.com/location'
const urlLocation = 'https://7tk4lgbon4.execute-api.ap-southeast-1.amazonaws.com/dev/location'
// const apiCity = 'https://thongtindoanhnghiep.co/api/city'

// Import SelectBox


// ===============================================//

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			cityId: "79",
			districtName: "1",
			locationName: "",
			dateTime: "",
			location: [],
			locationAll: [],
			cityList: [],
			districtList: []
		};
	}


	fetchLocation() {
		console.log('fetch location')
		fetch(urlLocation)
			.then(response => response.json())
			.then(data => {
				this.setState({ locationAll: data })
				this.filterLocation();
				console.log("check this log", this.state.location)
			})
	}

	filterLocation = (locationAddress) => {
		if(!locationAddress) {
			this.setState({ location: this.state.locationAll });
			return false;
		}
		var locationFilter = this.state.locationAll.filter((item, key) => {
			return (item.address && item.address.includes(locationAddress + ',')) 
			&& (item.name && item.name.includes(this.state.locationName))
			&& (!this.state.dateTime || item.dateCreated.substring(0, 10) === this.state.dateTime);
		})
		this.setState({ location: locationFilter });
	}

	searchClick = (event) => {
		this.filterLocation(this.state.districtName);
	}

	fetchCity() {
		let cityArray = [];
		for (var key in cityData) {
			cityArray.push({ id: key, name: cityData[key]["name"] });
		}
		this.setState({cityList:cityArray});
	}

	fetchDistrict() {
		let districtArray = [];
		for (var key in districtData) {
			if(districtData[key]["parent_code"] === this.state.cityId) {
				districtArray.push({ id: key, name: districtData[key]["name"] });
			}
		}
		this.setState({districtList:districtArray});
	}

	changeCity = (event) => {
		this.setState({cityId:event.target.value});
		let districtArray = [];
		for (var key in districtData) {
			if(districtData[key]["parent_code"] == event.target.value) {
				districtArray.push({ id: key, name: districtData[key]["name"] });
			}
		}
		this.setState({districtList:districtArray});
	}

	changeDistrict = (event) => {
		this.setState({districtName: event.target.options[event.target.selectedIndex].text});
	}

	async componentDidMount() {
		console.log(this.props.isAuthenticated)
		this.fetchLocation()
		this.fetchCity()
		this.fetchDistrict()
		if (!this.props.isAuthenticated) {
			return;
		}
		this.setState({ isLoading: false });
	}

	handlerChange = (e)=>{
        this.setState({
			locationName: e.target.value
		});
	}
	
	handlerChangeDate = (e)=>{
        this.setState({
			dateTime: e.target.value
		});
    }

	renderLander() {
		return (
			<div>
				<Row>
					<Col sm={1}>
						<img style={{ height: 1000 }, { width: 125 }}
							src="https://scontent.fsgn8-1.fna.fbcdn.net/v/t1.15752-9/79119719_2642182805871806_7621702921708634112_n.jpg?_nc_cat=109&_nc_ohc=YslXpw5mjd0AQmYNgAeQvUteUpHr7Dk5txlWG_C8H2UNELp2_66BhoENQ&_nc_ht=scontent.fsgn8-1.fna&oh=607571e7745f5c413e1dc5e347340639&oe=5E77578D"
							alt="Smiley face"/>
					</Col>
					<Col sm={10} >
						<Carousel style={{ marginLeft: 20 }}>
							<Carousel.Item style={{ height: 624 }}>
								<img
									className="d-block w-100"
									src="http://build-projects.org/wp-content/uploads/2018/10/svx-logo.png"
									alt="First slide"
								/>
								<Carousel.Caption>
									<h3>Welcome to Vietnam Sach va Xanh</h3>
									<h4>To Create or Join a clean up site, Please Login or Sign Up!</h4>
								</Carousel.Caption>

							</Carousel.Item>
							<Carousel.Item style={{ height: 624 }}>
								<img
									className="d-block w-100"
									src="https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.15752-9/79471105_456619465273952_2950715787314200576_n.jpg?_nc_cat=104&_nc_ohc=NK7f9h7ByIwAQl8dje1AZSxFL-r47SwrrB7Foa2qFYftEdBWZYOxYULXQ&_nc_ht=scontent.fsgn3-1.fna&oh=71f45e291dd6d05b9293fd4a885a5c90&oe=5E749FE5"
									alt="Third slide"
								/>
							</Carousel.Item>
							{/* <Carousel.Item style={{ height: 624 }}>
						<img
							height={500}
							className="d-block w-100 h-100"
							src="https://4.bp.blogspot.com/-oxAP42k9ulA/XbVI5-_vvEI/AAAAAAAAJfw/Y4eTxtWpa2Ev349IE_V4ZnGTr_Zah0hywCLcBGAsYHQ/s1600/trees-mr-beast-n.jpg"
							alt="Third slide"
						/>
</Carousel.Item> */}
							{/* <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption> */}


						</Carousel>
					</Col>

					<Col sm={1} >
						<img style={{ height: 1000 }, { width: 110 }}
							src="https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.15752-9/79671387_483780742490089_2061663600061186048_n.jpg?_nc_cat=106&_nc_ohc=xolv8jS8V6YAQmqVteJ2jquG3BOt9aC0QcGMPCFj7ChRE8nRQVx3qPyeQ&_nc_ht=scontent.fsgn3-1.fna&oh=90534e703767681a67617c6eb67a51ce&oe=5E7F3342"
							alt="Smiley face" />
					</Col>
				</Row>
				<Row>
					<PageHeader> &nbsp; Join the battle to save our planet!</PageHeader>

					<Row>

						<div>
							<Row className="filter-style">
								<Col md={3} className="form-group margin-top: 100px">

									<select className="form-control" onChange={(event) => this.changeCity(event)} value={this.state.cityId}>
										{this.state.cityList.map((item, key) =>
											<option value={item.id}>{item.name}</option>
										)}
									</select>

								</Col>

								<Col md={3}>

								<select className="form-control" onChange={(event) => this.changeDistrict(event)}>
										{this.state.districtList.map((item, key) =>
											<option value={item.id}>{item.name}</option>
										)}
									</select>
								</Col>

								<Col md={2}>

									<input type="text" class="form-control" placeholder="name" value={this.state.locationName}  onChange={this.handlerChange} />
								</Col>

								<Col md={2}>
									<input type="date" class="form-control" pattern="\d{4}-\d{2}-\d{2}" placeholder="date"  value={this.state.dateTime}  onChange={this.handlerChangeDate}/>
								</Col>

								<Col md={2}>
									<button type="button" onClick={this.searchClick} class="btn btn-primary">Search</button>
								</Col>

							</Row>
						</div>
					</Row>

					<Col sm={8}>
						<h3><b>Here are the current registered locations to select from.</b></h3>
						<MarkedMap
							data={this.state}
							google={this.props.google}
							center={{ lat: 10.8231, lng: 106.6297 }}
							height='400px'
							zoom={8}>
						</MarkedMap>
					</Col>
					<Col sm={4}>
						<h3><b> Location List</b></h3>
						<LocationList {...this.props} data={this.state} />
						<selectItem />
					</Col>
				</Row>
			</div>
		);
	}

	renderTest() {
		return (
			<div>
				<Row>
					<Col sm={1}>
						<img style={{ height: 1000 }, { width: 125 }}
							src="https://scontent.fsgn8-1.fna.fbcdn.net/v/t1.15752-9/79119719_2642182805871806_7621702921708634112_n.jpg?_nc_cat=109&_nc_ohc=YslXpw5mjd0AQmYNgAeQvUteUpHr7Dk5txlWG_C8H2UNELp2_66BhoENQ&_nc_ht=scontent.fsgn8-1.fna&oh=607571e7745f5c413e1dc5e347340639&oe=5E77578D"
							alt="Smiley face" />
					</Col>
					<Col sm={10} >
						{/* <h1>Test web app</h1>
				<p>A simple react test app</p> */}
						<Carousel style={{ marginLeft: 20 }}>
							<Carousel.Item style={{ height: 624 }}>
								<img
									className="d-block w-100"
									src="http://build-projects.org/wp-content/uploads/2018/10/svx-logo.png"
									alt="First slide"
								/>
								<Carousel.Caption>
									<h3>Welcome to Vietnam Sach va Xanh</h3>
									<h4>To Create or Join a clean up site, Please Login or Sign Up!</h4>
								</Carousel.Caption>

							</Carousel.Item>
							<Carousel.Item style={{ height: 624 }}>
								<img
									className="d-block w-100"
									src="https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.15752-9/79471105_456619465273952_2950715787314200576_n.jpg?_nc_cat=104&_nc_ohc=NK7f9h7ByIwAQl8dje1AZSxFL-r47SwrrB7Foa2qFYftEdBWZYOxYULXQ&_nc_ht=scontent.fsgn3-1.fna&oh=71f45e291dd6d05b9293fd4a885a5c90&oe=5E749FE5"
									alt="Third slide"
								/>
							</Carousel.Item>
							{/* <Carousel.Item style={{ height: 624 }}>
						<img
							height={500}
							className="d-block w-100 h-100"
							src="https://4.bp.blogspot.com/-oxAP42k9ulA/XbVI5-_vvEI/AAAAAAAAJfw/Y4eTxtWpa2Ev349IE_V4ZnGTr_Zah0hywCLcBGAsYHQ/s1600/trees-mr-beast-n.jpg"
							alt="Third slide"
						/>
</Carousel.Item> */}
							{/* <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption> */}


						</Carousel>
					</Col>

					<Col sm={1} >
						<img style={{ height: 1000 }, { width: 110 }}
							src="https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.15752-9/79671387_483780742490089_2061663600061186048_n.jpg?_nc_cat=106&_nc_ohc=xolv8jS8V6YAQmqVteJ2jquG3BOt9aC0QcGMPCFj7ChRE8nRQVx3qPyeQ&_nc_ht=scontent.fsgn3-1.fna&oh=90534e703767681a67617c6eb67a51ce&oe=5E7F3342"
							alt="Smiley face" />
					</Col>
				</Row>


				<Row className="filter-header">
					<PageHeader> &nbsp; Join the battle to save our planet!</PageHeader>

					<Row>

					<div>
							<Row className="filter-style">
								<Col md={3} className="form-group margin-top: 100px">

									<select className="form-control" onChange={(event) => this.changeCity(event)} value={this.state.cityId}>
										{this.state.cityList.map((item, key) =>
											<option value={item.id}>{item.name}</option>
										)}
									</select>

								</Col>

								<Col md={3}>

								<select className="form-control" onChange={(event) => this.changeDistrict(event)}>
										{this.state.districtList.map((item, key) =>
											<option value={item.id}>{item.name}</option>
										)}
									</select>
								</Col>

								<Col md={2}>

									<input type="text" class="form-control" placeholder="name" value={this.state.locationName}  onChange={this.handlerChange} />
								</Col>

								<Col md={2}>
									<input type="date" class="form-control" pattern="\d{4}-\d{2}-\d{2}" placeholder="date"  value={this.state.dateTime}  onChange={this.handlerChangeDate}/>
								</Col>

								<Col md={2}>
									<button type="button" onClick={this.searchClick} class="btn btn-primary">Search</button>
								</Col>

							</Row>
						</div>
					</Row>



					<Col sm={8}>
						<h3><b>Here are the current registered locations to select from.</b></h3>

						<hr />



						<MarkedMap
							data={this.state}
							google={this.props.google}
							center={{ lat: 10.8231, lng: 106.6297 }}
							height='400px'
							zoom={8}>
						</MarkedMap>
					</Col>
					<Col sm={4}>
						<h3><b> Location List</b></h3>
						<LocationList {...this.props} data={this.state} />
					</Col>
				</Row>
			</div>
			// 			<div>
			// 				<div className="test">
			// 					<PageHeader>Welcome to Viet Nam Sach Va Xanh.


			// 					</PageHeader>
			// 					<h4><b>Vietnam Clean & Green</b>’s mission is to reduce littering in Vietnam and to bring about momentous societal change. We’ll raise public awareness about the negative impacts of littering and highlight the importance of individual responsibility. To accomplish this mission, we seek to cooperate with companies, educational institutions, government agencies, NGOs and anyone else who believes in a cleaner country and world.
			// <br /><br />
			// 						We're passionate about Keeping Vietnam Beautiful!.</h4>


			// 					<br /><br /><br />
			// 					<Row>

			// 						<Col sm={8}>
			// 							<h3><b>Here are the current registered locations to select from.</b></h3>
			// 							<MarkedMap
			// 								data={this.state}
			// 								google={this.props.google}
			// 								center={{ lat: 10.8231, lng: 106.6297 }}
			// 								height='400px'
			// 								zoom={8}>
			// 							</MarkedMap>
			// 						</Col>
			// 						<Col sm={4}>
			// 							<h3><b> Location List</b></h3>
			// 							<LocationList {...this.props} data={this.state} />
			// 						</Col>
			// 					</Row>

			// 					<ListGroup>{!this.state.isLoading}</ListGroup>
			// 				</div>
			// 			</div>
		);
	}

	render() {
		return <div className="Home">{this.props.isAuthenticated ? this.renderTest() : this.renderLander()}</div>;
	}
}