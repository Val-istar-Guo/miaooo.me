import xs from 'xstream';
import { div, button, p, a } from '@cycle/dom';

import SignInForm from './signInForm';

function intent(domSource) {
  return {
    signIn$: domSource.select('.J_sign-in').events('click'),
  };
}

function model(actions) {
  return actions.signIn$.startWith(false);
}

function view(state$, sources) {
  return state$.map((clicked) => {
    let vdom$ = null;

    if (clicked) {
      const signInForm$ = SignInForm(sources);



      vdom$ = signInForm$.DOM
        .map(signInForm => (
          div([
            div('.J_cancle .full-screen-box .covering .translucent-black'),
            signInForm,
          ])
        ));
    } else {
      vdom$ = xs.of(div(
        '.remaind-box .center-box .pale-gold .source-code-pro .shadow-deep-1',
        [
          p('.greyish-text', 'DO YOU LIKE THIS BLOG'),
          button('.J_sign-in .button .shadow-deep-2 .white .center', 'SIGN IN'),
        ]));
    }

    return vdom$;
  })
  .flatten();
}


export default function Header(sources) {
  const actions = intent(sources.DOM);
  const state$ = model(actions);
  const vdom$ = view(state$, sources);

  return {
    DOM: vdom$,
  };
}
