import React = require('react');
import Index = require("./Index");
import Result = require("./Result");
import State = require("./State");

function SortLibrary(a: Index.Library, b: Index.Library) {
	return b.stars - a.stars;
}

function computeResults(term: string, index: Index.ImpactIndex): Index.Library[] {
	// TODO: Compute results
	var results: Index.Library[] = [];

	if (index==null) return results;
	if (term=="" || term==null) return results;

	if (term=="*") {
		results = index.libraries.sort(SortLibrary);
		return results;
	}

	// If we have an index and a term, compute results
	var t = term.toLowerCase();

	index.libraries.forEach((lib: Index.Library) => {
		var inname = lib.name.toLowerCase().indexOf(t)>-1;
		var indesc = lib.description.toLowerCase().indexOf(t)>-1;

		if (inname || indesc) {
			results.push(lib);
		}
	});

	results.sort(SortLibrary);
	return results;
}

class SearchProps {
	public index: State.Observable<Index.ImpactIndex>;
}

class SearchState {
	constructor(public term: string) { }
}

export class Component extends React.Component<SearchProps, SearchState> {
	constructor() {
	  	super();
		this.state = new SearchState("");
	}

	componentDidMount() {
		console.log("When mounted, props = ", this.props);
		this.props.index.subscribe((v) => {
			console.log("Notified of change in index to ", v);
			this.forceUpdate();
		})
	}

	handleChange(event: JQueryEventObject) {
		var term: string = (event.target as any).value;
		this.setState(new SearchState(term))
	}

	render() {
		console.log("Rendering Search");
		var term = this.state.term;
		var index = this.props.index.get();

		console.log("index value = ", index);
		var results = computeResults(this.state.term, index);

		var relems: JSX.Element[] = results.map((result: Index.Library) => {
			var key: string = result.uri+" "+result.name;
			return <Result.Component key={key} library={result}/>;
		});

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
			{results.length>0 ? 
			<div className="list-group col-lg-6 col-lg-offset-3 rgroup col-md-12">
				{relems}
			</div> : null}
		</div>

		if (this.props.index==null) {
			content = <div className="log-lg-6 col-lg-offset-3 centered">Loading...</div>
		}

		return content
	}
}
