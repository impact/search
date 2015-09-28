import React = require("react");
import semver = require('semver');

import { Library } from './Index';

function SortVersion(a: string, b: string) {
	if (semver.gt(a, b)) return -1;
	if (semver.lt(a, b)) return 1;
	return 0;
}

class Props {
	  public library: Library;
}

class Component extends React.Component<Props, {}> {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		var lib = this.props.library;
		var name = lib.name;
		var homepage = lib.homepage;
		var stars = lib.stars;

		var vkeys = Object.keys(lib.versions).sort(SortVersion);

		var versions: JSX.Element[] = vkeys.map((k): JSX.Element => {
			var vdata = lib.versions[k];
			var zip = vdata.zipball_url;
			return <div key={k} className="label label-success vspan breaker">{k}</div>
		});

		var header = <h4>{name}</h4>;
		if (homepage!="") {
			header =
			<h3>
				<a href={homepage}>{name}</a>
			</h3>;
		}

		var rating = 
		<h5 className="pullright">
			Rating: {stars} &nbsp;
			<span className="glyphicon glyphicon-star" aria-hidden="true"></span>
		</h5>;

		return <div className="col-lg-6 col-lg-offset-3 rgroup col-md-12">
			<div>
				{rating}
				{header}
				<h4>Description</h4>
				<p>
					{this.props.library.description}
				</p>
				<h4>Versions</h4>
				<p className="centered">
					{versions}
				</p>
			</div>
		</div>;
	}
}

export = Component;
