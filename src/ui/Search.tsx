import React = require('react');

import Result = require("./Result");

import { ImpactIndex, Library, libhash } from '../impact/Index';

import { fullscreen } from './Impact';

import { computeResults } from '../impact/search';

// Search properties - This are simply objects that allow us to register
// our interest in specific substates and keep them automatically syncronized
// with this components state (see calls to 'register' below)
class Props {
	public index: ImpactIndex;
	public term: string;
	public updateTerm: (s: string) => void;
}

// A search component
class Component extends React.Component<Props, {}> {
	constructor() {
	  	super();
	}

	handleChange(event: JQueryEventObject) {
		var term: string = (event.target as any).value;
		this.props.updateTerm(term);
	}

	// Render our component
	render() {
		var term = this.props.term;
		var index = this.props.index;

		// If we don't have an index yet, just return this
		if (index==null) {
			return (
				<div className={fullscreen("centered")}>
					Loading...
				</div>
			);
		}

		// Compute search results
		var results = computeResults(this.props.term, index);

		// Generate Result components for these results.
		var relems: JSX.Element[] = results.map((result: Library) => {
			var key = libhash(result);
			return <Result key={key} library={result}/>;
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
		<div id="search" className="row">
			<div className={fullscreen("centered")}>
				{searchbox}
			</div>
			{results.length>0 ? 
			<div className={fullscreen("list-group", "rgroup")}>
				{relems}
			</div> : null}
		</div>

		return content
	}
}

export = Component;
