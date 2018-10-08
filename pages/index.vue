<template>
    <Login></Login>
</template>

<script>
import Login from '~/components/Login'
export default {
  components: {
    Login,
  },
  async mounted() {
    try {
      await this.$store.dispatch('GET_BOOKS')
    } catch (e) {
      this.$store.commit(e)
    }
  }
}
</script>
