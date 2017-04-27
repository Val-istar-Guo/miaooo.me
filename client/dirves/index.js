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
  SIGNIN_TEST: makeABTestDirve(3, { message: 'default' }),
};
