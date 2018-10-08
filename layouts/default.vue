<template>
  <div>
    <Header v-if="checkLogin"></Header>
    <transition name="slide" mode="out-in">
    <nuxt/>
    </transition>
  </div>
</template>

<script>
import Header from '~/components/Header'
export default {
  components: {
    Header,
  },
  middleware: 'userIsAuth',
  computed: {
    checkLogin() {
      if (localStorage.getItem('reqToken') != '' || this.$store.getters.loginStatus) {
        this.$store.commit('SET_LOGIN_STATUS', true)
        this.$router.push('/home')
        return true
      } else {
        this.$router.push('/')
        return false
      }
    }
  },
}
</script>

<style style lang="scss">
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
  .slide-enter-active {
    animation: slide-in .7s ease-out forwards;
  }
  .slide-leave-active {
  animation: slide-out .7s ease-out forwards;
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