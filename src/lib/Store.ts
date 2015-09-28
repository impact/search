import { ImpactIndex } from './Index';
import { SubState, Observable } from './State';

// This class represents the storage of all state information for the
// application.  Each of these states is represented by an instance of
// SubState which provides an interface which is essentially read only
// and can be passed as a property to a Component (which then links
// that to an internal state).
class Store {
	public index: SubState<ImpactIndex>;
	public term: SubState<string>;

	constructor(public source?: string) {
		if (!source) {
			// Use the local version, if it exists, to avoid the need
			// for a network connection.
			this.source = "./impact_index.json";
		}
		this.index = new SubState(null);
		this.term = new SubState("");
	}

	updateTerm(s: string) {
		this.term.update(s);
	}

	load() {
		return $.get(this.source)
			.then((result: ImpactIndex) => {
				console.log("Loaded index from ", this.source);
				this.index.update(result);
			}, (e) => {
				var remote = "http://impact.github.io/impact_index.json";

				// If we get here, there was an error.  So now let's try
				// a public version of impact_index.json (requires a
				// network connection).
				console.log("Failed to load index from ", this.source);
				console.log("Now tring to load from ", remote);
				return $.get(remote)
					.then((result: ImpactIndex) => {
						console.log("Loaded index from ", remote);
						this.index.update(result);
					}, (e) => {
						console.error("Unable to load index file from ", this.source,
									  " or ", remote);
					})
			});
		/*
		return $.get(this.source, (result: ImpactIndex) => {
			console.log("Loaded index from ", this.source);
			this.index.update(result);
		}, (e) => {
			var remote = "http://impact.github.io/impact_index.json";

			// If we get here, there was an error.  So now let's try
			// a public version of impact_index.json (requires a
			// network connection).
			console.log("Failed to load index from ", this.source);
			console.log("Now tring to load from ", remote);
			return $.get(remote, (result: ImpactIndex) => {
				console.log("Loaded index from ", remote);
				this.index.update(result);
			}, (e) => {
				console.error("Unable to load index file from ", this.source, " or ", remote);
			})
		})
		*/
	}
}

export = Store;
