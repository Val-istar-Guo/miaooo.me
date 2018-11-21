import env from 'detect-env';

export default env.detect({
  prod: {
    'img-src': ['github.com', 'self']
  },

  default: {
    policy: {
      // Vue need 'unsafe-eval'
      'default-src': ['self', 'unsafe-eval', 'unsafe-inline', 'ws:', 'data:'],
      'img-src': ['https://github.com', 'raw.githubusercontent.com', 'self']
    },
  },
});
