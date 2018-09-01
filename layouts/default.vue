<template>
  <div>
    <Header></Header>
    <nuxt/>
  </div>
</template>

<style style lang="scss">
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>

<script>
import Header from '~/components/Header'
export default {
  components: {
    Header,
  }
}
</script>

