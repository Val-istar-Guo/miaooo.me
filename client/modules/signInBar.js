import xs from 'xstream';
import { div, button, p } from '@cycle/dom';

import signInForm from './sinInForm';

function intent(domSource) {
  return {
    clickAction$: domSource.select('.sign-in').events('click'),
  };
}

function model(actions) {
  return actions.startWith(false);
}

function view(state$) {
  return state$.map((clicked) => {
    return div('.bottom-bar'[
        p('DO YOU LIKE THIS BLOG'),
        butt8on('.sign-in'),
      ])
    }
  });
}

export default function Header(sources) {
  return { DOM: view(model(intent(sources.DOM))) };
}
