import xs from 'xstream';
import { ul, li, a, span } from '@cycle/dom';

import articles from '../../../modules/articles';

function intent(domSource) {
}

function model(actions, sources) {
  return sources.LIST_ORDER
    .map((config) => {
      const list = [...articles];
      if (config.reverse) list.reverse();
      return list;
    });
}

function view(state$) {
  return state$
    .map((list) => {
    const articleNodes = list
      .map(({ id, title, des }) => li('.list-item .container', [
        span([
          span('.list-title .greyish-text', title),
          span('.list-des .warm-grey-text', des),
        ]),
        a('.J_article-link .cover-partner-box', { attrs: { href: `/article?id=${id}` } }),
      ]));
    return ul('.list', articleNodes);
  });
}

export default function (sources) {
  const actions = intent(sources.DOM);
  const state$ = model(actions, sources);
  const vdom$ = view(state$);

  return { DOM: vdom$ };
}
