import xs from 'xstream';
import { div, h1 } from '@cycle/dom';

import 'normalize.css';
import './styles/index.scss';

import HomePage from './pages/home';

function intent(sources) {
  return sources;
}

function model(actions) {
  return actions;
}

function view(state$, sources) {
  return HomePage(sources).DOM;
}

export default function (sources) {
  const actions = intent(sources);
  const state$ = model(actions);
  const vdom$ = view(state$, sources);

  return {
    DOM: vdom$,
  };
}
