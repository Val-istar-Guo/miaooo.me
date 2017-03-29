import Header from './modules/header';
import ArticleList from './modules/articleList';

function intent(source) {
}

function model(actions) {
}

function view(state$) {
  return ArticleList().DOM;
}

export default function (sources) {
  return { DOM: view(model(intent(sources.DOM))) };
}
