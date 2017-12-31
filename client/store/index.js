import env from 'detect-env';

import articles from './articles';
import author from './author';
import catalog from './catalog';

export default {
  strict: env.is.prod ? false : true,
  modules: { articles, author, catalog },
};

