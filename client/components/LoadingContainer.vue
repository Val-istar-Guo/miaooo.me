<template>
  <div class="loading-container">
    <loading v-if="loading" :message="message" />
    <slot v-else></slot>
  </div>
</template>
<script>
export default {
  props: {
    message: String,
    loading: Boolean,
  },
}
</script>
<style lang="postcss" scoped>
.loading-container {
  position: relative;
  height: 100%;
}
</style>
