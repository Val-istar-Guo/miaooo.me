import env from 'detect-env';
import request from 'superagent';

import * as logger from '../utils/logger';
import * as MUTATIONS from '../contants/mutations';
import { FETCHING, FETCHED, FETCH_FAIL } from '../contants/fetchStatus';


export default {
  state: {
    load: {
      state: FETCHING,
      error: {
        code: null,
        message: '',
      },
    },
    items: [],
  },

  mutations: {
    [MUTATIONS.ARTICLE_FETCHING](state) {
      state.load.state = FETCHING;
    },
    [MUTATIONS.ARTICLE_FETCHED](state, article) {
      // NOTE: 数据不可信，需要验证处理
      state.load.state = FETCHED;
      state.items = [...state.items, article];
    },
    [MUTATIONS.ARTICLE_FETCH_FAIL](state, error) {
      state.load.state = FETCH_FAIL;
      state.load.error = error;
    },
  },

  actions: {
    loadArticle: async ({ state, commit }, title) => {
      commit(MUTATIONS.ARTICLE_FETCHING);

      try {
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


