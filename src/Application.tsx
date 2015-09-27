/// <reference path="../typings/node/node.d.ts"/>

// NPM Modules
import React = require('react');
import ReactRouter = require('react-router');

var csk = require('redux');

// Local Modules
import Index = require("./Index");
import Result = require("./Result");
import Search = require("./Search");
import State = require("./State");

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
				<ReactRouter.RouteHandler/>
			</div>
		);
	}
}
