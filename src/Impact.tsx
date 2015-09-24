import $ = require('jquery');
import React = require('react');
import ReactRouter = require('react-router');

import Index = require("./Index");
import Result = require("./Result");

function SortLibrary(a: Index.Library, b: Index.Library) {
	return b.stars - a.stars;
}

class ImpactState {
	public results: Array<Index.Library>;

	constructor(public term: string, public index: Index.ImpactIndex) {
		// TODO: Compute results
		this.results = [];

		if (index==null) return;
		if (term=="" || term==null) return;

		if (term=="*") {
			this.results = this.index.libraries.sort(SortLibrary);
			return;
		}

		// If we have an index and a term, compute results
		var t = term.toLowerCase();

		this.index.libraries.forEach((lib) => {
			var inname = lib.name.toLowerCase().indexOf(t)>-1;
			var indesc = lib.description.toLowerCase().indexOf(t)>-1;

			if (inname || indesc) {
				this.results.push(lib);
			}
		});

		this.results.sort(SortLibrary);
	}
}

export class Application extends React.Component<{}, ImpactState> {
	static Mount(node: Element) {
		var routes =
		<ReactRouter.Route name="root" path="/" handler={Application}>
		</ReactRouter.Route>;

		//var router = ReactRouter.createRoutes(routes)
		//console.log("ReactRouter = ", ReactRouter);

		//ReactRouter.Router.run(routes, function (Handler: new() => React.Component<any, any>) {
		//  React.render(<Handler/>, node);
		//});
		var html = <Application/>;
		React.render(html, node);
	}

	constructor() {
	  	super();
		this.state = new ImpactState("", null);
	}

	componentDidMount() {
		// TODO: Make a prop
		var source = "http://impact.github.io/impact_index.json";

		$.get(source, (result) => {
			this.setState(new ImpactState(this.state.term, result))
		})
	}

	handleChange(event: JQueryEventObject) {
		var term: string = (event.target as any).value;
		this.setState(new ImpactState(term, this.state.index))
	}

	render() {
		var term = this.state.term;
		var relems: JSX.Element[] = this.state.results.map((result: Index.Library) => {
			var key: string = result.uri+" "+result.name;
			return <Result.Component key={key} library={result}/>;
		});

		var logo =
		<div className="col-lg-10 col-lg-offset-1 centered">
			<img id="logo" src="img/logo_glossy.svg"/>
		</div>

		var setFocus = (c: any) => {
			var node = React.findDOMNode(c) as any;
			if (node) {
				node.focus();
			}
		}

		var searchbox =
		<div className="input-group">
			<input ref={setFocus} type="text" className="form-control" value={term}
				placeholder="Search for..." onChange={this.handleChange.bind(this)}/>
			<span className="input-group-btn">
				<button className="btn btn-default" type="button">
					<span className="glyphicon glyphicon-search"></span>
				</button>
			</span>
		</div>;

		var content =
		<div className="row">
			<div className="col-lg-4 col-lg-offset-4 col-md-8 col-md-offset-2 col-sm-12 centered">
				{searchbox}
			</div>
			{this.state.results.length>0 ? 
			<div className="list-group col-lg-6 col-lg-offset-3 rgroup col-md-12">
				{relems}
			</div> : null}
		</div>

		if (this.state.index==null) {
			content = null
		}

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
				{content}
			</div>
		);
	}
}
