import env from 'detect-env';


export default env.detect({
  prod: {
    policy: {
      'default-src': ['self', '*.miaooo.me', 'unsafe-inline'],
      'img-src': ['*'],
    },
  },

  default: {
    policy: {
      // Vue need 'unsafe-eval'
      'default-src': ['self', 'unsafe-eval', 'unsafe-inline', 'ws:', '*.miaooo.me', 'ws:'],
      'img-src': ['*'],
    },
  },
});
