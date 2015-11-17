import React = require('react');
import { Store } from 'redux';

// This is just a subset of the normal Store interface that doesn't
// deal with dispatching, etc.
export interface SimpleStore<T> {
    getState(): T;
    subscribe(listener: () => void): () => void;
}

// This class can be used to "reach inside" an existing Store<T> and
// grab data out.  But it gives the interface of a SimpleStore which
// is nice because it allows you to use bindClass on a *subset* of the
// total application state.
export class SubStore<P,C> implements SimpleStore<C> {
	constructor(protected store: SimpleStore<P>, protected smap: (s: P) => C) {
		
	}
	getState(): C {
		var parentState: P = this.store.getState();
		var childState: C = this.smap(parentState);
		return childState;
	}
	subscribe(listener: () => void): () => void {
		return this.store.subscribe(listener);
	}
}

// This is a really useful function.  It is analogous to the connect functionality
// in react-redux.  But I write it natively in Typescript because I think it is
// both clearer and more concise with respect to types.
//
// The basic idea here is that you can pass this a store, an existing
// component type, and a mapping function.  This will return a new
// component where all the properties are bound based on the
// properties returned by the pmap function.  The key thing is that
// these properties can be a function of the state of the store AND
// they will get updated whenever the store value changes.
export function bindClass<P,S>(store: SimpleStore<S>,
							   elem: React.ComponentClass<P>,
							   pmap: (s: S) => P)
: React.ClassicComponentClass<{}> {
	// A variable that will hold the value of our unsubscribe function once
	// the component is mounted.
	var unsub: () => void = null;

	// This creates a new ClassicComponentClass that renders the Component passed
	// in but also takes care of binding properties.
	return React.createClass<{},S>({
		render(): React.ReactElement<{}> {
			// Compute the properties of for this element.
			var props = pmap(this.state);
			// Then create a ReactElement for it with the properties bound.
			return React.createElement(elem, props);
		},
		componentWillUnmount() {
			// If the component gets unmounted, unsubscribe from the
			// store.
			if (unsub!=null) {
				unsub();
			}
		},
		componentDidMount() {
			// Subscribe to the store and record the unsubscribe function
			unsub = store.subscribe(() => {
				// Set the state.  Note that something must be binding
				// 'this' to the right thing when the spec is turned into
				// an actual component.
				this.setState(store.getState());
			});
			this.setState(store.getState());
		},
		getInitialState(): S {
			// Grab the initial state from the store
			return store.getState();
		}
	});
}
