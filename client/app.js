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

function view(state$) {
  console.log(1);
  const header$ = Header().DOM;
  const hot$ = state$.map(val => h1(val));
  return xs.combine(hot$, header$)
    .map(([hot, header]) => div([hot, header]));
}

export default function (sources) {
  return { DOM: view(model(intent(sources))) };
}
