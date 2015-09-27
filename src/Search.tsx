import React = require('react');

// TODO: use exports inside this
import Result = require("./Result");

import { ImpactIndex, Library } from './Index';
import { Observable } from './State';

// This function takes a given search term (as a string) and an index structure
// and returns a list of libraries that match the search term.
function computeResults(term: string, index: ImpactIndex): Library[] {
	// TODO: Compute results
	var results: Library[] = [];
	var sf = (a: Library, b: Library) => b.stars - a.stars;

	if (index==null) return results;
	if (term=="" || term==null) return results;

	if (term=="*") {
		results = index.libraries.sort(sf);
		return results;
	}

	// If we have an index and a term, compute results
	// TODO: Tokenize and trim and then do an "and" across terms
	var t = term.toLowerCase();

	index.libraries.forEach((lib: Library) => {
		var inname = lib.name.toLowerCase().indexOf(t)>-1;
		var indesc = lib.description.toLowerCase().indexOf(t)>-1;

		if (inname || indesc) {
			results.push(lib);
		}
	});

	results.sort(sf);
	return results;
}

// Search properties - This are simply objects that allow us to register
// our interest in specific substates and keep them automatically syncronized
// with this components state (see calls to 'register' below)
class SearchProps {
	public index: Observable<ImpactIndex>;
	public term: Observable<string>;
}

// This mirrors the contents of "SearchProps" to show the actual states.
// This cannot have methods because React will strip them on its internal
// representation.
// TODO: Make an interface?
class SearchState {
	constructor(public term: string, public index: ImpactIndex) { }
}

// A search component
export class Component extends React.Component<SearchProps, SearchState> {
	constructor() {
	  	super();
		// Not really necessary since this will be updated as soon as we
		// register our states with the Store.
		this.state = new SearchState("", null);
	}

	componentDidMount() {
		// Ask the store to automatically update our states when changes
		// occur.
		this.props.index.link(this, "index");
		this.props.term.link(this, "term");
	}

	// TODO: Use an action here...
	handleChange(event: JQueryEventObject) {
		var term: string = (event.target as any).value;
		this.setState(new SearchState(term, this.state.index));
	}

	// Render our component
	render() {
		var term = this.state.term;
		var index = this.state.index;

		// If we don't have an index yet, just return this
		if (index==null) {
			return <div className="log-lg-6 col-lg-offset-3 centered">Loading...</div>
		}

		// Compute search results
		var results = computeResults(this.state.term, index);

		// Generate Result components for these results.
		var relems: JSX.Element[] = results.map((result: Library) => {
			var key: string = result.uri+" "+result.name;
			return <Result.Component key={key} library={result}/>;
		});

		// The HTML for the search box
		var searchbox =
		<div className="input-group">
			<input autoFocus={true} type="text" className="form-control" value={term}
				placeholder="Search for..." onChange={this.handleChange.bind(this)}/>
			<span className="input-group-btn">
				<button className="btn btn-default" type="button">
					<span className="glyphicon glyphicon-search"></span>
				</button>
			</span>
		</div>;

		// The complete HTML for this component
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

		return content
	}
}
