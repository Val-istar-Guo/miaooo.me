import xs from 'xstream';
import { div, h1, h2, ul, li, a, p } from '@cycle/dom';

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

const ArticleItem = (sources) => {
  const vdom$ = sources.props
    .map(({ id, title, des }) => li('.article-list-item', [
      h2(title),
      p(des),
      a({ href: id }),
    ]));

  return { DOM: vdom$ };
};

function intent(sources) {
  return sources;
}

function model(actions) {
  return actions;
}

function view(state$) {
  return state$.map((list) => {
    const articleNodes = list
      .map((article) => {
        const props$ = xs.of(article);
        const articleItem = ArticleItem({ props: props$ });
        return articleItem.DOM;
      });

    return xs.combine(...articleNodes)
      .map(nodes => ul(nodes));
  })
  .flatten();
}

export default function () {
  const source$ = xs.of(articleList);
  return { DOM: view(model(intent(source$))) };
}
