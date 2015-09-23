/// <reference path="./Index.tsx" />

class Result extends React.Component<{key: string, library: Library}, {}> {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		var lib = this.props.library;
		var name = lib.name;
		var homepage = lib.homepage;
		var stars = lib.stars;

		var vkeys = Object.keys(lib.versions);
		//var vlist = vkeys.map((k) => lib.versions[k]).sort(SortVersion)

		var versions: JSX.Element[] = vkeys.map((k): JSX.Element => {
			var vdata = lib.versions[k];
			var zip = vdata.zipball_url;
			return <div key={k} className="label label-success vspan breaker">{k}</div>
		});

		var header = <h4 className="list-group-item-heading">{name}</h4>;
		if (homepage!="") {
			header = <h4 className="list-group-item-heading"><a href={homepage}>{name}</a></h4>;
		}
		return <div className="list-group-item">
			<p className="pullright">
              <button type="button" className="btn btn-default btn-sm">
                Stars: {stars}
              </button>
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
