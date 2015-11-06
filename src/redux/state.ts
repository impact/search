import { ImpactIndex, Library } from '../impact/Index';
import { handleActions, Action, Reducer } from 'redux-actions';
import { computeResults } from '../impact/search';

import * as actions from './actions';

export class State {
	public term: string;
	public index: ImpactIndex;
	public matching: Library[];

	// The constructor creates a reasonable initial state
	constructor() {
		this.term="";
		this.index = {
			version: "1.0.0",
			libraries: []
		};
		this.matching = [];
	}

	public setTerm(term: string): State {
		console.log("setTerm("+term+")");
		var ret = this.clone();
		ret.term = term;
		ret.matching = computeResults(term, this.index);
		return ret;
	}

	public loadIndex(index: ImpactIndex): State {
		console.log("loadIndex("+index+")");
		var ret = this.clone();
		ret.index = index;
		ret.matching = computeResults(this.term, this.index);
		return ret;
	}

	private clone(): State {
		var ret = new State();
		ret.term = this.term
		ret.index = this.index
		ret.matching = this.matching
		return ret
	}
}

export var rootReducer: Reducer<State> = handleActions<State>({
  [actions.SET_TERM]: (state: State, action: Action): State => {
	  return state.setTerm(action.payload);
  },
  [actions.LOAD_INDEX]: (state: State, action: Action): State => {
	  return state.loadIndex(action.payload);
  }
}, new State());
