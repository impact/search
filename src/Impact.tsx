/// <reference path="../typings/node/node.d.ts"/>

// NPM Modules
import $ = require('jquery');
import React = require('react');
import ReactRouter = require('react-router');

var csk = require('redux');

// Local Modules
import Application = require("./Application");
import Index = require("./Index");
import Result = require("./Result");
import Search = require("./Search");
import State = require("./State");

export function Mount(node: Element) {
	var store = new State.Store();
	store.load();

	var Route = ReactRouter.Route;

	var SearchContent = React.createClass({
		render() {
			console.log("Factory has index as: ", store.getIndex());
			return <Search.Component index={store.getIndex()} term={store.term}/>;
		}
	});

	var routes =
	<Route handler={Application.Component} path="/" name="root">
	<ReactRouter.DefaultRoute handler={SearchContent}/>
	</Route>

	ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
		React.render(<Handler/>, node);
	});
}

