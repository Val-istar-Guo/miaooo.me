// PM2 Config
const path = require('path');


const { name: APP_NAME, repository: REPO } = require('./package.json');
const serverPath = path.join('/var/www', APP_NAME);
const user = 'jumper';
const host = 'miaooo.me';

module.exports = {
  apps: [
    {
      name: `${APP_NAME}-stage`,
      script: './dist/server/bundle.js',
      source_map_support: true,

      env_stage: {
        PORT: 5001,
        HOST: '127.0.0.1',
      },
    },
    {
      name: `${APP_NAME}-prod`,
      script: './dist/server/bundle.js',

      env_prod: {
        PORT: 6001,
        HOST: '127.0.0.1',
      },
    },
  ],

  deploy: {
    prod: {
      user,
      host,
      ref: 'origin/master',
      repo: REPO,
      path: path.join(serverPath, 'prod'),
      'post-deploy': `npm i; npm run build:prod; pm2 startOrRestart ecosystem.config.js --only ${APP_NAME}-prod --env prod`,

      env: {
        NODE_ENV: 'prod',
      },
    },
    stage: {
      user,
      host,
      ref: 'origin/dev',
      repo: REPO,
      path: path.join(serverPath, 'stage'),
      'post-deploy': `npm i; npm run build:prod; pm2 startOrRestart ecosystem.config.js --only ${APP_NAME}-stage --env stage`,
    },

    env: {
      NODE_ENV: 'stage',
    },
  },
};
