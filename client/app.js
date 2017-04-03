import xs from 'xstream';
import { div } from '@cycle/dom';

import 'normalize.css';
import './styles/index.scss';

import SignInBar from './modules/signIn';
import HomePage from './pages/home';
import ArticlePage from './pages/article';

function intent(historySource) {
  return {
    page: historySource,
  };
}

function model(actions) {
  return actions.page
    .map(({ pathname, search }) => ({
      pathname,
      query: search.replace('?', '').split('&').reduce((obj, str) => {
        const arr = str.split('=');
        return { ...obj, [arr[0]]: arr[1] };
      }, {}),
    }))
    .startWith({ pathname: '/' });
}

function view(state$, sources) {
  const signInBar$ = SignInBar(sources).DOM;
  // return signInBar$;
  const page$ = state$.map(({ pathname, query }) => {
    let page = null;

    switch (pathname) {
      case '/':
        page = HomePage(sources).DOM;
        break;
      case '/article':
        page = ArticlePage({ DOM: sources.DOM, prop$: xs.of(query) }).DOM;
        break;
      default:
        page = HomePage(sources).DOM;
        break;
    }

    return page;
  })
  .flatten();
  // return page$;
  return xs.combine(page$, signInBar$)
    .map(([page, signInBar]) => div([
      page,
      signInBar,
    ]));
}

export default function (sources) {
  const actions = intent(sources.HISTORY);
  const state$ = model(actions);
  const vdom$ = view(state$, sources);

  return {
    DOM: vdom$,
  };
}
