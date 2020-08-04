import React from 'react';
import ReactDOM from 'react-dom';
import { Page, Toolbar } from 'react-onsenui';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import Circle from './Circle';

const googleKey = 'AIzaSyBEBd4P9XdqxUpxFKemiwztVyVHsdeohDw';
const getMapOptions = (maps) => {
	return {
		disableDefaultUI: true,
		mapTypeControl: true,
		streetViewControl: true,
		styles: [ { featureType: 'poi', elementType: 'labels', stylers: [ { visibility: 'on' } ] } ]
	};
};
//map class
export default class Map extends React.Component {
	constructor() {
		super();
		this.state = {
			currentPosition: {}
		};
		this.onMapSuccess = this.onMapSuccess.bind(this);
		this.onMapError = this.onMapError.bind(this);
	}

	// Get geo coordinates
	componentDidMount() {
		if ('geolocation' in navigator) {
			console.log('Available');
			navigator.geolocation.getCurrentPosition(this.onMapSuccess, this.onMapError, { enableHighAccuracy: true });
		} else {
			console.log('Not Available');
		}
	}

	// Success callback for get geo coordinates
	onMapSuccess(position) {
		const center = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};

		this.setState({
			currentPosition: center
		});
		console.log('latitude is ' + position.coords.latitude);
	}
	//error callback
	onMapError(error) {
		alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}
	//render toolbar
	renderToolbar() {
		return (
			<Toolbar>
				<div className="center">Covid19 Update</div>
			</Toolbar>
		);
	}

	//renders screen
	render() {
		return (
			//whole screen page
			<Page renderToolbar={this.renderToolbar}>
				//full screen for google map
				<div style={{ height: '100vh', width: '100%' }}>
					<GoogleMapReact
						bootstrapURLKeys={{ key: googleKey }}
						defaultCenter={this.state.currentPosition}
						defaultZoom={11}
					>
						//current location marker
						<Marker
							lat={this.state.currentPosition.lat}
							lng={this.state.currentPosition.lng}
							name="My Marker"
							color="#707ED7"
						/>
						//other covid case markers list
						{this.props.data.map((item) => (
							<Circle key={item.id} lat={item.lat} lng={item.lng} name={item.name} color="red" />
						))}
					</GoogleMapReact>
				</div>
			</Page>
		);
	}
}
