<template>
  <div>
    <div v-if="load.state === FETCHING" >Loading</div>
    <div v-else-if="load.state === FETCH_FAIL">
      <error-reminder>{{errorTip}}</error-reminder>
    </div>
    <div v-else>
      <header>
        <img src="//api.miaooo.me/v1/author/avatar" />
        <h1>Val.istar.Guo</h1>
        <p>
          <span class="address">{{address.provinces}}</span>
          <span>·</span>
          <span class="company">{{work.company}}</span>
          <span>·</span>
          <span class="job">{{work.job}}</span>
        </p>
      </header>
      <section class="article-list">
        <h2>Writings</h2>
        <ul>
          <li v-for="(name, index) in catalog" :key="index">
            <router-link :to="`/article/${name.title}`">{{name.title}}</router-link>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import titleMixin from 'framework/utils/titleMixin';
import * as FETCH_STATUS from '../contants/fetchStatus';
import combineLoadState from '../utils/combineLoadState';


export default {
  initialData: async function ({ store, route }) {
    await Promise.all([
      store.dispatch('loadAuthorInfo'),
      store.dispatch('loadCatalog'),
    ]);
  },
  mixins: [titleMixin],
  title: 'Val-istar-Guo Introduction',

  data: () => ({
    ...FETCH_STATUS,
  }),

  computed: {
    ...mapState({
      load: state =>
        combineLoadState(state.author.load, state.catalog.load),
      address: state => state.author.address,
      work: state => state.author.work,
      catalog: state => state.catalog.items,
    }),

    errorTip: function () {
      return this.load.errors.map(error => `> ${error.message}`).join('\n')
    },
  },
}

</script>
<style lang="scss" scoped>
@media (max-width: 1023px) {
  header {
    padding-top: 120rem;
    padding-bottom: 60rem;

    h1 {
      font-size: 46rem;
      font-weight: 100;
      margin-bottom: 10rem;
    }

    img {
      width: 160rem;
      height: 160rem;
    }

    p {
      margin: 0;
      font-weight: lighter;
      font-size: 18rem;
      color: #5c5c5c;
    }
  }
}
@media (min-width: 1024px) {
  header {
    padding-top: 200px;
    padding-bottom: 40px;

    h1 {
      font-size: 36px;
      font-weight: 100;
      margin-bottom: 10px;
    }

    img {
      width: 128px;
      height: 128px;
    }

    p {
      margin: 0;
      font-weight: lighter;
      font-size: 12px;
      color: #5c5c5c;
    }
  }
}

header {
  text-align: center;
  user-select: none;

  h1 {
    color: #4A4A4A;
  }
}

.article-list {
  text-align: center;

  h2 {
    color: #4a4a4a;
    font-weight: bolder;
    font-size: 24px;
    display: inline-block;
    position: relative;
    user-select: none;

    &::before,
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      width: 50px;
      height: 2px;
      border-radius: 1px;
      background: #4a4a4a;
    }

    &::before {
      right: 120%;
    }
    &::after {
      left: 120%;
    }
  }

  a {
    color: #4a4a4a;

    font-size: 18px;
    font-weight: normal;
  }

  ul {
    padding: 0 0 60px 0;
    list-style: none;
    li {
      margin: 20px 0;
    }
  }
}
</style>
