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

				<div className="col-lg-12 centered">
				<img src="img/logo_glossy.svg"/>
				</div>

				<div className="col-lg-4 col-lg-offset-4 centered">
				<div className="input-group">
				<input type="text" className="form-control" placeholder="Search for..."/>
				<span className="input-group-btn">
				<button className="btn btn-default" type="button"><span className="glyphicon glyphicon-search"></span></button>
				</span>
				</div>
				</div>

				</div>
				</div>
		);
	}
}
