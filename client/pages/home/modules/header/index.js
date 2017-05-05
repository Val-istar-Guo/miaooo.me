import { div, h1 } from '@cycle/dom';
import isolate from '@cycle/isolate';

import SearchBar from './searchBar';

function intent(domSource) {
}

function model(actions) {
}

function view(state$, sources) {
  return isolate(SearchBar)(sources).DOM
    .map(searchVDom => (
      div('.dark-purple .valign-wrapper .container', [
        h1('.white-text .michroma-font .page-title .float', 'VAL.ISTAR.GUO'),
        searchVDom,
      ])
    ));
}

export default function Header(sources) {
  const actions = intent(sources.DOM);
  const state$ = model(actions);
  const vdom$ = view(state$, sources);

  return {
    DOM: vdom$,
  };
}
