import detectEnv from 'detect-env';


export const generateArticleRequestUrl = detectEnv({
  default: (name) => encodeURI(`api/get_article?name=${name}`),
});

export const INDEX_REQUEST_URL = 'api/get_index';
