import xs from 'xstream';
import { div, h1, article, a, i } from '@cycle/dom';
import articles from '../../modules/articles';
import Loadding from '../../modules/loadding';


function intent(domSource) {
}

function model(actions, prop$) {
  return prop$
    .map(({ id }) => id)
    .map(parseInt)
    .map(id => articles.filter(art => art.id === id)[0]);
}

function view(state$) {
  return state$.map((art) => {
    let vdom$ = null;

    if (!art) {
      vdom$ = Loadding();
    } else {
      vdom$ = xs.of(
        div([
          article('.article .source-code-pro', [
            h1(art.title),
            ...art.content,
          ]),
          a(
            '.J_back .fab-bottom .bottom .dark-purple .shadow-deep-2 .container',
            { attrs: { href: '/' } },
            [i('.material-icons .white-text .vertical-center', 'wrap_text')]),
        ]));
    }

    return vdom$;
  })
  .flatten();
}

export default function (sources) {
  const actions = intent(sources.DOM);
  const state$ = model(actions, sources.prop$);
  const vdom$ = view(state$);

  return {
    DOM: vdom$,
  };
}
