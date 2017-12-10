const table = {};

function mutation(name, ...extensions) {
  if (name in table) throw new Error(`mutation(${name}) has been declared`);

  table[name] = extensions;

  return name;
}

const equal = one => two => one === two;

mutation.instanceof = (target, source) => {
  if (target in table && table[target].some(equal(source))) return true;

  return false;
}

export const FETCHING = mutation('FETCHING');
export const FETCHED = mutation('FETCHED');
export const FETCH_FAIL = mutation('FETCH_FAIL');

export const PAGE_DATA_FETCHING = mutation('PAGE_DATA_FETCHING', FETCHING);
export const PAGE_DATA_FETCHED = mutation('PAGE_DATA_FETCHED', FETCHED);
export const PAGE_DATA_FETCH_FAIL = mutation('PAGE_DATA_FETCH_FAIL', FETCH_FAIL);

export const ARTICLE_FETCHING = mutation('FETCHING_ARTICLE', FETCHING);
export const ARTICLE_FETCHED = mutation('FETCHED_ARTICLE', FETCHED);
export const ARTICLE_FETCH_FAIL = mutation('ARTICLE_FETCH_FAIL', FETCH_FAIL);
