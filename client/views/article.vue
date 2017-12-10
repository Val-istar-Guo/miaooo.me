<template>
  <div>
    <div v-if="loadStatus === FETCHING" >Loading</div>
    <div v-else-if="loadStatus === FETCH_FAIL">
      <error-reminder>{{loadError.message}}</error-reminder>
    </div>
    <div v-else class="article-page">
      <header>
        <img src="//api.miaooo.me/v1/author/avatar" />
        <h1>{{article.title}}</h1>
      </header>
      <markdown-article>{{article.content}}</markdown-article>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import * as FETCH_STATUS from '../contants/fetchStatus';


export default {
  initialData: async function ({ store, route }) {
    const { title } = route.params;
    console.log(route.params);
    await store.dispatch('loadArticle', title);
  },

  data: () => ({
    ...FETCH_STATUS,
  }),

  computed: {
    ...mapState({
      loadStatus: 'loadStatus',
      loadError: 'loadError',
      article: function ({ articles }) {
        const { title } = this.$route.params;
        return articles.find(article => article.title === title);
      },
    }),
  },
}
</script>
<style lang="scss" scoped>
.article-page {
  width: 960px;
  margin: 0 auto;
}
header {
  text-align: center;
  padding-top: 160px;

  img {
    width: 128px;
    height: 128px;
  }

  h1 {
    margin-top: 60px;
    margin-bottom: 40px;
  }
}
</style>
