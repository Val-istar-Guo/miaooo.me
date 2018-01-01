<template>
  <article class="markdown-article" v-html="content"></article>
</template>
<script>
// import markdown from 'markdown-it';
import md from '../utils/md';

console.log(md);
// const md = markdown();

export default {
  computed: {
    content: function () {
      const source = this.$slots.default
        .map(slot => slot.text)
        .join('');

      console.log('---------------------------------');
      const a = md.parse(source);
      if (a && a.toHtml) {
        console.log('have toHtml: ', a);
        // console.log(a.toHtml());
      } else {
        console.log('not have toHtml: ', a);
      }
      // console.log('aaaaaaaaaaaaaaaa: ', md.parse(source));
      return md.parse(source).toHtml();
      // return md.parse('## a', { isDebug: true }).toHtml();
      // return '';

      // return md.render(source);
    },
  },

  mounted: function () {
    // console.log(md.parse('# a', { isDebug: true }).toHtml());
  },
}
</script>
<style lang="scss">
.markdown-article {
  color: #4A4A4A;

  h1 {
    display: none;
  }

  pre {
    overflow-x: auto;
  }
}

@media (max-width: 1023px) {
  .markdown-article {
    $font-size: 24rem;
    font-size: $font-size;
    font-weight: 300;
    line-height: 1.7;

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
