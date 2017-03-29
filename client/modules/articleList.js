import xs from 'xstream';
import { div, h2, ul, li, a, p } from '@cycle/dom';

const articleList = [
  {
    id: 1,
    title: 'article title',
    des: 'descriptions',
  },
  {
    id: 2,
    title: 'article title',
    des: 'descriptions',
  },
];

// function articleItem(sources) {
//   const vdom$ = sources.list$
    // .map(({ id, title, des }) => (
    //   li('.article-list-item', [
    //     h2(title),
    //     p(des),
    //     a({ href: id }),
    //   ])
//     ));
//
//   return { DOM: vdom$ };
// }

function intent(sources) {
  return sources;
}

function model(actions) {
  return actions;
}

function view(state$) {
  const vdom$ = state$.map((list) => {

    const liDom = list.map(({ id, title, des }) => (
      li('.article-list-item', [
        h2(title),
        p(des),
        a({ href: id }),
      ])));

    return xs.combine(...liDom)
      .map((nodes) => {
        console.log(nodes);
        return ul(nodes);
      });
  })
  .flatten();

  vdom$.map((val) => {
    console.log(val);
    return 'a';
  });
}

export default function () {
  const source$ = xs.of(articleList);
  return { DOM: view(model(intent(source$))) };
}
