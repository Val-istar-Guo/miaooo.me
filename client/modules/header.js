import xs from 'xstream';
import { run } from '@cycle/run';
 import {div, h1, makeDOMDriver} from '@cycle/dom';
 
function intent(source) {
}

function model(actions) {
  return xs.of('VAL.ISTAR.GUO');
}

function view(state$) {
  return state$.map( title => (
    div([
      h1(title),
    ]);
  ));
}

export default function Header(source) {
  return {DOM: view(model(intent(source.DOM)))};
}