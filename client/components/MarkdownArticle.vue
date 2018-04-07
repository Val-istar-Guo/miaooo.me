<template>
  <article class="markdown-article" v-html="content"></article>
</template>
<script>
import md from '../utils/md';
import 'highlight.js/styles/github.css';


export default {
  computed: {
    content: function () {
      const source = this.$slots.default
        .map(slot => slot.text)
        .join('');

      const a = md.parse(source);
      return md.parse(source).toHTML();
    },
  },
}
</script>
<style lang="scss">
.markdown-article {
  color: #4A4A4A;

  h1 {
    display: none;
  }

  h6 {
    text-align: center;
    color: #333;
  }

  pre {
    overflow-x: auto;
    font-size: 16px;
    line-height: 1.6;
    background: #f7f7f7;
    padding: 10px 20px;
  }

  pre * {
    font-family: Monospace !important;
  }
}

@media (max-width: 1023px) {
  .markdown-article {
    $font-size: 24rem;
    font-size: $font-size;
    font-weight: 300;
    line-height: 1.7;

    h6 {
      font-size: 22rem;
    }

    a {
      color: #EF4459;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }

    p {
      text-indent: 2 * $font-size;
      text-align: justify;
    }
  }
}

@media (min-width: 1024px) {
  .markdown-article {
    font-size: 18px;
    font-weight: 300;
    color: #4A4A4A;
    line-height: 32px;

    h6 {
      font-size: 16px;
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
}
</style>
