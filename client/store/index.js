import detectEnv from 'detect-env';

import articles from './articles';
import * as MUTATIONS from '../contants/mutations';


export default {
  strict: detectEnv({ production: false, default: true }),

  modules: {
    articles,
  },

  state: {
    ispc: (typeof window !== 'undefined' && document.documentElement.clientWidth > 1024) ? true : false,
    time: { server: new Date().getTime(), client: new Date().getTime() },
  },

  getters: {
    serverTime: ({ time }) => {
      const now = new Date().getTime();

      return new Date(now - time.client + time.server);
    }
  },

  mutations: {
    [MUTATIONS.UPDATE_SERVER_TIME](state, payload) {
      state.time = {
        server: payload.serverTime,
        client: new Date().getTime(),
      };
    },
    [MUTATIONS.RECALCULATE_DIVICE_SIZE](state, payload) {
      if (typeof window !== 'undefined' && payload.width > 1024) {
        state.ispc = true;
      } else {
        state.ispc = false;
      }
    },
  },
};
