<template>
  <div>
    <Header></Header>
    <transition name="slide" mode="out-in">
    <nuxt/>
    </transition>
  </div>
</template>

<style style lang="scss">
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
  .slide-enter-active {
    animation: slide-in 1s ease-out forwards;
  }
  .slide-leave-active {
  animation: slide-out 1s ease-out forwards;
  }
  @keyframes slide-in {
    from {
      opacity:0;
      transform: translateY(-20px);
    } to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes slide-out {
    from {
      opacity: 1;
      transform: translateY(0);
    } to {
      opacity: 0;
      transform: translateY(-20px)
    }
  }
</style>

<script>
import Header from '~/components/Header'
export default {
  components: {
    Header,
  }
}
</script>