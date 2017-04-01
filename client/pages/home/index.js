import xs from 'xstream';
import { div, h1 } from '@cycle/dom';

import Header from './modules/header';
import ArticleList from './modules/articleList';
import SignInBar from './modules/signInBar';

function intent(sources) {
  return sources.HOT;
}

function model(actions) {
  return actions;
}

function view(state$, domSource) {
  const header$ = Header({ DOM: domSource }).DOM;
  const articleList$ = ArticleList().DOM;
  const signInBar$ = SignInBar({ DOM: domSource }).DOM;

  const ascNum$ = state$
    .map((val) => {
      console.log(val);
      return val;
    })
    .map(val => h1(val));

  return xs.combine(ascNum$, header$, articleList$, signInBar$)
    .map(([ascNum, header, articleList, signInBar]) => div([
      header,
      articleList,
      signInBar,
      ascNum,
    ]));
}

export default function (sources) {
  const actions = intent(sources);
  const state$ = model(actions);
  const vdom$ = view(state$, sources.DOM);

  return {
    DOM: vdom$,
  };
}
