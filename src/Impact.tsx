/// <reference path="../typings/node/node.d.ts"/>

// React
import React = require('react');

// Some elements and functions from react-router
import { Route, DefaultRoute, HistoryLocation } from 'react-router';
import { run as runRouter } from 'react-router';

// Local Modules
import Application = require("./Application");
import Index = require("./Index");
import Result = require("./Result");
import Search = require("./Search");
import State = require("./State");

// This is the entry point for the whole application.  We are passed an element
// on which to attach the application.
export function Mount(node: Element) {
	// Create a store
	var store = new State.Store();

	// TODO: Formulate this as an event, not a method (if it makes sense)
	store.load();

	// This component wrapper is necessary because of the way the router works.  When
	// implementing handlers, it isn't possible to specify props.  So we have to create
	// a new "factory" here that builds the component locally with props.  When can then
	// use this "wrapped" component with the router.
	var SearchContent = React.createClass({
		render() {
			return <Search.Component index={store.getIndex()} term={store.term}/>;
		}
	});

	// Build our routes
	var routes =
	<Route handler={Application.Component} path="/" name="root">
	<DefaultRoute handler={SearchContent}/>
	</Route>

	// Associate these routes with the application node
	runRouter(routes, HistoryLocation, function (Handler) {
		React.render(<Handler/>, node);
	});
}

