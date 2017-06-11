<template lang="html">
  <div class='page'>
    <header>Val-istar.Guo</header>
    <div>

      <loading v-if="!index.isload">loading index</loading>

      <div v-if='index.isload && index.error' class='error'>
        <h6 class='error-title'>{{index.error.message.title}}</h6>
        <ol>
          <li v-for='reason of index.error.message.reasons' class='error-reason'>{{reason}}</li>
        </ol>
      </div>

      <ul class='index' v-if="index.isload && !index.error">
        <li v-for="article of index.data">
          <router-link class="link" :to="`/article/${article.name}`">
            <h2 class='index-title'>{{article.name}}</h2>
            <p class='index-des'>{{article.des}}</p>
          </router-link>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';


export default {

  computed: {
    ...mapState({
      index: state => state.articles.index,
    }),
  },

  mounted () {
    this.$store.dispatch('fetchIndex');
  },
};
</script>

<style lang="scss", scoped>
.page {
  padding: 0 48px;
  overflow: hidden;
}
header {
  color: #000000;
  font-size: 16px;
  font-weight: bolder;

  margin-top: 60px;
}

.loading {
  margin-top: 32vh;
}

.error {
  height: 100%;

  margin-top: 120px;
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

.index {
  list-style: none;
  margin: 25px 0 0 0;
  padding: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.06);

  li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }
}

.link{
  display: block;
  text-decoration: none;
  color: #404040;
  padding: 6px 0;
}

.index-title {
  color: #404040;
  font-size: 16px;
  font-weight: bold;
}

.index-des {
  color: #7F7F7F;
  font-size: 14px;
}
</style>
