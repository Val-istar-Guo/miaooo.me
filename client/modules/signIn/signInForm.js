import xs from 'xstream';
import { div, input, button, form } from '@cycle/dom';

import { letterFilter } from '../utils/filter';

function intent(domSource) {
  return {
    ensure: domSource.select('.J_ensure').events('click'),
    cancle: domSource.select('.J_cancle').events('click'),
    entryName: domSource.select('.J_name').events('input'),
  };
}

function model(actions) {
  return actions.entryName
    .map(evt => evt.target.value)
    .startWith('');
}

function view(state$) {
  return state$.map(letterFilter)
    .map((val) => {
      console.log(`${typeof val}: ${val}`);
      return val;
    })
    .map(name => (
      div('.full-screen-box .container', [
        div('.J_cancle .cover-container-box .covering'),
        form('.sign-in-form .form .vertical-center .up-covering .white .shadow-deep-2 .center-box', [
          div('.normal-input .width-8',
            input('.J_name .input', {
              attrs: {
                type: 'text',
                value: name,
                placeholder: 'NAME',
              },
            })),

          div('.normal-input .width-8',
            input('.input', {
              attrs: {
                type: 'password',
                placeholder: 'PASSWORD',
              },
            })),

          button('.J_ensure .button .dark-purple .white-text .shadow-deep-3 .source-code-pro .top-1',
            { attrs: { type: 'submit' } },
            'SIGN-IN'),
        ]),
      ])
    ));
}

export default function Header(sources) {
  const actions = intent(sources.DOM);
  const state$ = model(actions);
  const vdom$ = view(state$);

  return {
    DOM: vdom$,
    cancled: xs.merge(actions.ensure, actions.cancle).mapTo(true).startWith(false),
  };
}
