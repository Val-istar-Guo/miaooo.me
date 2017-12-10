import env from 'detect-env';


export const error = err => !env.is.prod && console.error(err);
