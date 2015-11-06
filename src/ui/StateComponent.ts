import React = require('react');

import { Store } from 'redux';

interface Props<P,S> {
	store: Store<S>;
	pmap: (s: S) => P;
	elem: React.ComponentClass<P>;
}

// This component has a single property which is the store.  It then automatically
// keeps the components state in sync with the state of the store.
class StateComponent<P,S> extends React.Component<Props<P,S>, S> {
	constructor(props: Props<P,S>) {
		super(props);
		this.state = this.props.store.getState();
		this.props.store.subscribe(() => {
			this.state = this.props.store.getState();
		});
	}
	render() {
		var props = this.props.pmap(this.state);
		var e = React.createElement(this.props.elem, props)
		return e;
	}
}

export = StateComponent
