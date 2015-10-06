import React = require('react');
import { Link } from 'react-router';

import { fullscreen } from './Impact';

class Props {
	public show: boolean = true;
}

class Component extends React.Component<Props, {}> {
	render() {
		var content = (this.props.show ?
		<div className="row">
			<div className={fullscreen("centered")}>
				<p className="hints">
				    <Link to="all">Display a list of all libraries</Link>
				</p>
			</div>
		</div> :
		null
	);
		return content;
	}
}

export = Component;
