/* eslint-disable import/no-extraneous-dependencies */
// NOTE Node babel source map support
require('source-map-support').install();

// NOTE Javascript require hook
require('babel-register')({
  presets: ['es2015'],
  plugins: ['add-module-exports', 'transform-object-rest-spread'],
});

require('../server/server.dev.js');
