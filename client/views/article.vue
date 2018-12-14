<template>
  <div class="page">
    <div class="nav">
      <img class="logo" src="../images/logo_without_white.svg" alt="logo" />

      <span class="name">Val-istar-Guo</span>
    </div>

    <loading-container :loading="loading">
      <article class="article" v-html="content" />
    </loading-container>

    <footer>©2018 Val-istar-Guo</footer>
  </div>
</template>
<script>
import 'prismjs/themes/prism-coy.css'
import { mapState } from 'vuex';


export default {
  initialData: async function ({ store, route }) {
    const { title } = route.params
    await store.dispatch('fetchArticle', title)
      .then(() => this.loading = false)
  },

  computed: {
    ...mapState({
      loading: state => !state.article.loaded,
      title: state => state.article.title,
      content: state => state.article.content,
    }),
  },
}
</script>
<style lang="postcss" scoped>
@custom-media --mobile-screen (width <= 750px);

.page {
  width: 1024px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.loading-container {
  min-height: 60vh;
}

.nav {
  margin-top: 30px;
  text-align: right;
  user-select: none;

  & .name {
    display: inline-block;
    line-height: 24px;
    vertical-align: top;
    font-size: 16px;
    margin-left: 8px;
  }

  & .logo {
    display: inline-block;
    width: 24px;
    height: 24px;
    vertical-align: top;
  }
}

footer {
  margin: 100px 0 40px 0;
  text-align: center;
  color: #ccc;
  font-size: 18px;
  user-select: none;
}

@media (--mobile-screen) {
  .page {
    width: 92vw;
    padding: 0 4vw;
  }

  .nav {
    display: none;
  }

  footer {
    margin: 14vw 0 6vw 0;
    font-size: 4.8vw;
  }
}

</style>
<style lang="postcss">
@custom-media --mobile-screen (width <= 750px);

.article {
  font-weight: normal;
  line-height: 1.5;
  font-size: 18px;
  color: #333;

  & > h1 {
    font-size: 48px;
    font-weight: lighter;
    line-height: 1;
    margin: 120px 0 0px 0;
    padding: 0;
    user-select: none;
  }

  & > h6 {
    font-size: 18px;
    margin: 30px 0 80px 0;
  }

  & h2 {
    position: relative;
    font-size: 28px;
    color: #555;
    font-weight: bold;
    line-height: 1;
    margin: 70px 0 42px 0;
    /* border-left: 6px solid #555; */
    /* padding-left: 10px; */

    &::before {
      display: block;
      content: ' ';
      position: absolute;
      left: -15px;

      width: 6px;
      height: 6px;
      background: #555;
    }
  }

  & h3 {
    position: relative;
    font-size: 24px;
    color: #555;
    font-weight: bold;
    line-height: 1;
    margin: 50px 0 30px 0;

    &::before {
      display: block;
      content: ' ';
      position: absolute;
      top: 0;
      left: -15px;

      width: 6px;
      height: 6px;
      background: #555;
    }

    &::after {
      display: block;
      content: ' ';
      position: absolute;
      top: 8px;
      left: -15px;

      width: 6px;
      height: 6px;
      background: #555;
    }
  }

  & a {
    color: #F95959;
    text-decoration: none;
  }

  & > p {
    text-indent: 2em;
  }

  & img {
    display: inline-block;
    margin: 2em 0;
    max-width: 90%;
  }

  & ul p {
    text-indent: 0;
    margin: 0;
  }

  & li {
    padding: .2em 0;
  }

  & ul {
    margin: 0.2em 0;
  }

  & blockquote {
    margin-left: 0;
    font-size: 16px;
    border-left: 4px solid #F95959;
    font-weight: normal;
    padding: 0px 20px;
    color: #666;
    margin: 0;
  }

  & code {
    display: inline-block;
    padding: 0 0.4em;
    /* background: #59a9f9; */
    /* background: #f7f7f7; */
    border-radius: 2px;
    color: #666;
    text-indent: 0;
    font-family: monospace;
  }

  & pre {
    padding: 1em 2em;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    overflow-x: auto;

    & code {
      background: transparent;
    }
  }
}

@media (--mobile-screen) {
.article {
  font-size: 4.8vw;

  & > h1 {
    font-size: 8vw;
    font-weight: bolder;
    margin: 16vw 0 0 0;
  }

  & > h6 {
    font-size: 4vw;
    margin: 4vw 0 10vw 0;
    color: #999;
    line-height: 1;
  }

  & h2 {
    position: relative;
    font-size: 5.6vw;
    margin: 9vw 0 5.6vw 2vw;

    &::before {
      left: -2vw;
      width: 1vw;
      height: 1vw;
    }
  }

  & h3 {
    font-size: 5.2vw;
    margin: 6.6vw 0 4vw 2vw;

    &::before {
      left: -2vw;
      width: 1vw;
      height: 1vw;
    }

    &::after {
      top: 2vw;
      left: -2vw;
      width: 1vw;
      height: 1vw;
    }
  }

  & blockquote {
    font-size: 4.2vw;
    border-left: 1vw solid #F95959;
    padding: 0 3vw;
  }

  & code {
    border-radius: 0.2vw;
  }

  & pre {
    box-shadow: 0 0 2vw rgba(0, 0, 0, 0.1);
  }
}
}
</style>

