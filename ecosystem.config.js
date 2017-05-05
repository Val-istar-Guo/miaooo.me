// PM2 Config

module.exports = {
  apps: [
    {
      name: 'abtest-demo',
      script: './dist/bundle.js',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'dev-app',
      script: './build/server.dev.js',
      watch: ['server', 'build'],
      source_map_support: true,
      env: {
        NODE_ENV: 'develop',
      },
    },
    {
      name: 'dev-abtest-demo',
      script: './build/server.dev.js',
      source_map_support: true,
      env: {
        NODE_ENV: 'develop',
      },

      env_staging: {
        NODE_ENV: 'staging',
        PORT: 8003,
      },
    },
  ],

  deploy: {
    prod: {
      user: 'docker',
      host: 'miaooo.me',
      ref: 'origin/master',
      repo: 'https://github.com/Val-istar-Guo/ab_test_data_server.git',
      path: '~/abtest-data-server/prod',
      'post-deploy': 'yarn; pm2 startOrRestart ecosystem.config.js --env production',
      env: {
        NODE_ENV: 'production',
        PORT: 8002,

        SQL_SOCKET: '/var/lib/mysql/mysql.sock',
        SQL_USER: 'ABTEST_DBM',
        SQL_DB: 'abTestDB',
      },
    },
    staging: {
      user: 'docker',
      host: 'docker',
      ref: 'feature-refactor',
      repo: 'https://github.com/Val-istar-Guo/Blog.git',
      path: '/home/docker/abtest-demo/dev',
      'post-deploy': 'yarn; pm2 startOrRestart ecosystem.config.js --only dev-abtest-demo --env staging',
    },
  },
};
