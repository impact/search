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
			this.source = "/impact_index.json";
		}
		this.index = new SubState(null);
		this.term = new SubState("");
	}

	updateTerm(s: string) {
		this.term.update(s);
	}

	load() {
		$.get(this.source, (result) => {
			this.index.update(result);
		})
	}
}

export = Store;
