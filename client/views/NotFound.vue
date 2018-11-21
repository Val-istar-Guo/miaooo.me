<template>
  <div>
    <h1 class="header">NOT FOUND</h1>
    <p class="message">{{message}}</p>
  </div>
</template>
<script>
import mapQuery from '../utils/mapQuery'

export default {
  computed: {
    ...mapQuery(['message', 'callback_url', 'callback_description'])
  },
}
</script>

<style lang="postcss" scoped>
.header {
  font-size: 168px;
  letter-spacing: 20px;
  line-height: 1.2;
  font-weight: lighter;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.message {
  font-size: 24px;
  text-align: center;

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
