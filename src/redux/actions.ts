import es6 = require("es6-promise")

import axios = require('axios')

import { ImpactIndex } from '../impact/Index';
import { Reducer } from 'redux';
import { State } from './state';

import * as tsr from 'ts-redux';

export const setTerm = (term: string) => tsr.setPath(["term"], term)
export const loadIndex = (index: ImpactIndex) => tsr.setPath(["index"], index)

export function load(source: string, store: Redux.Store<State>) {
	var remote = "http://impact.github.io/impact_index.json";

	var p: axios.Promise = axios.get(source);

	var success = (result: axios.Response): axios.Response => {
		store.dispatch(loadIndex(result.data as ImpactIndex));
		return result
	}

	var failure = (e: axios.Response): any => {
		console.error("Unable to load index file from ", source, " or ", remote);
		return null
	}

	var tryRemote = (e: axios.Response) => {
			
		// If we get here, there was an error.  So now let's try
		// a public version of impact_index.json (requires a
		// network connection).
		console.log("Failed to load index from ", source);
		console.log("Now tring to load from ", remote);

		var p2: axios.Promise = axios.get(remote);

		return p2.then(success).catch(failure);
	}

	return p.then(success).catch(tryRemote);
}
