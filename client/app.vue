<template lang="html">
  <div id="app" :class="{pc: ispc}">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import * as MUTATIONS from './contants/mutations';


export default {
  computed: mapState(['ispc']),

  mounted() {
    window.onresize = () => {
      this.$store.commit(MUTATIONS.RECALCULATE_DIVICE_SIZE, {
        width: document.documentElement.clientWidth,
      })
    };
  },
}
</script>

<style lang="scss">
</style>
