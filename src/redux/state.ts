import updeep = require('updeep');

import { ImpactIndex, Library } from '../impact/Index';
import { Action, Reducer } from 'redux';
import { computeResults } from '../impact/search';

import * as actions from './actions';

import { FluxStandardAction as FSA } from 'ts-redux';

// Definition of application state
export interface State {
	term: string;
	index: ImpactIndex;
}

// Function to compute initial application state
export function initialState(): State {
	return {
		term: "",
		index: {
			version: "1.0.0",
			libraries: []
		}
	}
}
