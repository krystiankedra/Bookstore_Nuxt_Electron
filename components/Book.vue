<template>
  <div>
    <div class="card mt-5">
      <div class="card-body">
        {{checkMasterInput}}
        <input type="checkbox" v-model="checkBook" @input="selectedBook(book.id)">
        <h5 class="card-title"><strong>Title: </strong>
          <nuxt-link :to="`/books/${book.id}`">{{book.title}}</nuxt-link>
        </h5>
        <p><strong>Descripttion: </strong>{{book.description.slice(0,30) + '...'}}</p>
        <p class="text-center"><img class="img-thumbnail" :src="bookPhoto"></p>
        <button class="btn btn-danger float-right" @click="deleteBook(book.id, index)">Delete</button>
        <button class="btn btn-success float-left" @click="showEdit">Edit</button>
      </div>
      <div v-if="showEditLi">
        <Edit :book="book" :index="index" @changeShow="showEditLi = !showEditLi"></Edit>
      </div>
    </div>
  </div>
</template>

<script>
  import bookPhoto from '~/assets/bookPhoto.png'
  import Edit from '~/components/Edit'
  export default {
    props: ['masterCheck'],
    components: {
      Edit,
    },
    data() {
      return {
        showEditLi: false,
        checkBook: false,
        bookPhoto,
      }
    },
    props: ['book', 'index'],
    methods: {
      async deleteBook(bookId, index) {
        try {
          await this.$store.dispatch('DELETE_BOOK', {
            bookId: bookId,
            index: index
          })
        } catch (e) {
          console.log(e);
        }
      },
      showEdit() {
        this.showEditLi = !this.showEditLi
      },
      selectedBook(bookId) {
        this.checkBook = true
        const bookSelected = {}
        this.$set(bookSelected, 'bookId', bookId)
        this.$set(bookSelected, 'index', this.index)
        this.$set(bookSelected, 'checked', this.checkBook)
        this.$store.dispatch('SELECTED_BOOK', bookSelected)
      }
    },
    computed: {
      checkMasterInput() {
        if (this.$store.getters.masterCheck) {
          this.checkBook = true
          let bookSelected = {}
          this.$set(bookSelected, 'bookId', this.book.id)
          this.$set(bookSelected, 'index', this.index)
          this.$set(bookSelected, 'checked', this.checkBook)
          setTimeout(() => {
            this.$store.dispatch('SELECTED_BOOK', bookSelected)
          }, 10)
        } else {
          this.checkBook = false
        }
      }
    }
  }
</script>

<style>
</style>
