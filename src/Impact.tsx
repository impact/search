/// <reference path="../typings/node/node.d.ts"/>

// NPM Modules
import $ = require('jquery');
import React = require('react');
import ReactRouter = require('react-router');

var csk = require('redux');

// Local Modules
import Index = require("./Index");
import Result = require("./Result");
import Search = require("./Search");
import State = require("./State");

function SortLibrary(a: Index.Library, b: Index.Library) {
	return b.stars - a.stars;
}

export class Application extends React.Component<{}, {}> {
	static Mount(node: Element) {
		var store = new State.Store();
		store.load();

		var Route = ReactRouter.Route;

		var SearchContent = React.createClass({
			render() {
				console.log("Factory has index as: ", store.getIndex());
				return <Search.Component index={store.getIndex()}/>;
			}
		});

		var routes =
		<Route handler={Application} path="/" name="root">
		<ReactRouter.DefaultRoute handler={SearchContent}/>
		</Route>

		ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
			React.render(<Handler/>, node);
		});
	}

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
