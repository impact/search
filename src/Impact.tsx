/// <reference path="../typings/node/node.d.ts"/>

// React
import React = require('react');

// Some elements and functions from react-router
import { Link, Route, DefaultRoute, HistoryLocation, HashLocation } from 'react-router';
import { run as runRouter } from 'react-router';
import { Library, ImpactIndex } from './Index';

// Local Modules
import Store = require('./Store');
import Application = require("./Application");
import Search = require("./Search");
import Listing = require("./Listing");
import Detailed = require("./Detailed");
import Logo = require("./Logo");

function findLibrary(index: ImpactIndex, uri: string, name: string): Library {
	var found: Library = null;
	index.libraries.forEach((lib: Library) => {
		if (lib.uri==uri && lib.name==name) {
			found = lib;
		}
	});
	return found;
}

export class RouteParams {
	uri: string;
	name: string;
}

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
			return (
				<div>
					<Logo small={false}/>

					<Search index={store.index}
						term={store.term} updateTerm={(s) => store.updateTerm(s)}/>
				</div>);
		}
	});

	// This is a wrapper around the Listing component that connections the index
	// to the component via properties.
	var ListingHandler = React.createClass({
		render() {
			return (
				<div>
					<Logo small={true}/>
					<Listing index={store.index} wide={false}/>
				</div>);
		}
	});

	var EmbeddedHandler = React.createClass({
		render() {
			return <div><Listing index={store.index} wide={true}/></div>;
		}
	});

	var DetailedHandler = React.createClass({
		contextTypes: {
			router: React.PropTypes.func
		},

		render() {
			var index = store.index.get();
			if (!index) return <span className="centered">Loading...</span>;

			var uri = this.context.router.getCurrentParams().uri;
			var name = this.context.router.getCurrentParams().name;
			console.log("uri = ", uri);
			console.log("name = ", name);
			var library = findLibrary(index, uri, name);
			return <Detailed library={library}/>;
		}
	});

	// Build our routes
	var routes =
	<Route handler={Application} path="/" name="root">
		<Route handler={ListingHandler} path="all" name="all"/>
		<Route handler={EmbeddedHandler} path="embedded" name="embedded"/>
		<Route handler={DetailedHandler} path="library/:uri/:name" name="lib"/>
		<DefaultRoute handler={SearchContent}/>
	</Route>;

	// Associate these routes with the application node
	runRouter(routes, HashLocation, function (Handler) {
		React.render(<Handler/>, node);
	});
}
