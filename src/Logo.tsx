import React = require('react');

import version = require('./version');

class Props {
	public small: boolean = false;
}

class Component extends React.Component<Props, {}> {
	render() {
		var lead = (this.props.small ? null : 
			<div className="col-lg-10 col-lg-offset-1 centered">
				<p className="lead">
					A Modelica Search Engine <span id="version">({version})</span>
				</p>
			</div>);
		var small = !this.props.small;
		var content = 
		<div className="row">
			<div className="col-lg-10 col-lg-offset-1 centered">
				<img id="logo" className={this.props.small ? 'small' : null}
					src="img/logo_glossy.svg"/>
			</div>
			{ lead }
		</div>;

		return content;
	}
}

export = Component;
