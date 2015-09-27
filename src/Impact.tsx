/// <reference path="../typings/node/node.d.ts"/>

// React
import React = require('react');

// Some elements and functions from react-router
import { Link, Route, DefaultRoute, HistoryLocation } from 'react-router';
import { run as runRouter } from 'react-router';


// Local Modules: TODO...use exports to avoid the extra level of structure
import { Store } from './Store';
import Application = require("./Application");
import Search = require("./Search");
import Listing = require("./Listing");

// This is the entry point for the whole application.  We are passed an element
// on which to attach the application.
export function Mount(node: Element) {
	// Create a store
	var store = new Store();

	store.load();

	// This component wrapper is necessary because of the way the router works.  When
	// implementing handlers, it isn't possible to specify props.  So we have to create
	// a new "factory" here that builds the component locally with props.  When can then
	// use this "wrapped" component with the router.
	var SearchContent = React.createClass({
		render() {
			return <div>
				<Search.Component index={store.index}
					term={store.term} updateTerm={(s) => store.updateTerm(s)}/>
			    <div className="centered">
					<Link to="all">All Libraries</Link>
				</div>
			</div>
		}
	});

	var ListingHandler = React.createClass({
		render() {
			return <Listing.Component index={store.index}/>;
		}
	});

	// Build our routes
	var routes =
	<Route handler={Application.Component} path="/" name="root">
	  <Route handler={ListingHandler} path="all" name="all"/>
	  <DefaultRoute handler={SearchContent}/>
	</Route>

	// Associate these routes with the application node
	runRouter(routes, HistoryLocation, function (Handler) {
		React.render(<Handler/>, node);
	});
}

