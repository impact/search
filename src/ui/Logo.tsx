import React = require('react');

import version = require('./version');

import { fullscreen } from './Impact';

class Props {
	public small: boolean = false;
}

class Component extends React.Component<Props, {}> {
	render() {
		var lead = (this.props.small ? null : 
			<div className={fullscreen("centered")}>
				<p className="lead">
					The Modelica Search Engine <span id="version">({version})</span>
				</p>
			</div>);
		var small = !this.props.small;
		var content = 
		<div className="row">
			<div className={fullscreen("centered")}>
				<img id="logo" className={this.props.small ? 'small' : null}
					src="img/logo_glossy.svg"/>
			</div>
			{ lead }
		</div>;

		return content;
	}
}

export = Component;
