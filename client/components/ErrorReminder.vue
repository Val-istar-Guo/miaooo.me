<template>
  <div class="absolute-center">
    <div>
      <h1 class='error-title'>页面无法载入</h1>
      <p class='text error-info'><slot></slot></p>
    </div>
  </div>
</template>
<<script>
export default {
}
</script>
<style lang="scss" scoped>
.absolute-center {
  height: 100vh;
  width: 100vw;
  position: relative;

  > div {
    margin: auto;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

</style>
