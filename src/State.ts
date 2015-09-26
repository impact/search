import Index = require("./Index");

// This is the read-only part of the interface
export interface Observable<S> {
	get(): S;
	subscribe(f: (nv: S, ov: S) => void): void;
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
	}
}

export class Store {
	private index: SubState<Index.ImpactIndex>;

	constructor() {
		this.index = new SubState(null);
	}

	getIndex(): Observable<Index.ImpactIndex> {
		return this.index;
	}

	load() {
		var source = "http://impact.github.io/impact_index.json";
		$.get(source, (result) => {
			this.index.update(result);
		})
	}
}
