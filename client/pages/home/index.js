import xs from 'xstream';
import { div, h1 } from '@cycle/dom';

import Header from './modules/header';
import ArticleList from './modules/articleList';

function intent(sources) {
  return sources.HOT;
}

function model(actions) {
  return actions;
}

function view(state$, sources) {
  const header$ = Header(sources).DOM;
  const articleList$ = ArticleList(sources).DOM;

  const ascNum$ = state$
    .map((val) => {
      console.log(val);
      return val;
    })
    .map(val => h1(val));

  return xs.combine(ascNum$, header$, articleList$)
    .map(([ascNum, header, articleList]) => div([
      header,
      articleList,
      ascNum,
    ]));
}

export default function (sources) {
  const actions = intent(sources);
  const state$ = model(actions);
  const vdom$ = view(state$, sources);

  return {
    DOM: vdom$,
  };
}
