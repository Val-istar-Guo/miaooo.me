import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';
import { makeHistoryDriver, captureClicks } from '@cycle/history';
import createHistory from 'history/createBrowserHistory';
import makeAscNumDirver from './makeAscNumDirve';
import makeABTestDirve from './makeABTestDirve';

export default {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver(),
  HISTORY: captureClicks(makeHistoryDriver(createHistory())),
  HOT: makeAscNumDirver(),
  SEARCH_BAR: makeABTestDirve(4, { message: 'circle' }),
  SIGNIN_BACKGROUND: makeABTestDirve(1, { background: 'pale-gold' }),
  LIST_ORDER: makeABTestDirve(2, { reverse: false }),
};
