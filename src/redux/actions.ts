import { createAction, Action } from 'redux-actions';

import * as types from './types';

export const setTerm = createAction<string>(
  types.SET_TERM,
  (text: string) => text
);
