// PM2 Config
const path = require('path');


const { name: APP_NAME, repository: REPO } = require('./package.json');
const serverPath = path.join('/var/www', APP_NAME);
const user = 'www';
const host = 'miaooo.me';

module.exports = {
  apps: [
    {
      name: `${APP_NAME}-stage`,
      script: './dist/server/bundle.js',
      source_map_support: true,

      env: {
        NODE_ENV: 'stage',
      },
      env_stage: {
        PORT: 7001,
      },
    },
    {
      name: `${APP_NAME}-prod`,
      script: './dist/server/bundle.js',

      env: {
        NODE_ENV: 'prod',
      },
      env_prod: {
        PORT: 9001,
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
