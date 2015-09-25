import $ = require('jquery');
import React = require('react');
import ReactRouter = require('react-router');

import Index = require("./Index");
import Result = require("./Result");
import Search = require("./Search");

function SortLibrary(a: Index.Library, b: Index.Library) {
	return b.stars - a.stars;
}

class RootState {
	// TODO: Make this a function that returns the index
	constructor() { }
}

export class Application extends React.Component<{}, RootState> {
	static Mount(node: Element) {
		var source = "http://impact.github.io/impact_index.json";

		$.get(source, (result) => {
			var Route = ReactRouter.Route;

			var SearchContent = React.createClass({
				render() {
					return <Search.Component index={result}/>;
				}
			});

			var routes =
			<Route handler={Application} path="/" name="root">
			<ReactRouter.DefaultRoute handler={SearchContent}/>
			</Route>

			ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
				React.render(<Handler/>, node);
			});
		})
	}

	constructor() {
	  	super();
		this.state = new RootState();
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
