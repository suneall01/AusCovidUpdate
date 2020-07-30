import React from 'react';
import ReactDOM from 'react-dom';
import { Page, Button, Toolbar } from 'react-onsenui';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const googleKey = 'AIzaSyBEBd4P9XdqxUpxFKemiwztVyVHsdeohDw';
const getMapOptions = (maps) => {
  return {
    disableDefaultUI: true,
    mapTypeControl: true,
    streetViewControl: true,
    styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
  };
};

class App extends React.Component {
	constructor(props) {
		super(props);
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
		console.log('latitude is ' + position);
	}

	onMapError(error) {
		alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}

	renderToolbar() {
		return (
			<Toolbar>
				<div className="center">Covid19Update</div>
			</Toolbar>
		);
	}

	render() {
		return (
			<Page renderToolbar={this.renderToolbar}>
				<div style={{ height: '100vh', width: '100%' }}>
					<GoogleMapReact
						bootstrapURLKeys={{ key: googleKey }}
						defaultCenter={this.state.currentPosition}
            defaultZoom={11}
            options={getMapOptions}
					>
						<Marker lat={this.state.currentPosition.lat} lng={this.state.currentPosition.lng} name="My Marker" color="#707ED7"/>
					</GoogleMapReact>
				</div>
			</Page>
		);
	}
}

// App.defaultProps = {
// 	center: {
// 		lat: 59.95,
// 		lng: 30.33
// 	},
// 	zoom: 11
// };

export default App;
