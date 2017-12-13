<template>
  <div>
    <header>
      <img src="" />
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
header {
  padding-top: 200px;
  padding-bottom: 40px;
  text-align: center;

  h1 {
    font-size: 36px;
    font-weight: 100;
    color: #4A4A4A;
  }

  p {
    font-weight: 100;
    font-size: 24px;
  }
}
</style>
