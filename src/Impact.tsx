/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="../typings/react-router/react-router.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/semver/semver.d.ts" />
/// <reference path="./Index.tsx" />

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
	static Mount(node: Element) {
		//var routes: Router.Route = (
		//<Route name="root" path="/" handler={Impact}>
		//	</Route>
        //);

		var html = <Impact/>
		React.render(html, node);
	}
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

		var logo =
		<div className="col-lg-10 col-lg-offset-1 centered">
			<img id="logo" src="img/logo_glossy.svg"/>
		</div>

		var content =
		<div className="input-group">
			<input type="text" className="form-control" value={term}
				placeholder="Search for..." onChange={this.handleChange.bind(this)}/>
			<span className="input-group-btn">
				<button className="btn btn-default" type="button">
					<span className="glyphicon glyphicon-search"></span>
				</button>
			</span>
		</div>;

		if (this.state.index==null) {
			content = <img width="50%" src="img/spinner.svg"/>
		}

		return (
			<div className="container-fluid">
				<div className="row">
					{logo}

					<div className="col-lg-4 col-lg-offset-4 col-md-8 col-md-offset-2 col-sm-12 centered">
						{content}
					</div>
				</div>

				<div className="list-group col-lg-6 col-lg-offset-3 rgroup col-md-12">
					{relems}
				</div>
            </div>
		);
	}
}
