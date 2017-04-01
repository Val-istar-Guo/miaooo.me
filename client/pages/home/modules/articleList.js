import xs from 'xstream';
import { ul, li, a, span } from '@cycle/dom';

const articleList = [
  {
    id: 1,
    title: 'Article title1',
    des: 'Descriptions',
  },
  {
    id: 2,
    title: 'Article title',
    des: 'Descriptions',
  },
];

function intent(sources) {
  return sources;
}

function model(actions) {
  return actions;
}

function view(state$) {
  return state$.map((list) => {
    const articleNodes = list
      .map(({ id, title, des }) => li('.list-item', [
        span([
          span('.list-title .greyish-text', title),
          span('.list-des .warm-grey-text', des),
        ]),
        a({ href: id }),
      ]));
    return ul('.list', articleNodes);
  });
}

export default function () {
  const source$ = xs.of(articleList);
  return { DOM: view(model(intent(source$))) };
}
