import React = require('react');

// This is the read-only part of the interface (the part the
// components see).
export interface Observable<V> {
	get(): V;
	subscribe(f: (nv: V, ov: V) => void): void;
	link<S>(c: React.Component<any,S>, name: string): void;
	safelink<S>(c: React.Component<any,any>, f: (v: V) => S): void;
}

// This is the writable part that the actions can see.
export interface Mutable<V> {
    update(v: V): void;
}

// This class wraps any data in the Store to provide some useful
// functionality for components and actions.
export class SubState<V> implements Observable<V>, Mutable<V> {
	// This is a list of functions to call when the value of this
	// substate changes.  This is mainly used by the 'link' method.
	private subscribers: Array<(nv: V, ov: V) => void>;

	// A simple constructor
	constructor(private value: V) {
		// Initialize the list of subscribers to be empty
		this.subscribers = [];
	}

	// Update the value of this substate and notify any subscribers.
	update(v: V) {
		var old = this.value;
		this.value = v;
		this.subscribers.forEach((f) => { f(v, old) })
	}

	// Get the current value
	get(): V { return this.value; }

	// Associate a callback with this substate in case we need to be
	// notified it has changed.  Generally, a component should use the
	// link function rather than subscribe.
	subscribe(f: (nv: V, ov: V) => void) {
		this.subscribers.push(f);
		f(this.value, null);
	}

	// This links the value of this state to the named state of the
	// specified component.  Each time the value of this substate
	// changes, the specified component has its state updated
	// automatically.
	link<S>(c: React.Component<any,S>, name: string) {
		this.subscribe((nv: V, ov: V) => {
			var update: { [key: string]: any } = {}
			update[name] = nv;
			c.setState(<S>update);
		});
	}

	safelink<S>(c: React.Component<any,any>, f: (v: V) => S) {
		this.subscribe((v: V, ov: V) => {
			c.setState(f(v));
		})
	}
}

