import React = require('react');
import Index = require("./Index");

// This is the read-only part of the interface
export interface Observable<S> {
	get(): S;
	subscribe(f: (nv: S, ov: S) => void): void;
	register<P,S>(c: React.Component<P,S>, name: string): void;
}

export interface Mutable<S> {
    update(v: S): void;
}

export class SubState<S> implements Observable<S>, Mutable<S> {
	private subscribers: Array<(nv: S, ov: S) => void>;
	constructor(private value: S) {
		this.subscribers = [];
	}
	update(v: S) {
		var old = this.value;
		this.value = v;
		this.subscribers.forEach((f) => { f(v, old) })
	}
	get(): S { return this.value; }
	subscribe(f: (nv: S, ov: S) => void) {
		this.subscribers.push(f);
		f(this.value, null);
	}
	register<P,S>(c: React.Component<P,S>, name: string) {
		this.subscribe((v: any) => {
			var update: { [key: string]: any } = {}
			update[name] = v;
			console.log("Dispatching update: ", update);
			c.setState(<S>update);
		});
	}
}

export class Store {
	public index: SubState<Index.ImpactIndex>;
	public term: SubState<string>;

	constructor(public source?: string) {
		if (!source) {
			this.source = "/impact_index.json";
		}
		this.index = new SubState(null);
		this.term = new SubState("");
	}

	getIndex(): Observable<Index.ImpactIndex> {
		return this.index;
	}

	load() {
		$.get(this.source, (result) => {
			this.index.update(result);
		})
	}
}
