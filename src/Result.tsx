import Index = require("./Index");
import React = require("react");
import semver = require('semver');

function SortVersion(a: string, b: string) {
	if (semver.gt(a, b)) return -1;
	if (semver.lt(a, b)) return 1;
	return 0;
}

export class Component extends React.Component<{key: string, library: Index.Library}, {}> {
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

		var header = <h4 className="list-group-item-heading">{name}</h4>;
		if (homepage!="") {
			header =
			<h4 className="list-group-item-heading">
				<a href={homepage}>{name}</a>
			</h4>;
		}

		var rating = 
		<button type="button" className="btn btn-default btn-sm">
			Stars: {stars}
		</button>

		return <div className="list-group-item">
			<p className="pullright">
				{rating}
			</p>
			{header}
			<p className="list-group-item-text">
				{this.props.library.description}
			</p>
			<p className="centered">
				{versions}
			</p>
		</div>;
	}
}
