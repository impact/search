import { createAction, Action } from 'redux-actions';

import * as types from './types';

const setTerm = createAction<string>(
  types.SET_TERM,
  (text: string) => text
);
