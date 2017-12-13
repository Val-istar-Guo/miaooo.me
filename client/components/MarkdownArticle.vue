<template>
  <article class="markdown-article" v-html="content"></article>
</template>
<script>
import markdown from 'markdown-it';


const md = markdown();

export default {
  computed: {
    content: function () {
      const source = this.$slots.default
        .map(slot => slot.text)
        .join('');

      return md.render(source);
    },
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
