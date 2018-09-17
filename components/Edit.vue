<template>
  <div class="container">
    <div class="form-group row">
      <label class="col-form-label">Title:</label>
      <input type="text" class="form-control from-group" v-model="book.title">
    </div>
    <div class="form-group row">
      <label class="col-form-label">Description:</label>
      <textarea class="form-control from-group text-justify" type="text" v-model="book.description" rows="10"></textarea>
    </div>
    <star-rating v-model="rate" :increment="0.5" :border-width="3" :star-size="35" class="custom-text"></star-rating>
    <button @click="modifyBook(book.id, index)" class="btn btn-primary float-right">Save</button>
  </div>
</template>

<script>
  import StarRating from 'vue-star-rating'
  export default {
    data() {
      return {
        rate: null
      }
    },
    components: {
      'star-rating': StarRating,
    },
    props: ['book', 'index'],
    methods: {
      async modifyBook(bookId, index) {
        try {
          if (this.book.title.length <= 0 || this.book.description.length <= 0 ) {
            this.$router.push('books/alertEdit')
          } else {
          await this.$store.dispatch('MODIFY_BOOK', {
            bookId: bookId,
            index: index,
            title: this.book.title,
            description: this.book.description,
            rate: this.rate
          })
          this.$emit('changeShow')
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  }

</script>

<style>

</style>
