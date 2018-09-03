<template>
  <div class="container mt-5">
    <div class="form-group row">
      <label class="col-sm-2 col-form-label">
        New Title
      </label>
      <input type="text" class="col-sm-8 col-sm-offset-2 form-control" placeholder="Type new Title..."  v-model="title">
    </div>
    <div class="form-group row">
      <label for="" class="col-sm-2 col-form-label">New Description</label>
      <input type="text" class="col-sm-8 col-sm-offset-2 form-control" placeholder="Type new Description..."  v-model="description">
    </div>
    <div class="form-group row">
      <button class="btn btn-success col-sm-1 offset sm-11" @click="addBook">Add Book</button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        description: ''
      }
    },
    methods: {
      async addBook() {
        try {
        if (this.title.length <= 0 || this.description.length <= 0 ) {
          this.$router.push('alert')
        } else {
          const newBook = {}
          this.$set(newBook, 'title', this.title)
          this.$set(newBook, 'description', this.description)
          await this.$store.dispatch('SEND_BOOK', newBook)
          this.$router.push('/books')
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
