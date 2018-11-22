<template>
  <div class="loading">
    <p>Loading...</p>
    <p>{{message}}</p>
  </div>
</template>
<script>
export default {
  props: {
    message: String,
  },
}
</script>
<style lang="postcss" scoped>
.loading {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
}
</style>
