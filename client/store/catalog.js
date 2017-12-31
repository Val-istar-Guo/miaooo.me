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
    [MUTATIONS.CATALOG_FETCHING](state) {
      state.load.state = FETCHING;
    },
    [MUTATIONS.CATALOG_FETCHED](state, catalog) {
      // NOTE: 数据不可信，需要验证处理
      state.load.state = FETCHED;
      state.items = catalog;
    },
    [MUTATIONS.CATALOG_FETCH_FAIL](state, error) {
      state.load.state = FETCH_FAIL;
      state.load.error = error;
    },
  },

  actions: {
    loadCatalog: async ({ state, commit }, title) => {
      if (state.load.state === FETCHED) return;

      commit(MUTATIONS.CATALOG_FETCHING);

      try {
        const catalog = await request
          .get(encodeURI(`http://api.miaooo.me/v1/articles`))
          .then(resp => resp.body)

        commit(MUTATIONS.CATALOG_FETCHED, catalog);
      } catch (err) {
        if (env.is.prod) {
          commit(MUTATIONS.CATALOG_FETCH_FAIL, {
            message: '网络未连接或服务器异常，请稍后再试',
          });
        } else {
          commit(MUTATIONS.CATALOG_FETCH_FAIL, { message: err.message });
        }
      }
    }
  },
};
