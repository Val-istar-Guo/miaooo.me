<template lang="html">
  <div class="loading">

    <p class="loading-text"><slot></slot></p>

    <div class="loading-animate-cnt">
      <div class="loading-rectangle first"></div>
      <div class="loading-rectangle"></div>
      <div class="loading-rectangle"></div>
      <div class="loading-rectangle"></div>
      <div class="loading-rectangle last">
    </div>

    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss", scoped>
.loading {
  text-align: center;
}

.loading-animate-cnt {
  font-size: 0;
}

.loading-rectangle {
  display: inline-block;

  width: 20px;
  height: 20px;

  background: #404040;
  margin-left: 1px;
  border-radius: 2px;

  &.first {
    margin: 0;
    animation: move-right 1.6s ease-in-out infinite;
  }

  &.last {
    animation: move-left 1.6s ease-in-out .8s infinite;
  }
}

.loading-text {
  font-size: 12px;
  font-weight: bold;
  color: #A0A0A0;

  text-transform: uppercase;
}

@keyframes move-left {
  0% {
    transform: translateX(0px);
  }

  25% {
    transform: translateX(16px);
  }

  50% {
    transform: translateX(0px);
  }

  100% {
    transform: translateX(0px);
  }
}

@keyframes move-right {
  0% {
    transform: translateX(0px);
  }

  25% {
    transform: translateX(-16px);
  }

  50% {
    transform: translateX(0px);
  }

  100% {
    transform: translateX(0px);
  }
}

</style>
