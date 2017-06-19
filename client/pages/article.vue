<template lang="html">
  <div class="page">
    <aside class="article-nav" v-if="ispc">
      <h2 class='article-nav-header'>Val-istar-Guo</h2>
      <article-nav></article-nav>
    </aside>

    <blog :name="name"></blog>
  </div>
</template>

<script>
import { mapState } from 'vuex';


export default {

  computed: {
    ...mapState(['ispc']),

    name: function () {
      return this.$route.params.name;
    },
    isload: function () {
      return this.$store.getters.isLoadArticle(this.name);
    },
    article: function () {
      return this.$store.getters.articles[this.name];
    },
  },

  watch: {
    name: function (value) {
      console.log('article page name changed', value);
      this.$store.dispatch('fetchArticle', {
        name: value,
      });
    },
  },

  mounted() {
    this.$store.dispatch('fetchArticle', {
      name: this.name,
    });
  },
};
</script>

<style lang="scss", scoped>
.page {
  padding: 0 48px;
}

.pc {
  .page {
    margin-left: 6%;
    margin-right: 6%;
    margin-top: 60px;
    margin-bottom: 60px;
  }
  .blog {
    margin-right: 270px;
    padding: 10px 40px;

    background: white;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  }
  aside {
    float: right;
    width: 240px;
  }

  .article-nav {
    padding: 0 4px;
  }

  .article-nav-header {
    color: #404040;
    font-size: 16px;
    font-weight: bolder;

    margin-top: 12px;
    padding-bottom: 12px;
    border-bottom: 4px solid #404040;
  }

}

</style>
