import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';
import { makeHistoryDriver } from '@cycle/history';
import makeAscNumDirver from './makeAscNumDirve';

export default {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver(),
  HISTORY: makeHistoryDriver(),
  HOT: makeAscNumDirver(),
};
