<template lang="html">
  <div class='page'>

    <div class='right-bar'>
      <h2 class='article-nav-header'>Val-istar-Guo</h2>
      <article-nav></article-nav>
    </div>

    <aside v-if="ispc">
      <blog :name="lastArticleName"></blog>
    </aside>

  </div>
</template>

<script>
import { mapState } from 'vuex';


export default {

  computed: {
    ...mapState({
      index: state => state.articles.index,
      ispc: 'ispc',
    }),

    lastArticleName: function () {
      if (this.index.isload) {
        const indexData = this.index.data;

        if (this.index.isload && indexData.length) {
          return indexData[indexData.length - 1].name;
        }

        return undefined;
      }
    },
  },

  mounted () {
    this.$store.dispatch('fetchIndex');
  },
};
</script>

<style lang="scss", scoped>
.page {
  padding: 0 48px;
}

.article-nav-header {
  color: #000000;
  font-size: 16px;
  font-weight: bolder;

  margin-top: 60px;
}

.article-nav-header {
  font-size: 16px;
  font-weight: bolder;
}

.pc {
  .article-nav-header {
    padding-bottom: 12px;
    border-bottom: 4px solid #404040;
  }
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

  .article-nav {
    padding: 0 4px;
  }

  .right-bar {
    float: right;
    width: 240px;

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

