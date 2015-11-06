import React = require('react');

import { Store } from 'redux';
import { State } from '../redux/state';

interface Props {
	store: Store<State>
}

class Dummy extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = this.props.store.getState();
		this.props.store.subscribe(() => {
			this.state = this.props.store.getState();
			console.log("Updating state to ", this.state);
		});
	}
	componentDidMount() {
		console.log("Mounted");
		/*
		store.subscribe(() => {
		});
		*/
	}
	render() {
		return <span>Hello</span>;
	}
}

export = Dummy
