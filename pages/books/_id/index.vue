<template>
  <div class="jumbotron">
    <h3 class="text-center"><strong>Title: </strong>{{book.title}}</h3>
    <p class="text-justify mt-3"><strong>Description: </strong>{{book.description}}</p>
    <star-rating v-if="rate" v-model="average" :increment="0.01" :border-width="3" :star-size="35" :read-only="true"></star-rating>
    <p v-else>No Rate yet!</p>
  </div>
</template>

<script>
  import StarRating from 'vue-star-rating'
  export default {
    components: {
      'star-rating': StarRating
    },
    data() {
      return {
        average: null
      }
    },
    computed: {
      book() {
        return this.$store.getters.books.find(book => {
          return book.id == this.$route.params.id
        })
      },
      rate() {
        return this.$store.getters.rates.find(book => {
          if (book.book == this.$route.params.id) {
            return this.average = Number((book.sum / book.rates).toFixed(2))
          }
        })
      }
    },
  }

</script>

<style scoped>

</style>
