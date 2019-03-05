import env from 'detect-env'
import request from 'framework/request'
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
import imageLinkCorrect from '../utils/imageLinkCorrect'
import highlightCode from 'rehype-prism'


const processor = unified()
  .use(markdown)
  .use(imageLinkCorrect)
  .use(remark2rehype)
  .use(highlightCode, { preLangClass: false })
  .use(html)

const parse = str => new Promise((resolve, reject) => {
  processor.process(str, (err, file) => {
    if (err) reject(err)
    else resolve(file.contents)
  })
})


export default {
  strict: env.is.prod ? false : true,

  state: {
    catalog: [],
    article: {
      loaded: false,
    },
  },

  actions: {
    fetchCatalog: async ({ state, commit }) => {
      if (state.catalog.length) return

      try {
        const catalog = await request
          .get('/api/tree')
          .then(res => res.body)


        commit('LOAD_CATELOG', catalog)
      } catch (err) {
        console.log(err)
      }
    },
    fetchArticle: async ({ state, commit }, path) => {
      if (state.article.path === path) return
      commit('LOAD_ARTICLE', { loaded: false })

      try {
        const article = await request
          .get(encodeURI(`/api/article/${path}`))
          .timeout(200000)
          .then(res => res.body)

        const content = await parse(article.content)

        commit('LOAD_ARTICLE', { ...article, content, loaded: true })
      } catch (err) {
        console.log('fetch article error')
        console.log(err)
      }
    },
  },

  mutations: {
    LOAD_CATELOG: (state, catalog) => {
      state.catalog = catalog
    },
    LOAD_ARTICLE: (state, article) => {
      state.article = article
    },
    // [MUTATIONS.UPDATE_VALUE](state, payload) {
    //   state.value = payload
    // },
    // [MUTATIONS.UPDATE_FETCH_STATE](state, payload) {
    //   state.isload = payload === FETCH_STATUS.FETCHED
    // },
  },
}
