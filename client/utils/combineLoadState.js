import { FETCHING, FETCHED, FETCH_FAIL } from '../contants/fetchStatus';


const equal = a => b => a === b.state;
export default (...status) => {
  if (status.some(equal(FETCH_FAIL))) {
    const state = FETCH_FAIL;
    const errors = status.filter(equal(FETCH_FAIL))
      .map(state => state.error);

    return { state, errors };
  } else if (status.some(equal(FETCHING))) {
    return { state: FETCHING, errors: [] };
  }

  return { state: FETCHED, errors: [] };
};
