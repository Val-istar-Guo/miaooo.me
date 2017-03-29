import xs from 'xstream';
import { div, h1 } from '@cycle/dom';

function intent(source) {
}

function model(actions) {
  return xs.of('VAL.ISTAR.GUO');
}

function view(state$) {
  return state$.map(title => (
    div([
      h1(title),
    ])
  ));
}

export default function Header() {
  return {DOM: view(model(intent()))};
}
