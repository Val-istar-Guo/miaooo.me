<template>
  <div>
    <header>
      <img class="logo" src="../images/logo@10x.jpg" alt="logo" />
      <h1 class="title">Val.istar.Guo</h1>
    </header>

    <loading v-if="loading" />

    <ul v-else class="list">
      <li class="item" v-for="(item, index) of catalog" :key="index">
        <router-link class="content" :to="`/article/${item.title}`">{{item.title}}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  mounted() {
    this.$store.dispatch('fetchCatalog')
      .then(() => this.loading = false)
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    ...mapState(['catalog']),
  },
  methods: {
    afterLoad() {
    }
  }
}
</script>
<style lang="postcss" scoped>
header {
  margin-top: 60px;
  width: 100%;
  text-align: center;
  user-select: none;
  font-size: 0;

  & .logo {
    height: 128px;
    width: 128px;
  }

  & .title {
    margin: 30px 0 0 0;
    padding: 0;
    font-size: 32px;
    font-weight: lighter;
  }
}

.list {
  margin: 60px auto;
  max-width: 800px;
  list-style: none;
  padding: 0 30px;

  & .item {
    position: relative;
    background: #fff;
    border-bottom: 1px solid #f6f6f6;

    cursor: pointer;
    user-select: none;
    white-space: nowrap;

    & .content {
      text-overflow: ellipsis;
      font-size: 20px;
      font-family: monospace;
      text-decoration: none;

      color: #333;
      padding: 30px 30px;
      display: inline-block;
      transform: translateX(0);
      transition: transform .3s;
    }


    &:hover .content {
      transform: translateX(-10px);
    }

  }
}

</style>
