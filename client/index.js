import xs from 'xstream';
import {run} from '@cycle/run';
import {makeDOMDriver} from '@cycle/dom';

import Header from '../modules/header';

function intent(source) {
}

function model(actions) {
}

function view(state$) {
  return Header();
}

function main(sources) {
  return { DOM: view(model(intent(sources.DOM)))};
}

const drivers = {
  DOM: makeDOMDriver('#app')
};