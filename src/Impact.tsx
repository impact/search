/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />

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
	libraries: Array<Library>
}

class Result extends React.Component<{library: Library}, {}> {
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
		var versions: JSX.Element[] = vkeys.map((k): JSX.Element => {
			var vdata = lib.versions[k];
			var zip = vdata.zipball_url;
			return <span className="label label-success vspan">{k}</span>
			//return <button type="button" data-disable="true" className="btn btn-sm btn-default">{k}</button>
		});

		var header = <h4 className="list-group-item-heading">{name}</h4>;
		if (homepage!="") {
			header = <h4 className="list-group-item-heading"><a href={homepage}>{name}</a></h4>;
		}
		return <div className="list-group-item">
			<p className="pullright"><button type="button" className="btn btn-default btn-sm">Stars: {stars}</button></p>
			{header}
			<p className="list-group-item-text">{this.props.library.description}</p>
			<p>
			<div className="btn-group" role="group" aria-label="...">
			{versions}
			</div>
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
				if (inname) {
					this.results.push(lib);
				}
			});

			this.results = this.results.sort((a: Library, b: Library) => {
				return b.stars - a.stars;
			});
			// TODO: Set results
			console.log("Should search for term ", term);
			console.log("Results: ", this.results);
		}
		//console.log("New state", this);
	}
}

class Impact extends React.Component<{}, ImpactState> {
	constructor() {
	  	super();
		this.state = new ImpactState("", null);
	}

	componentDidMount() {
		//console.log("Mounted");

		// TODO: Make a prop
		var source = "http://impact.github.io/impact_index.json";

		//console.log("Loading");
		$.get(source, (result) => {
			this.setState(new ImpactState(this.state.term, result))
			console.log("Loaded");
		})
	}

	handleChange(event) {
		//console.log("this = ", this);
		//console.log("this.state = ", this.state);
		//console.log("Change: ", event);
		var term: string = event.target.value;
		//console.log("Term = ", term);
		//console.log("Current state = ", this.state);
		this.setState(new ImpactState(term, this.state.index))
	}

	render() {
		console.log("State at render: ", this.state);
		var term = this.state.term;
		console.log("Rendering with term ", term);
		var relems: JSX.Element[] = this.state.results.map((result) => {
			return <Result library={result}/>;
		});

		return (
				<div className="container-fluid">
				<div className="row">

				<div className="col-lg-12 centered">
				<img src="img/logo_glossy.svg"/>
				</div>

				<div className="col-lg-4 col-lg-offset-4 centered">

				<div className="input-group">
				<input type="text" className="form-control" value={term} placeholder="Search for..." onChange={this.handleChange.bind(this)}/>
				<span className="input-group-btn">
				<button className="btn btn-default" type="button"><span className="glyphicon glyphicon-search"></span></button>
				</span>
				</div>
				</div>


			    </div>

				<div className="list-group col-lg-8 col-lg-offset-2 rgroup">
				{relems}
				</div>

				</div>
		);
	}
}
