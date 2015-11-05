import { handleActions, Action, Reducer } from 'redux-actions';

import * as types from './types';

export class State {
	public term: string;

	// The constructor creates a reasonable initial state
	constructor() {
		this.term="";
	}

	public setTerm(term: string): State {
		var ret = this.clone();
		ret.term = term;
		return ret;
	}

	private clone(): State {
		var ret = new State();
		ret.term = this.term
		return ret
	}
}

export var rootReducer: Reducer<State> = handleActions<State>({
  [types.SET_TERM]: (state: State, action: Action): State => {
	  return state.setTerm(action.payload);
  }
}, new State());
