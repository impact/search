import React = require('react');

// This is the read-only part of the interface (the part the
// components see).
export interface Observable<S> {
	get(): S;
	subscribe(f: (nv: S, ov: S) => void): void;
	link<P,S>(c: React.Component<P,S>, name: string): void;
}

// This is the writable part that the actions can see.
export interface Mutable<S> {
    update(v: S): void;
}

// This class wraps any data in the Store to provide some useful
// functionality for components and actions.
export class SubState<S> implements Observable<S>, Mutable<S> {
	// This is a list of functions to call when the value of this
	// substate changes.  This is mainly used by the 'link' method.
	private subscribers: Array<(nv: S, ov: S) => void>;

	// A simple constructor
	constructor(private value: S) {
		// Initialize the list of subscribers to be empty
		this.subscribers = [];
	}

	// Update the value of this substate and notify any subscribers.
	update(v: S) {
		var old = this.value;
		this.value = v;
		this.subscribers.forEach((f) => { f(v, old) })
	}

	// Get the current value
	get(): S { return this.value; }

	// Associate a callback with this substate in case we need to be
	// notified it has changed.  Generally, a component should use the
	// link function rather than subscribe.
	subscribe(f: (nv: S, ov: S) => void) {
		this.subscribers.push(f);
		f(this.value, null);
	}

	// This links the value of this state to the named state of the
	// specified component.  Each time the value of this substate
	// changes, the specified component has its state updated
	// automatically.
	link<P,S>(c: React.Component<P,S>, name: string) {
		this.subscribe((v: any) => {
			var update: { [key: string]: any } = {}
			update[name] = v;
			c.setState(<S>update);
		});
	}
}

