<template>
  <div>
    <header>
      <img src="//api.miaooo.me/v1/author/avatar" />
      <h1>Val.istar.Guo</h1>
      <p>尚未竣工</p>
    </header>
  </div>
</template>
<script>
import titleMixin from 'framework/utils/titleMixin';


export default {
  mixins: [titleMixin],
  title: 'Val-istar-Guo Introduction',
}
</script>
<style lang="scss" scoped>
@media (max-width: 1023px) {
  header {
    padding-top: 200rem;
    padding-bottom: 40rem;

    h1 {
      font-size: 36rem;
      font-weight: 100;
    }

    img {
      width: 128rem;
      height: 128rem;
    }

    p {
      font-weight: 100;
      font-size: 36rem;
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
    }

    img {
      width: 128px;
      height: 128px;
    }

    p {
      font-weight: 100;
      font-size: 24px;
    }
  }
}

header {
  text-align: center;

  h1 {
    color: #4A4A4A;
  }
}
</style>
