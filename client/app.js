import Header from './modules/header';

function intent(source) {
}

function model(actions) {
}

function view(state$) {
  return Header().DOM;
}

export default function (sources) {
  return { DOM: view(model(intent(sources.DOM))) };
}
