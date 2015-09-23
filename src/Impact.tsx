/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/semver/semver.d.ts" />

interface Dependency {
	name: string;
	version: string;
}

interface Version {
	version: string;
	tarball_url: string;
	zipball_url: string;
	path: string;
	isfile: boolean;
	dependencies: Array<Dependency>;
	sha: string;
}

interface Library {
	name: string;
	uri: string;
	versions: { [version: string]: Version };
	owner_uri: string;
	email: string;
	homepage: string;
	repository_uri: string;
	repository_format: string;
	description: string;
	stars: number;
}

interface ImpactIndex {
	version: string;
	libraries: Array<Library>;
}

function SortLibrary(a: Library, b: Library) {
	return b.stars - a.stars;
}

/*
function SortVersion(a: Version, b: Version) {
	if (semver.gt(a, b)) return 1;
	if (semver.lt(a, b)) return -1;
	return 0;
}
*/

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

class ImpactState {
	public results: Array<Library>;

	constructor(public term: string, public index: ImpactIndex) {
		// TODO: Compute results
		this.results = [];

		// If we have an index and a term, compute results
		if (index!=null && term!="" && term!=null) {
			var t = term.toLowerCase();

			this.index.libraries.forEach((lib) => {
				var inname = lib.name.toLowerCase().indexOf(t)>-1;
				var indesc = lib.description.toLowerCase().indexOf(t)>-1;

				if (inname || indesc) {
					this.results.push(lib);
				}
			});

			this.results.sort(SortLibrary);
		}
	}
}

class Impact extends React.Component<{}, ImpactState> {
	constructor() {
	  	super();
		this.state = new ImpactState("", null);
	}

	componentDidMount() {
		// TODO: Make a prop
		var source = "http://impact.github.io/impact_index.json";

		$.get(source, (result) => {
			this.setState(new ImpactState(this.state.term, result))
		})
	}

	handleChange(event) {
		var term: string = event.target.value;
		this.setState(new ImpactState(term, this.state.index))
	}

	render() {
		var term = this.state.term;
		var relems: JSX.Element[] = this.state.results.map((result: Library) => {
			var key: string = result.name;
			return <Result key={key} library={result}/>;
		});

		return (
			<div className="container-fluid">
              <div className="row">
				<div className="col-lg-10 col-lg-offset-1 centered">
				  <img src="img/logo_glossy.svg"/>
				</div>

				<div className="col-lg-4 col-lg-offset-4 col-md-8 col-md-offset-2 col-sm-12 centered">

				  <div className="input-group">
				    <input type="text" className="form-control" value={term}
                           placeholder="Search for..." onChange={this.handleChange.bind(this)}/>
				    <span className="input-group-btn">
				      <button className="btn btn-default" type="button">
                        <span className="glyphicon glyphicon-search"></span>
                      </button>
                    </span>
				  </div>
				</div>
              </div>

              <div className="list-group col-lg-6 col-lg-offset-3 rgroup col-md-12">
				{relems}
              </div>
            </div>
		);
	}
}
