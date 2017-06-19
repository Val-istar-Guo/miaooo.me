import path from 'path';
import request from 'superagent';


const ARTICLES_INDEX_URL = 'https://raw.githubusercontent.com/Val-istar-Guo/article/master/index.md';
async function fetchIndex() {
  const response = await request
    .get(ARTICLES_INDEX_URL);

  return response.text;
}

async function fetchArticle(name) {
  console.log('FETCH ARTICLE');
  // https://raw.githubusercontent.com/Val-istar-Guo/article/:sha/articles/:article-name
  const ARTICLE_URL = `https://raw.githubusercontent.com/Val-istar-Guo/article/master/articles/${encodeURI(name)}.md`;

  const response = await request
    .get(ARTICLE_URL);

  return response.text;
}

const GIT_MASTER_INFO_URL = 'https://api.github.com/repos/Val-istar-Guo/article/commits/master';
async function fetchSHA() {
   const response = await request
    .get(GIT_MASTER_INFO_URL );

  return response.body.sha;
}

async function fetchArticleLastCommitTime(name) {
  const ARTICLE_COMMIT_INFO_URL = `https://api.github.com/repos/Val-istar-Guo/article/commits?path=articles/${encodeURI(name)}.md`;

  const response = await request
    .get(ARTICLE_COMMIT_INFO_URL)
    .then(res => res.body);

  return response[0].commit.committer.date;
}


function decorateTimeout(map, timeout = 5 * 1000 * 60) {
  const oldMap = map;
  const Decorator = function() {};

  Decorator.prototype = oldMap;

  const newMap = new Decorator();

  newMap.has = function (key) {
    if (oldMap.has(key)) {
      const cache = oldMap.get(key);
      const nowTime = new Date().getTime();
      console.log('MAP.has:', key, cache.time, cache.time + timeout, nowTime);

      if (cache.time + timeout > nowTime) return true;
    }

    return false;
  };

  newMap.get = function (key) {
    if (this.has(key)) return oldMap.get(key).value;
  };

  newMap.set = function (key, value) {
    return oldMap.set(key, {
      time: new Date().getTime(),
      value,
    });
  }

  return newMap;
}

function parseIndex(str) {
  let list = str
    .replace(/(\n|(\n\r)|\r)/, '\n')
    .split(/(^-.*\n)/m)
    .map(str => str.replace(/\n/g, ''))
    .filter(str => str.length)
    .reduce((arr, str, i) => {
      if (/^-/.test(str)) {
        arr.push({ name: str  });
      } else {
        const last = arr[arr.length - 1];
        last.des = str;
      }

      return arr;
    }, [])
    .map(art=> ({
      ...art,
      name: art.name.replace(/^-\s*/, ''),
    }));

  return list;
}

const STORAGE = decorateTimeout(new Map());

export async function getArticle(name) {
  const cacheKey = `articles/${name}`;

  if (STORAGE.has(cacheKey)) return STORAGE.get(cacheKey);

  const article = await fetchArticle(name);
  STORAGE.set(cacheKey, article);

  return article;
}

export async function getIndex() {
  const cacheKey = 'index';

  // Try to get cache
  if (STORAGE.has(cacheKey)) return STORAGE.get(cacheKey);


  let index = await fetchIndex();
  index = parseIndex(index)
    .map((article) => {
      return fetchArticleLastCommitTime(article.name)
        .then(time => ({...article, time}))
    });

  index = await Promise.all(index);

  // Set cache
  STORAGE.set(cacheKey, index);

  return index;
}

