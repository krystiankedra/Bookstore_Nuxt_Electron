<template>
  <div>
    <div class="card mt-5">
      <div class="card-body">
        <div class="text-center">
          <input type="checkbox" v-model="checkBook" @input="selectedBook(book.id)" class="font-size-checkbox">
        </div>
        <h5 class="card-title text-center"><strong>{{book.title}}</strong></h5>
        <p class="text-justify">{{book.description.slice(0,70) + '...'}}</p>
        <nuxt-link :to="`/books/${book.id}`">
          <p class="text-center"><img class="img-thumbnail" :src="bookPhoto"></p>
        </nuxt-link>
        <star-rating v-if="rate" v-model="average" :increment="0.01" :border-width="3" :star-size="25" :read-only="true"></star-rating>
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
  import StarRating from 'vue-star-rating'
  import bookPhoto from '~/assets/bookPhoto.png'
  import Edit from '~/components/Edit'
  export default {
    components: {
      Edit,
      'star-rating': StarRating
    },
    data() {
      return {
        showEditLi: false,
        checkBook: false,
        bookPhoto,
        average: null
      }
    },
    computed: {
      rate() {
        return this.$store.getters.rates.find(book => {
          if (book.book == this.book.id) {
            return this.$set(this, 'average', Number((book.sum / book.rates).toFixed(2)))
          }
        })
      }
    },
    props: ['book', 'index', 'checkMaster'],
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
        this.checkBook = !this.checkBook
        const bookSelected = {}
        this.$set(bookSelected, 'bookId', bookId)
        this.$set(bookSelected, 'index', this.index)
        this.$set(bookSelected, 'checked', this.checkBook)
        this.$store.dispatch('SELECTED_BOOK', bookSelected)
      }
    },
    watch: {
      checkMaster() {
        this.checkMaster ? this.selectedBook(this.book.id) : (this.checkBook = !this.checkBook, this.$store.state.selectedBooks = [])
      }
    }
  }

</script>

<style scoped>
  .font-size-checkbox {
    width: 20px;
    height: 20px;
  }
  button {
    margin-top: 10px;
  }
</style>
