import xs from 'xstream';
import { run } from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { adapt } from '@cycle/run/lib/adapt';

import app from './app';

let i = 1;

let dispose = run(app, {
  DOM: makeDOMDriver('#app'),
  HOT: function() {
    return xs.create({
      start: (listener) => {
        this.id = setInterval(() => listener.next('yo' + i++), 1000);
      },
      stop: () => {
        clearInterval(this.id)
      },
    });

  },
});


if (module.hot) {
  module.hot.accept('./app', () => {
    let newApp = require('./app').default;
    dispose();
    dispose = run(newApp, {
      DOM: makeDOMDriver('#app'),
      HOT: function() {
        return xs.create({
          start: (listener) => {
            this.id = setInterval(() => listener.next('yo' + i++), 1000);
          },
          stop: () => {
            clearInterval(this.id)
          },
        });
      },
    });
  });
}
