import { div, button, span } from '@cycle/dom';

function intent(domSource) {
  return {
    toSearching: domSource.select('.J_button').events('click'),
  };
}

function model(actions) {
  let toSearch = false;
  return actions.toSearching.startWith(null)
    .map(() => {
      toSearch = !toSearch;
      return toSearch;
    });
}

function view(state$) {
  return state$.map(toSearching => (
    toSearching ? button('.J_button .fab-bottom .float', [span('.material-icons', 'add')]) : button('.J_button .mdl-button .fab-bottom', [span('.material-icons', 'search')])
  ));
}

export default function Header(sources) {
  const actions = intent(sources.DOM);
  const state$ = model(actions);
  const vdom$ = view(state$);

  return { DOM: vdom$ };
}
