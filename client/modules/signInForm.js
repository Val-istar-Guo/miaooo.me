import xs from 'xstream';
import { div, input, button, form } from '@cycle/dom';

function intent(domSource) {
  return {
    domSource:
  };
}

function model(actions) {
  return xs.of('VAL.ISTAR.GUO');
}

function view(state$) {
  const vdom = form('.sign-in-form', [
    input({attrs: {type: 'text'}}),
    input({attrs: {type: 'test'}}),
    button({attrs: {type: 'submit'}}),
  ]);
}

export default function Header(sources) {
  return { DOM: view(model(intent(sources.DOM))) };
}
