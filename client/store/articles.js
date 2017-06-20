import Vue from 'vue';
import request from 'superagent';
import CodeError from 'utils/code-error';
import  { NO_ERROR }from 'contants/error-code';
import  * as ERROR from 'contants/error-code';

import * as MUTATIONS from '../contants/mutations';
import { generateArticleRequestUrl, INDEX_REQUEST_URL } from '../contants/request-url';


export default {
  state: {
    index: {
      isload: null,
      error: null,
      data: [],
    },

    articles: {},
  },

  getters: {
    isLoadArticle: ({ articles }) => name => {
      if (name in articles) return articles[name].isload;

      return false;
    },
    articles: ({ articles }) => articles,
  },

  mutations: {
    [MUTATIONS.FETCH_ARTICLE_REQUEST]({ articles }, payload) {
      if (payload.name in articles) {
        const article = articles[payload.name];

        article.isload = false;
        article.error = null;
      } else {
        Vue.set(articles, payload.name, {
          name: payload.name,
          isload: false,
          error: null,
          cnt: null,
        });
      }
    },
    [MUTATIONS.FETCH_ARTICLE_FAILURE]({ articles }, payload) {
      const article = articles[payload.name];

      article.isload = true;
      article.error = payload.err;
    },
    [MUTATIONS.FETCH_ARTICLE_SUCCESS]({ articles }, payload) {
      const article = articles[payload.name];

      article.isload = true;
      article.cnt = payload.cnt;
    },
    [MUTATIONS.FETCH_INDEX_REQUEST]({ index }) {
      index.isload = false;
    },
    [MUTATIONS.FETCH_INDEX_FAILURE]({ index }, payload) {
      index.isload = true;
      index.error = payload.err;
    },
    [MUTATIONS.FETCH_INDEX_SUCCESS]({ index }, payload) {
      index.isload = true;
      index.data = payload.index;
    },
  },

  actions: {
    async fetchArticle({ getters, commit }, payload) {
      if (getters.isLoadArticle(payload.name)) return;

      const { name }= payload;
      const requestUrl = generateArticleRequestUrl(name);

      commit(MUTATIONS.FETCH_ARTICLE_REQUEST, payload);

      const response = await request
        .get(requestUrl)
        .then(r => r.body)
        .catch(err => ({
          errorCode: ERROR.TIMEOUT,
        }));

      if (response.errorCode !== NO_ERROR) {
        commit(MUTATIONS.FETCH_ARTICLE_FAILURE, {
          ...payload,
          err: new CodeError(response.errorCode),
        });
      } else {
        commit(MUTATIONS.FETCH_ARTICLE_SUCCESS, {
          ...payload,
          cnt: response.data,
        });
      }
    },

    async fetchIndex({ state, commit }) {
      if (state.index.isload) return;

      commit(MUTATIONS.FETCH_INDEX_REQUEST);

      const response = await request
        .get(INDEX_REQUEST_URL)
        .then(r => r.body)
        .catch(err => ({
          errorCode: ERROR.TIMEOUT,
        }));

      if (response.errorCode !== NO_ERROR) {
        commit(MUTATIONS.FETCH_INDEX_FAILURE, {
          err: new CodeError(response.errorCode),
        });
      } else {
        commit(MUTATIONS.FETCH_INDEX_SUCCESS, {
          index: response.data,
        });
      }
    },
  },
};

