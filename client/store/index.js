import env from 'detect-env';
import request from 'superagent';

import * as logger from '../utils/logger';
import * as MUTATIONS from '../contants/mutations';
import { FETCHING, FETCHED, FETCH_FAIL } from '../contants/fetchStatus';


export default {
  strict: env.is.prod ? false : true,

  state: {
    loadStatus: FETCHING,
    loadError: {
      code: null,
      message: '',
    },
    articles: [],
  },

  mutations: {
    [MUTATIONS.ARTICLE_FETCHING](state) {
      state.loadStatus = FETCHING;
    },
    [MUTATIONS.ARTICLE_FETCHED](state, article) {
      state.loadStatus = FETCHED;
      console.log(article);
      state.articles = [...state.articles, article];
    },
    [MUTATIONS.ARTICLE_FETCH_FAIL](state, error) {
      state.loadStatus = FETCH_FAIL;
      state.loadError = error;
    },
  },

  actions: {
    loadArticle: async ({ state, commit }, title) => {
      commit(MUTATIONS.ARTICLE_FETCHING);

      try {
        console.log(encodeURI(`http://api.miaooo.me/v1/articles/${title}`));
        const article = await request
          .get(encodeURI(`http://api.miaooo.me/v1/articles/${title}`))
          .then(resp => resp.body)

        commit(MUTATIONS.ARTICLE_FETCHED, { title, ...article });
      } catch (err) {
        // logger.error(err);
        if (env.is.prod) {
          commit(MUTATIONS.ARTICLE_FETCH_FAIL, {
            message: '网络未连接或服务器异常，请稍后再试',
          });
        } else {
          commit(MUTATIONS.ARTICLE_FETCH_FAIL, { message: err.message });
        }
      }
    }
  },
};

