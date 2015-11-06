import { expect } from 'chai';
import { createStore } from 'redux';

import { ImpactIndex } from '../src/impact/Index';

import { State, rootReducer } from '../src/redux/state';
import * as actions from '../src/redux/actions';

import { sample } from './dummy';

describe("Create an initial state", () => {
	it('should have an empty search term and no libraries', () => {
		var state = new State()
		expect(state.term).to.equal("")
		expect(state.index.libraries).to.deep.equal([])
	})
	it('should set the search term on a search term action', () => {
		var store = createStore(rootReducer);
		store.dispatch(actions.setTerm("buildings"));
		expect(store.getState().term).to.equal("buildings")
		expect(store.getState().index.libraries).to.deep.equal([])
	})
})
describe("Load libraries", () => {
	it('should load static data', () => {
		var store = createStore(rootReducer);
		store.dispatch(actions.loadIndex(sample));
		expect(store.getState().term).to.equal("")
		expect(store.getState().index.libraries).to.not.deep.equal([])
		expect(store.getState().index.libraries.length).to.not.equal(0)
		expect(store.getState().index.libraries.length).to.equal(66)

		store.dispatch(actions.setTerm("*"));
		expect(store.getState().index.libraries).to.not.deep.equal([])
		expect(store.getState().index.libraries.length).to.not.equal(0)
		expect(store.getState().index.libraries.length).to.equal(66)

		store.dispatch(actions.setTerm("building"));
		expect(store.getState().index.libraries).to.not.deep.equal([])
		expect(store.getState().index.libraries.length).to.not.equal(0)
		expect(store.getState().index.libraries.length).to.equal(66)
	})
	it('should load index from the network', () => {
		var store = createStore(rootReducer);

		var lp = actions.load("http://impact.github.io/impact_index.json", store)

		return lp.then((index: ImpactIndex) => {
			console.log("Loaded!")
			expect(store.getState().term).to.equal("")
			expect(store.getState().index.libraries).to.not.deep.equal([])
			expect(store.getState().index.libraries.length).to.not.equal(0)
		});
	})
})
