// NPM Modules
import React = require('react');

import { RouteHandler } from 'react-router';

export class Component extends React.Component<{}, {}> {
	constructor() {
	  	super();
	}

	render() {
		var logo =
		<div className="col-lg-10 col-lg-offset-1 centered">
			<img id="logo" src="img/logo_glossy.svg"/>
		</div>

		return (
			<div className="container-fluid">
				<div className="row">
					{logo}
				</div>
				<div className="row">
					<div className="col-lg-10 col-lg-offset-1 centered">
						<p className="lead">A Modelica Search Engine</p>
					</div>
				</div>
				<RouteHandler/>
			</div>
		);
	}
}
