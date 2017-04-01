import xs from 'xstream';
import { div, button, p } from '@cycle/dom';

// import signInForm from './signInForm';

function intent(domSource) {
  return {
    clickAction$: domSource.select('.J_sign-in').events('click'),
  };
}

function model(actions) {
  return actions.clickAction$.startWith(false);
}

function view(state$) {
  return state$.map((clicked) => {
    return div('.remaind-box .center-box .pale-gold .source-code-pro .shadow-deep-1', [
      p('.greyish-text', 'DO YOU LIKE THIS BLOG'),
      button('.J_sign-in .button .shadow-deep-2 .white .center', 'SIGN IN'),
    ]);
  });
}


export default function Header(sources) {
  const actions = intent(sources.DOM);
  const state$ = model(actions);
  const vdom$ = view(state$, sources.DOM);

  return {
    DOM: vdom$,
  };

}
