import { run } from '@cycle/run';

import app from './app';
import dirves from './dirves';

let dispose = run(app, dirves);


if (module.hot) {
  module.hot.accept('./app', () => {
    dispose();
    const newApp = require('./app').default;
    console.log(newApp);
    dispose = run(newApp, dirves);
  });
}
