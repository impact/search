import React = require('react');

import { Observable } from './State';
import { ImpactIndex, Library } from './Index';

import Result = require('./Result');

class Props {
	public index: Observable<ImpactIndex>;
}

interface State {
	index?: ImpactIndex;
}

class Component extends React.Component<Props, State> {
	constructor() {
		super();
		this.state = {};
	}

	componentDidMount() {
		this.props.index.safelink(this, (v): State => { return { index: v }})
	}

	// Render our component
	render() {
		var index = this.state.index;

		// If we don't have an index yet, just return this
		if (index==null) {
			return <div className="col-lg-12 centered">Loading...</div>
		}

		// Sort libraries
		var sf = (a: Library, b: Library) => b.stars - a.stars;
		var results = index.libraries.sort(sf);

		// Generate Result components for these results.
		var relems: JSX.Element[] = results.map((result: Library) => {
			var key: string = result.uri+" "+result.name;
			return <Result key={key} library={result}/>;
		});

		// The complete HTML for this component
		var content =
		<div className="row">
		{results.length>0 ? 
			<div className="list-group col-lg-6 col-lg-offset-3 rgroup col-md-12">
				{relems}
			</div> : null}
		</div>

		return content
	}
}

export = Component;
