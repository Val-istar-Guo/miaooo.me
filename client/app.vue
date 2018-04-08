<template lang="html">
  <div id='app'>
    <router-view></router-view>
  </div>
</template>

<script>
import './components';
export default {
}
</script>

<style lang="postcss">
@import './styles/index.css';

@media (max-width: 1023px) {
  html {
    font-size: (24 / 36) + px;
  }
}
</style>

