import React = require('react');
import { Store } from 'redux';

export interface SimpleStore<T> {
    getState(): T;
    subscribe(listener: () => void): () => void;
}

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

export function bindClass<P,S>(store: SimpleStore<S>,
							   elem: React.ComponentClass<P>,
							   pmap: (s: S) => P)
: React.ClassicComponentClass<{}> {
	var unsub: () => void = null;
	return React.createClass<{},S>({
		render(): React.ReactElement<{}> {
			console.log("Rendering bound class, state = ", this.state)
			var etype: React.ComponentClass<P> = elem;
			var props = pmap(this.state);
			return React.createElement(etype, props);
		},
		componentDidUnmount() {
			if (unsub!=null) {
				unsub();
			}
		},
		componentDidMount() {
			console.log("Bound class mounted");
			unsub = store.subscribe(() => {
				console.log("State of bound class updated to ", this.state)
				this.setState(store.getState());
			});
		},
		getInitialState(): S {
			return store.getState();
		}
	});
}
