/// <reference path="../typings/node/node.d.ts"/>

// React
import React = require('react');

// Some elements and functions from react-router
import { Link, Route, DefaultRoute, HistoryLocation, HashLocation } from 'react-router';
import { run as runRouter } from 'react-router';


// Local Modules
import Store = require('./Store');
import Application = require("./Application");
import Search = require("./Search");
import Listing = require("./Listing");
import Detailed = require("./Detailed");

// This is the entry point for the whole application.  We are passed an element
// on which to attach the application.
export function Mount(node: Element) {
	// Create a store
	var store = new Store();

	// Trigger and asyncronous request to load the index
	store.load();

	// This component wrapper is necessary because of the way the router works.  When
	// implementing handlers, it isn't possible to specify props.  So we have to create
	// a new "factory" here that builds the component locally with props.  When can then
	// use this "wrapped" component with the router.
	var SearchContent = React.createClass({
		render() {
			return <div>
				<Search index={store.index}
					term={store.term} updateTerm={(s) => store.updateTerm(s)}/>
			    <div className="centered">
					<Link to="all">All Libraries</Link>
				</div>
			</div>
		}
	});

	// This is a wrapper around the Listing component that connections the index
	// to the component via properties.
	var ListingHandler = React.createClass({
		render() {
			return <Listing index={store.index}/>;
		}
	});

	var DetailedHandler = React.createClass({
		render() {
			return <Detailed library={null}/>;
		}
	});

	// Build our routes
	var routes =
	<Route handler={Application} path="/" name="root">
	<Route handler={ListingHandler} path="all" name="all"/>
	<Route handler={DetailedHandler} path="library/:uri/:name" name="lib"/>
	  <DefaultRoute handler={SearchContent}/>
	</Route>

	// Associate these routes with the application node
	runRouter(routes, HashLocation, function (Handler) {
		React.render(<Handler/>, node);
	});
}
