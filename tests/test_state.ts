import { expect } from 'chai';

import { createStore } from 'redux';

import { State, rootReducer } from '../src/redux/state';
import { setTerm } from '../src/redux/actions';

describe("Create an initial state", () => {
	it('should have an empty search term', () => {
		var state = new State()
		expect(state.term).to.equal("")
	})
	it('should set the search term on a search term action', () => {
		var store = createStore(rootReducer);
		store.dispatch(setTerm("buildings"));
		expect(store.getState().term).to.equal("buildings")
	})
})
