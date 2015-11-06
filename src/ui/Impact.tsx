// React
import React = require('react');
import Addons = require('react/addons');

// react-redux/redux
import { Store, createStore } from 'redux';
import { Provider } from 'react-redux'

// Some elements and functions from react-router
import { Route, DefaultRoute, HistoryLocation, HashLocation } from 'react-router';
import { run as runRouter } from 'react-router';
import { Library, ImpactIndex, libhash, findLibrary } from '../impact/Index';

import { State, rootReducer } from '../redux/state';
import * as actions from '../redux/actions';

// Local Modules
import Application = require("./Application");
import StateComponent = require("./StateComponent");
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

interface ComponentBuilder<P,S> {
	(props?: P): React.Component<P,S>;
}

function BoundClass<P,S>(store: Store<S>, pmap: (s: S) => P, elem: React.ComponentClass<P>): React.ClassicComponentClass<{}> {
	return React.createClass<{},S>({
		render(): React.ReactElement<{}> {
			console.log("Rendering bound class, state = ", this.state)
			var etype: React.ComponentClass<P> = elem;
			var props = pmap(this.state);
			return React.createElement(etype, props);
		},
		componentDidMount() {
			console.log("Bound class mounted");
			store.subscribe(() => {
				console.log("State of bound class updated to ", this.state)
				this.setState(store.getState());
			});
		},
		getInitialState(): S {
			return store.getState();
		}
	});
}

/*
function Bind<S,P>(store: Store<S>, pmap: (s: S) => P, elem: React.ComponentClass<P>): React.ReactElement<P> {
	return React.createElement<P1>(StateComponent<P1,S1>, {store: store, pmap: pmap, elem: elem});
}
*/

// This is the entry point for the whole application.  We are passed an element
// on which to attach the application.
export function Mount(node: Element) {
	// Create a store
	var store = createStore(rootReducer);

	// Make an async call to fetch impact data and then dispatch a
	// loadIndex action if successful.
	var p = actions.load("http://impact.github.io/impact_index.json", store)

	var f: (typeof React.Component) = Search;
	var g: React.Component<any,any> = new Search();
	var h = React.createElement(f, null);
	//<StateComponent store={store} pmap={pmap} elem=Search>
	//var foo = <Search index={index} term={store.term} updateTerm={(s) => store.updateTerm(s)}/> 

	// This component wrapper is necessary because of the way the router works.  When
	// implementing handlers, it isn't possible to specify props.  So we have to create
	// a new "factory" here that builds the component locally with props.  When can then
	// use this "wrapped" component with the router.
	var SearchContent = React.createClass({
		render() {
			// TODO: fix bindings
			let pmap = (s: State) => {
				return {
					index: s.index,
					term: s.term,
					updateTerm: (s: string) => { store.dispatch(actions.setTerm(s)) }
				}
			}
			var f: (typeof React.Component) = Search;
			//<Search index={index} term={store.term} updateTerm={(s) => store.updateTerm(s)}/> 
			//<StateComponent store={store} pmap={pmap} elem={Search}/>
						
			var BoundSearch = BoundClass(store, pmap, Search)
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
	var ListingHandler = React.createClass({
		render() {
			// TODO: fix bindings
			//<Listing index={index} wide={false}/>
			return (
					<div>
					<Logo small={true}/>
					</div>);
		}
	});

	var EmbeddedHandler = React.createClass({
		// TODO: fix bindings
		//<Listing index={index} wide={true}/>
		render() {
			return <div></div>;
		}
	});

	var DetailedHandler = React.createClass({
		contextTypes: {
			router: React.PropTypes.func
		},

		render() {
			var params = this.context.router.getCurrentParams() as RouteParams;
			// TODO: fix bindings
			//if (!index) return <span className="centered">Loading...</span>;

			var hash = params.hash;
			// TODO: fix bindings
			//var library = findLibrary(index, hash);
			//return <Detailed library={library}/>;
			return <div></div>;
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
