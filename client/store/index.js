import env from 'detect-env'
import request from 'superagent';


const fetch = () => new Promise(resolve => setTimeout(resolve, 4000))

export default {
  strict: env.is.prod ? false : true,

  state: {
    catalog: [],
    article: {},
  },

  actions: {
    fetchCatalog: async ({ state, commit }) => {
      if (state.catalog.length) return

      try {
        const catalog = await request
          .get('/api/tree')
          .then(res => res.body)

        console.log(catalog)
        commit('LOAD_CATELOG', catalog)
      } catch (err) {
        console.log(err)
      }
    }
  },

  mutations: {
    LOAD_CATELOG: (state, catalog) => {
      state.catalog = catalog
    },
    LOAD_ARTICLE: (state, catalog) => {
      // return { ...state, catalog }
    },
    // [MUTATIONS.UPDATE_VALUE](state, payload) {
    //   state.value = payload
    // },
    // [MUTATIONS.UPDATE_FETCH_STATE](state, payload) {
    //   state.isload = payload === FETCH_STATUS.FETCHED
    // },
  },
}
