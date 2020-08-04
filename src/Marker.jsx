import React from 'react';
import '../src/css/Marker.css';
//component for current location i.e. Current location Marker
const Marker = (props) => {
	const { color, name, key } = props;
	return (
		<div>
			<div className="pin bounce" style={{ backgroundColor: color, cursor: 'pointer' }} title={name} />
			<div className="pulse" />
		</div>
	);
};

export default Marker;
