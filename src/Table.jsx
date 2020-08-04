import React from 'react';
import { Page, Toolbar, Row, Col } from 'react-onsenui';
import Axios from 'axios';
//table class
export default class Table extends React.Component {
	constructor() {
		super();
		//state of app
		this.state = {
			records: [],
			lastIndex: 0
		};
	}
	//fetch data from NSW website using axios library
	componentDidMount() {
		const url =
			'https://cors-anywhere.herokuapp.com/https://data.nsw.gov.au/data/api/3/action/datastore_search?resource_id=21304414-1ff1-4243-a5d2-f52778048b29&limit=35';

		Axios.get(url)
			.then((result) => {
				if (result.data.success) {
					const data = result.data.result.records;
					if (data.length > 0) {
						data.map((item) => {
							item.id = this.state.lastIndex;
							this.setState({ lastIndex: this.state.lastIndex + 1 });
							return item;
						});
						this.setState({ records: data });
					} else {
						alert('No data');
					}
				}
			})
			.catch((error) => console.error('Error:', error.message));
	}
	//renders toolbar
	renderToolbar() {
		return (
			<Toolbar>
				<div className="center">Table</div>
			</Toolbar>
		);
	}
	//renders screen
	render() {
		console.log('table');
		return (
			//whole screen page
			<Page renderToolbar={this.renderToolbar}>
				<div>
					//header for table
					<Row>
						<Col>Date</Col>
						<Col>PostCode</Col>
						<Col>lhd_code </Col>
						<Col>lhd_name </Col>
						<Col>lga_code </Col>
						<Col>lga_name </Col>
					</Row>
					//covid case list transfered into table form
					{this.state.records.map((item) => (
						<div key={item.id}>
							<Row>
								<Col>{item.notification_date}</Col>
								<Col>{item.postcode}</Col>
								<Col>{item.lhd_2010_code}</Col>
								<Col>{item.lhd_2010_name}</Col>
								<Col>{item.lga_code19}</Col>
								<Col>{item.lga_name19}</Col>
							</Row>
						</div>
					))}
				</div>
			</Page>
		);
	}
}
