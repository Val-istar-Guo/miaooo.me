<template>
  <article class="markdown-article">
    <vue-markdown><slot></slot></vue-markdown>
  </article>
</template>
<script>
import VueMarkdown from 'vue-markdown';


export default {
  components: {
    'vue-markdown': VueMarkdown,
  },
}
</script>
<style lang="scss">
.markdown-article {
  font-size: 18px;
  font-weight: 300;
  color: #4A4A4A;
  line-height: 32px;

  h1 {
    display: none;
  }

  a {
    color: #EF4459;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  p {
    text-indent: 36px;
  }
}
</style>
