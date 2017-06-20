<template lang="html">
  <div class='blog'>
    <loading v-if="!isload">loading article</loading>

    <div v-if='isload && article.error' class='error'>
      <h6 class='error-title'>{{article.error.message.title}}</h6>
      <ol>
        <li v-for='reason of article.error.message.reasons' class='error-reason'>{{reason}}</li>
      </ol>
    </div>

    <article v-if="isload && !article.error" class='article-markdown-module-used-vue-markdown-to-parse'>
      <vue-markdown class='markdown' :toc-first-level="1" :source="article.cnt"></vue-markdown>
    </article>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import VueMarkdown from 'vue-markdown';


export default {
  props: ['name'],
  components: {
    'vue-markdown': VueMarkdown,
  },

  computed: {
    ...mapState(['ispc']),

    isload: function () {
      return this.$store.getters.isLoadArticle(this.name);
    },
    article: function () {
      return this.$store.getters.articles[this.name];
    },
  },

  watch: {
    name: function (value) {
       this.$store.dispatch('fetchArticle', {
        name: value,
      });
    }
  },

  mounted() {
    if (name) {
      this.$store.dispatch('fetchArticle', {
        name: this.name,
      });
    }
  },

};
</script>

<style lang="scss", scoped>
.loading {
  margin-top: 32vh;
}

.error {
  height: 100%;

  margin-top: 32vh;
}

.error-title {
  font-size: 16px;
  font-weight: bolder;
  text-align: center;

  color: #7F7F7F;
  margin: 6px;
}

.error-reason {
  font-size: 14px;
  color: #7F7F7F;

  line-height: 1.25;
  margin: 5px 0;
  padding-left: 3px;
}

.article-nav {
  float: left;
}
</style>

<style lang="scss">
// use such name just for unique
.article-markdown-module-used-vue-markdown-to-parse {
  overflow: hidden;
  font-size: 14px;
  color: #404040;
  line-height: 1.5;
  text-align: justify;
  word-wrap: break-word;
  word-break: normal;

  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bolder;
    padding-top: 12px;
  }

  h1 {
    color: #000000;
    font-size: 16px;
    font-weight: bolder;

    margin-top: 60px;
  }

  h2 {
    font-size: 15px;
  }

  h3 {
    font-size: 14px;
  }

  h4 {
    font-size: 13px;
  }

  h5 {
    font-size: 12px;
  }

  p {
    text-indent: 28px;
  }

  pre {
    padding: 15px 10px;
    border-radius: 2px;
    background: rgba(0, 0, 0, 0.05);

    overflow-x: auto;
  }

  a {
    text-decoration: none;
    color: #FA8F2B;
  }

  blockquote {
    margin: 0;
    overflow-y: hidden;
    padding-left: 20px;
    padding-right: 8px;
    border-radius: 2px;

    border-left: 6px solid rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.05);
  }
}

</style>

