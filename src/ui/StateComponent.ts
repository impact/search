import React = require('react');

import { Store } from 'redux';

interface Props<S> {
	store: Store<S>
}

// This component has a single property which is the store.  It then automatically
// keeps the components state in sync with the state of the store.
class StateComponent<S> extends React.Component<Props<S>, S> {
	constructor(props: Props<S>) {
		super(props);
		this.state = this.props.store.getState();
		this.props.store.subscribe(() => {
			this.state = this.props.store.getState();
			console.log("Updating state to ", this.state);
		});
	}
}

export = StateComponent
