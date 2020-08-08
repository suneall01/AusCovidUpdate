import React from 'react';
import ReactDOM from 'react-dom';
import { Navigator, Page, Tabbar, Tab } from 'react-onsenui';
import Map from './Map';
import Table from './Table';
import Axios from 'axios';

//google key for map and geocoding
const googleKey = process.env.GOOGLE_KEY;

//tab class
class Tabs extends React.Component {
	constructor() {
		super();
		this.state = {
			records: [],
			lastIndex: 0
		};
	}

	// Get data 
	componentDidMount() {
		//url for data
		const url =
			'https://cors-anywhere.herokuapp.com/https://data.nsw.gov.au/data/api/3/action/datastore_search?resource_id=21304414-1ff1-4243-a5d2-f52778048b29';

		Axios.get(url)
			.then((result) => {
				if (result.data.success) {
					const data = result.data.result.records;
					if (data.length > 0) {
						this.convertGeoCode(data);
					} else {
						alert('No data');
					}
				}
			})
			.catch((error) => console.error('Error:', error.message));
	}
	//convert to geo coordinates
	convertGeoCode(data) {
		data.map((item) => {
			const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';
			const address = 'address=' + item.lga_name19.split(' ')[0] + '+' + item.lhd_2010_name + '+' + item.postcode;
			const apiKey = '&key=' + googleKey;
			const geocodeURL = baseUrl + address + apiKey;
			Axios.get(geocodeURL).then((result) => {
				//setting lat and lng and id to the results
				if (result.status == 200) {
					const val = result.data.results[0];
					item.name = val.formatted_address;
					item.lat = val.geometry.location.lat;
					item.lng = val.geometry.location.lng;
					item.id = this.state.lastIndex;
					this.setState({lastIndex: this.state.lastIndex + 1	})
					console.log(val.geometry.location.lat);
				}
				return item;
			});
			this.setState({ records: data });
		});
	}
	//function for rendering tabbar components
	renderTabs() {
		return [
			{
				content: <Map key="map"  data={this.state.records}  navigator={this.props.navigator} />,
				tab: <Tab key="map" label="Map" icon="ion-ios-home-outline" />
			},
			{
				content: <Table key="table" navigator={this.props.navigator} />,
				tab: <Tab key="table" label="Table" icon="ion-ios-albums-outline" />
			}
			
		];
	}
	//renders tab in screen
	render() {
		return (
			<Page>
				<Tabbar renderTabs={this.renderTabs.bind(this)} />
			</Page>
		);
	}
}
//app class
export default class App extends React.Component {
	//function for rendering page of the app
	renderPage(route, navigator) {
		const props = route.props || {};
		props.navigator = navigator;

		return React.createElement(route.component, props);
	}
	//render navigator with tab
	render() {
		return <Navigator initialRoute={{ component: Tabs }} renderPage={this.renderPage} />;
	}
}
