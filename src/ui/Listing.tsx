import React = require('react');

import { ImpactIndex, Library, libhash } from '../impact/Index';

import { fullscreen } from "./Impact";

import Result = require('./Result');

class Props {
	public index: ImpactIndex;
	public wide: boolean;
}

class Component extends React.Component<Props, {}> {
	constructor() {
		super();
		this.state = {};
	}

	// Render our component
	render() {
		var index = this.props.index;

		// If we don't have an index yet, just return this
		if (index==null) {
			return <div className={fullscreen("centered")}>Loading...</div>
		}

		// Sort libraries
		var sf = (a: Library, b: Library) => b.stars - a.stars;
		var results = index.libraries.sort(sf);

		// Generate Result components for these results.
		var relems: JSX.Element[] = results.map((result: Library) => {
			var key = libhash(result)
			return <Result key={key} library={result}/>;
		});

		var classes = (this.props.wide ? "list-group padded" : fullscreen("list-group"))

		return (
			<div className="row">
				{results.length>0 ? 
				 <div className={classes}>
				 {relems}
				 </div> : null}
			</div>
		);
	}
}

export = Component;
