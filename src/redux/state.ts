import updeep = require('updeep');

import { ImpactIndex, Library } from '../impact/Index';
import { Action, FluxStandardAction as FSA, Reducer } from 'redux';
import { handleActions } from 'redux-actions';
import { computeResults } from '../impact/search';

import * as actions from './actions';

export interface State {
	term: string;
	index: ImpactIndex;
}

function initialState(): State {
	return {
		term: "",
		index: {
			version: "1.0.0",
			libraries: []
		}
	}
}

export var rootReducer: Reducer<State> = handleActions<State>({
	[actions.SET_TERM]: (state: State, action: FSA<string, void>): State => {
		return updeep({term: action.payload}, state);
	},
	[actions.LOAD_INDEX]: (state: State, action: FSA<ImpactIndex,void>): State => {
		return updeep({index: action.payload}, state);
	}
}, initialState());
