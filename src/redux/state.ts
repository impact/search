import { ImpactIndex, Library } from '../impact/Index';
import { handleActions, Action, Reducer } from 'redux-actions';
import { computeResults } from '../impact/search';

import * as actions from './actions';

export class State {
	public term: string;
	public index: ImpactIndex;

	// The constructor creates a reasonable initial state
	constructor() {
		this.term="";
		this.index = {
			version: "1.0.0",
			libraries: []
		};
	}

	public setTerm(term: string): State {
		//console.log("setTerm("+term+")");
		var ret = this.clone();
		ret.term = term;
		return ret;
	}

	public loadIndex(index: ImpactIndex): State {
		//console.log("loadIndex("+index+")");
		var ret = this.clone();
		ret.index = index;
		return ret;
	}

	private clone(): State {
		var ret = new State();
		ret.term = this.term
		ret.index = this.index
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
