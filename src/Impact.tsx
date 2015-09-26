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

function SortLibrary(a: Index.Library, b: Index.Library) {
	return b.stars - a.stars;
}

class RootState {
	// TODO: Make this a function that returns the index
	constructor() { }
}

// This is the read-only part of the interface
export interface Observable<S> {
	get(): S;
}

export interface Mutable<S> {
    update(v: S): void;
}

export class SubState<S> implements Observable<S>, Mutable<S> {
	private subscribers: Array<(nv: S, ov: S) => void>;
	constructor(private value: S) {
		this.subscribers = [];
	}
	update(v: S) {
		var old = this.value;
		this.value = v;
		this.subscribers.forEach((f) => { f(v, old) })
	}
	get(): S { return this.value; }
	notify(f: (nv: S, ov: S) => void) {
		this.subscribers.push(f);
	}
}

export class Store {
	private index: SubState<Index.ImpactIndex>;

	constructor() {
		this.index = new SubState(null);
	}

	getIndex(): Observable<Index.ImpactIndex> {
		return this.index;
	}

	load() {
		var source = "http://impact.github.io/impact_index.json";
		$.get(source, (result) => {
			this.index = result;
		})
	}
}

export class Application extends React.Component<{}, RootState> {
	static Mount(node: Element) {
		var store = new Store();
		store.load();

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
