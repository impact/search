// React
import React = require('react');
import Addons = require('react/addons');

// Some elements and functions from react-router
import { Link, Route, DefaultRoute, HistoryLocation, HashLocation } from 'react-router';
import { run as runRouter } from 'react-router';
import { Library, ImpactIndex, libhash, findLibrary } from './Index';

// Local Modules
import Store = require('./Store');
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
	var store = new Store();

	// Trigger and asyncronous request to load the index
	store.load().then(() => {
		// At this point, the index is loaded.

		var index = store.index.get();

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
							<Search index={index}
								term={store.term} updateTerm={(s) => store.updateTerm(s)}/>
							<Hints show={true}/>
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
							<Listing index={index} wide={false}/>
						</div>);
				}
			});

		var EmbeddedHandler = React.createClass({
			render() {
				return <div><Listing index={index} wide={true}/></div>;
			}
		});

		var DetailedHandler = React.createClass({
			contextTypes: {
				router: React.PropTypes.func
			},

			render() {
				var params = this.context.router.getCurrentParams() as RouteParams;
				if (!index) return <span className="centered">Loading...</span>;

				var hash = params.hash;
				var library = findLibrary(index, hash);
				return <Detailed library={library}/>;
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
	});
}
