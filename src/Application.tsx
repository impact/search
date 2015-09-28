// NPM Modules
import React = require('react');

import { RouteHandler } from 'react-router';

class Component extends React.Component<{}, {}> {
	constructor() {
	  	super();
	}

	render() {
		return (
			<div id="appdiv" className="container-fluid">
				<RouteHandler/>
			</div>
		);
	}
}

export = Component;
