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
          <p class="text-center"><img class="img-fluid" :src="bookPhoto" alt="Click here to more info about book"></p>
        </nuxt-link>
        <star-rating v-if="rate" v-model="average" :increment="0.01" :border-width="3" :star-size="25" :read-only="true"></star-rating>
        <button class="btn btn-danger float-right" @click="deleteBook(book.id, index)">Delete <i class="fas fa-trash-alt"></i></button>
        <button class="btn btn-success float-left" @click="showEditBook = !showEditBook">Edit <i class="fas fa-user-edit"></i>
        </button>
      </div>
      <div v-if="showEditBook">
        <div class="container">
          <div class="ownModal" :class="[showEditBook ? 'showMyModal' : '']">
            <div class="myModalContent">
              <span class="close-button" @click="showEditBook = !showEditBook"><i class="fas fa-times"></i></span>
              <h3>Modify Book</h3>
              <label class="label-margin-top"><strong>Title:</strong></label>
              <textarea class="form-control text-justify" v-model="book.title" rows="2"></textarea>
              <label class="label-margin-top"><strong>Description:</strong></label>
              <textarea class="form-control text-justify" v-model="book.description"
                rows="10" cols="5"></textarea>
              <label class="label-margin-top"><strong>New Rate:</strong></label>
              <star-rating v-model="newRate" :increment="0.5" :border-width="3" :star-size="35"></star-rating>
              <button class="btn btn-primary float-right" @click="modifyBook(book.id, index)">Save <i class="fas fa-cloud"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import StarRating from 'vue-star-rating'
  import bookPhoto from '~/assets/book.png'
  export default {
    components: {
      'star-rating': StarRating
    },
    data() {
      return {
        showEditBook: false,
        checkBook: false,
        bookPhoto,
        average: null,
        newRate: null,
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
      selectedBook(bookId) {
        this.checkBook = !this.checkBook
        const bookSelected = {}
        this.$set(bookSelected, 'bookId', bookId)
        this.$set(bookSelected, 'index', this.index)
        this.$set(bookSelected, 'checked', this.checkBook)
        this.$store.dispatch('SELECTED_BOOK', bookSelected)
      },
      async modifyBook(bookId, index) {
        try {
          if (this.book.title.length <= 0 || this.book.description.length <= 0) {
            this.$router.push('books/alertEdit')
          } else {
            await this.$store.dispatch('MODIFY_BOOK', {
              bookId: bookId,
              index: index,
              title: this.book.title,
              description: this.book.description,
              rate: this.newRate
            })
            this.showEditBook = !this.showEditBook
            this.newRate = null
          }
        } catch (e) {
          console.log(e);
        }
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
  img {
    transition: .5s ease-in-out ;
    transform: scale(0.7);
  }

  img:hover{
    transform: scale(1);
  }

  .font-size-checkbox {
    width: 20px;
    height: 20px;
  }

  button {
    margin-top: 10px;
  }

  .ownModal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transform: scale(1.1);
    transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s;
  }

  .myModalContent {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 1rem 1.5rem;
    width: 50%;
    border-radius: 0.5rem;
  }

  .close-button {
    float: right;
    width: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    cursor: pointer;
    border-radius: 0.25rem;
    background-color: lightgray;
  }

  .close-button:hover {
    background-color: darkgray;
  }

  .showMyModal {
    z-index: 1;
    opacity: 1;
    visibility: visible;
    transform: scale(1.0);
    transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;
  }

  .settings-text-area {
    resize: none;
  }

  .label-margin-top {
    margin-top: 10px;
  }

  .alert-margin {
    margin-top: 10px;
    margin-bottom: 0;
  }

  .card {
    box-shadow: 10px 10px 30px 0px rgba(0,0,0,0.75);
    background-color: rgba(126,214,223, 0.4);
  }
</style>