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

    work: {
      company: '',
      job: '',
    },
    address: {
      provinces: '保密',
    },
  },

  mutations: {
    [MUTATIONS.AUTHOR_INFO_FETCHING](state) {
      state.load.state = FETCHING;
    },
    [MUTATIONS.AUTHOR_INFO_FETCHED](state, authorInfo) {
      state.load.state = FETCHED;

      // NOTE: 数据不可信，需要验证处理
      state.work.job = authorInfo.work.job || '保密';
      state.work.company = authorInfo.work.company || '保密';
      state.address = authorInfo.address || { provinces: '保密' };
    },
    [MUTATIONS.AUTHOR_INFO_FETCH_FAIL](state, error) {
      state.load.state = FETCH_FAIL;
      state.load.error = error;
    }
  },

  actions: {
    loadAuthorInfo: async ({ state, commit }) => {
      if (state.load.state === FETCHED) return;

      commit(MUTATIONS.AUTHOR_INFO_FETCHING);

      try {
        const author = await request
          .get('http://api.miaooo.me/v1/author')
          .then(resp => resp.body);

        commit(MUTATIONS.AUTHOR_INFO_FETCHED, author);
      } catch (err) {
        if (env.is.prod) {
          commit(MUTATIONS.AUTHOR_INFO_FETCH_FAIL, {
            message: '网络未连接或服务器异常，请稍后再试',
          });
        } else {
          commit(MUTATIONS.AUTHOR_INFO_FETCH_FAIL, { message: err.message });
        }
      }
    },
  },
};
