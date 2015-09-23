/// <reference path="../typings/react/react-global.d.ts" />

class ImpactState {
	  constructor(public term: string) {}
}

class Impact extends React.Component<{}, ImpactState> {
	  constructor() {
	  	  super();
		  this.state = new ImpactState("");
	  }

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
				<div className="jumbotron col-lg-6 col-lg-offset-3">
				<img src="img/logo_glossy.svg"/>
				<p>...</p>
				<p>
				<a className="btn btn-primary btn-lg" href="#"
			role="button">Learn more</a></p>
				</div>
				</div>
				</div>
		);
	}
}
