// React
import React = require('react');
import Addons = require('react/addons');

// react-redux/redux
import { createStore } from 'redux';

// Some elements and functions from react-router
import { Route, DefaultRoute, HistoryLocation, HashLocation } from 'react-router';
import { run as runRouter } from 'react-router';

// Stuff related to our global state
import { State, rootReducer } from '../redux/state';
import * as actions from '../redux/actions';
import { bindClass } from '../redux/connect.ts';

// Local Modules
import Application = require("./Application");
import Search = require("./Search");
import Listing = require("./Listing");
import Detailed = require("./Detailed");
import Logo = require("./Logo");
import Hints = require("./Hints");
import GithubRibbon = require("./GithubRibbon");

interface RouteParams {
	hash: string;
}

export function fullscreen(...names: string[]): string {
	var present: { [key: string]: boolean } = {};
	function spec(size: string, off: number) {
		var wid = 12-(2*off);
		present["col-"+size+"-"+wid] = true;
		present["col-"+size+"-offset-"+off] = true;
	}

	spec("lg", 4)
	spec("md", 2)
	spec("sm", 1)
	spec("xs", 1)

	names.forEach((k: string) => {
		present[k] = true;
	})

	return Addons.addons.classSet(present);
}

// This is the entry point for the whole application.  We are passed an element
// on which to attach the application.
export function Mount(node: Element) {
	// Create a store
	var store = createStore(rootReducer);

	// Make an async call to fetch impact data and then dispatch a
	// loadIndex action if successful.
	var p = actions.load("http://impact.github.io/impact_index.json", store)

	// This binds all props of this component.  In this case,
	// they are computed from the store state, but they don't
	// really have to be.
	var BoundSearch = bindClass(store, Search, (s: State) => {
		return {
			index: s.index,
			term: s.term,
			updateTerm: (s: string) => { store.dispatch(actions.setTerm(s)) }
		}
	});

	// This component wrapper is necessary because of the way the router works.  When
	// implementing handlers, it isn't possible to specify props.  So we have to create
	// a new "factory" here that builds the component locally with props.  When can then
	// use this "wrapped" component with the router.
	var SearchContent = React.createClass({
		render() {

			return (
					<div>
					<GithubRibbon/>
					<Logo small={false}/>
					<BoundSearch/>
					<Hints show={true}/>
					</div>);
		}
	});

	// This is a wrapper around the Listing component that connections the index
	// to the component via properties.
	var BoundListing = bindClass(store, Listing, (s: State) => {
		return {
			index: s.index,
			wide: false
		}
	});
	var ListingHandler = React.createClass({
		render() {
			return (
					<div>
					<Logo small={true}/>
					<BoundListing/>
					</div>);
		}
	});


	var BoundListing = bindClass(store, Listing, (s: State) => {
		return {
			index: s.index,
			wide: true
		}
	});

	var EmbeddedHandler = React.createClass({
		render() {
			return <BoundListing/>;
		}
	});

	var DetailedHandler = React.createClass({
		contextTypes: {
			router: React.PropTypes.func
		},

		render() {
			var params = this.context.router.getCurrentParams() as RouteParams;
			var BoundDetails = bindClass(store, Detailed, (s: State) => {
				return {
					hash: params.hash,
					index: s.index
				}
			});
			return <BoundDetails/>;
		}
	});

	// Build our routes
	var routes =
		<Route handler={Application} path="/" name="root">
		<Route handler={ListingHandler} path="all" name="all"/>
		<Route handler={EmbeddedHandler} path="embedded" name="embedded"/>
		<Route handler={DetailedHandler} path="library/:hash" name="lib"/>
		<DefaultRoute handler={SearchContent}/>
		</Route>;

	// Associate these routes with the application node
	runRouter(routes, HashLocation, function (Handler) {
		React.render(<Handler/>, node);
	});
}
