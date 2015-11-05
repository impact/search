import es6 = require("es6-promise")

var Promise = es6.Promise

import axios = require('axios')

import { ImpactIndex } from '../impact/Index';
import { Reducer } from 'redux';
//import { createAction, Action } from 'redux-actions';
import { State, rootReducer } from './state';

export const SET_TERM = 'SET_TERM';
export const setTerm = (term: string) => {
	return {
		type: SET_TERM,
		payload: term,
	};
}

export const LOAD_INDEX = 'LOAD_INDEX';
export const loadIndex = (index: ImpactIndex) => {
	return {
		type: LOAD_INDEX,
		payload: index
	};
}

export function load(source: string, store: Redux.Store<State>) {
	return axios.get(source)
		.then((result) => {
			console.log("Loaded index from ", source);
			store.dispatch(loadIndex(result.data as ImpactIndex));
			return result
		}, (e) => {
			var remote = "http://impact.github.io/impact_index.json";
			
			// If we get here, there was an error.  So now let's try
			// a public version of impact_index.json (requires a
			// network connection).
			console.log("Failed to load index from ", source);
			console.log("Now tring to load from ", remote);
			return axios.get(remote)
				.then((result) => {
					console.log("Loaded index from ", remote);
					store.dispatch(loadIndex(result.data as ImpactIndex));
					return result
				}, (e) => {
					console.error("Unable to load index file from ", source,
								  " or ", remote);
					return null
				})
		});
}
