import env from 'detect-env';


export default env.detect({
  prod: {
    policy: {
      'default-src': ['self', '*.miaooo.me'],
      'img-src': ['*'],
    },
  },

  default: {
    policy: {
      // Vue need 'unsafe-eval'
      'default-src': ['self', 'unsafe-eval', 'unsafe-inline', '*.miaooo.me'],
      'img-src': ['*'],
    },
  },
});
