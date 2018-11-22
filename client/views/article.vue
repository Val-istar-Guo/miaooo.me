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
.page {
  width: 1024px;
  margin: 0 auto;
  /* padding-top: 180px; */
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
</style>
<style lang="postcss">
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

  & > p {
    text-indent: 2em;
  }

  & img {
    display: inline-block;
    margin: 2em 0;
  }

  & ul p {
    text-indent: 0;
    margin: 0;
  }

  & li {
    padding: .2em 0 .2em .5em;
  }

  & ul {
    margin: 0.2rem 0;
  }

  & blockquote {
    margin-left: 0;
    font-size: 16px;
    border-left: 4px solid #F95959;
    font-weight: normal;
    padding: 0px 20px;
    color: #666;
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

  /* & ul {
    margin: 1em 0;
  } */

  & pre {
    /* background: #f3f3f3; */
    padding: 2rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);

    & code {
      background: transparent;
    }
  }
}

</style>

