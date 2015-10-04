import React = require("react");
import semver = require('semver');

import { Link } from 'react-router';
import { Library } from './Index';

import { fullscreen } from './Impact';

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

		var header = <h2>{name}</h2>;
		var site: JSX.Element = null;
		if (homepage!="") {
			site =
			<h4>
				Homepage: <a href={homepage}>{homepage}</a>
			</h4>;
		}

		var rating =
		<h5 className="pullright">
			Rating: {stars} &nbsp;
			<span className="glyphicon glyphicon-star" aria-hidden="true"></span>
		</h5>;

		var back_button =
		<div className={fullscreen("rgroup")}>
			<Link to="root">
			<span className="glyphicon glyphicon-chevron-left"></span>Back
		</Link>
		</div>;

		return (
			<div id="details">
				<div id="iheader" className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<Link id="orglink" to="root">
					   <img id="logo" className="nav" src="img/logo_glossy.svg"/>
			        </Link>
				</div>

				<div className={fullscreen("rgroup")}>
					<div>
						{rating}
						{header}
						{site}
						<h4>Description</h4>
						<p>
							{this.props.library.description}
						</p>
						<h4>Versions</h4>
						<p className="centered">
							{versions}
						</p>
					</div>
				</div>
				{back_button}

			</div>);
	}
}

export = Component;
