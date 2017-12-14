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
import titleMixin from 'framework/utils/titleMixin';
import { mapState, mapGetters } from 'vuex';
import * as FETCH_STATUS from '../contants/fetchStatus';


export default {
  initialData: async function ({ store, route }) {
    const { title } = route.params;
    console.log(route.params);
    await store.dispatch('loadArticle', title);
  },

  mixins: [titleMixin],
  title: function () {
    console.log('mixin title');
    return this.$route.params.title;
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
@media (max-width: 1023px) {
  .article-page {
    width: 80vw;
  }

  header {
    padding-top: 30%;

    img {
      width: 128rem;
      height: 128rem;
    }

    h1 {
      font-size: 36rem;
      margin-top: 60rem;
      margin-bottom: 40rem;
    }
  }
}

@media (min-width: 1024px) {
  .article-page {
    width: 960px;
  }

  header {
    padding-top: 160px;

    img {
      width: 128px;
      height: 128px;
    }

    h1 {
      font-size: 36px;
      margin-top: 60px;
      margin-bottom: 40px;
    }
  }
}

.article-page {
  margin: 0 auto;
}

header {
  text-align: center;
}

</style>
