import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';

import makeAscNumDirver from './makeAscNumDirve';

export default {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver(),
  HOT: makeAscNumDirver(),
};
