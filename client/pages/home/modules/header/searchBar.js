import xs from 'xstream';
import { div, button, i, input } from '@cycle/dom';

function intent(domSource) {
  return {
    openSearch: domSource.select('.J_button').events('click'),
    closeSearch: domSource.select('.J_covering').events('click'),
  };
}

function model(actions) {
  const openSearch$ = actions.openSearch.mapTo(true);
  const closeSearch$ = actions.closeSearch.mapTo(false);

  return xs.merge(openSearch$, closeSearch$).startWith(false);
}

function view(state$) {
  const btn = button('.J_button .fab-bottom .float .white .shadow-deep-2', [
    i('.material-icons .vertical .center', 'search'),
  ]);

  const textline = div([
    div('.J_covering .full-screen-box .translucent-black .covering'),
    div('.vertical-box .white .cover-partner-box .shadow-deep-1 .up-covering', [
      div('.icon-text-input .vertical-center .width-10', [
        i('.icon .material-icons .dark-purple-text', 'search'),
        input('.input .dark-purple', { attrs: { type: 'text' } }),
      ]),
    ]),
  ]);

  return state$.map(toSearching => (
    !toSearching ? btn : textline
  ));
}

export default function Header(sources) {
  const actions = intent(sources.DOM);
  const state$ = model(actions);
  const vdom$ = view(state$);

  return { DOM: vdom$ };
}
