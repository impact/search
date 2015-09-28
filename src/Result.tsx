import React = require("react");
import semver = require('semver');

import { Link } from 'react-router';
import { Library, libhash } from './Index';

function SortVersion(a: string, b: string) {
	if (semver.gt(a, b)) return -1;
	if (semver.lt(a, b)) return 1;
	return 0;
}

class Props {
	public key: string;
	public library: Library;
}

class Component extends React.Component<Props, {}> {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		var lib = this.props.library;
		var hash = libhash(lib);
		var name = lib.name;
		var homepage = lib.homepage;
		var stars = lib.stars;

		var vkeys = Object.keys(lib.versions).sort(SortVersion);

		var header = <h4 className="list-group-item-heading">{name}</h4>;
		if (homepage!="") {
			header =
			<h4 className="list-group-item-heading">
				<Link to="lib" params={{hash: hash}}>{name}</Link>
			</h4>;
		}

		var rating = 
		<span>
			{stars} <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
		</span>

		return <div className="list-group-item">
			<p className="pullright">
				{rating}
			</p>
			{header}
			<p className="list-group-item-text">
				{this.props.library.description}
			</p>
		</div>;
	}
}

export = Component;
