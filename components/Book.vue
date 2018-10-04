<template>
  <div>
    <div class="card mt-5 flex-fill">
      <div class="card-header">
        <div class="container">
          <div class="float-left">
            <h6 class="card-title"><strong>{{book.title}}</strong></h6>
          </div>
          <div class="float-right">
            <input type="checkbox" v-model="checkBook" @input="selectedBook(book.id)" class="font-size-checkbox">
          </div>
        </div>
      </div>
      <div class="card-body">
        <p class="text-justify"><strong>Description: </strong>{{book.description.slice(0,100) + '...'}}</p>
        <p><strong>Category: </strong>{{categoryValue ? categoryValue.name : 'No Category Selected!'}}</p>
        <div class="form-group" v-if="rate">
          <strong>Rate:</strong>
          <star-rating v-model="average" :increment="0.01" :border-width="3" :star-size="25" :read-only="true"></star-rating>
        </div>
      </div>
      <div class="card-footer text-center">
        <nuxt-link tag="button" class="btn btn-outline-primary btn-margin" :to="`/books/${book.id}`">Details <i class="fas fa-info"></i></nuxt-link>
        <button class="btn btn-outline-danger btn-margin" @click="deleteBook(book.id)">Delete <i class="fas fa-trash-alt"></i></button>
        <button class="btn btn-outline-success btn-margin" @click="showEditBook = !showEditBook">Edit <i class="fas fa-user-edit"></i></button>
      </div>
      <transition name="slide" mode="out-in">
      <div v-if="showEditBook">
        <div class="container">
          <div class="ownModal" :class="[showEditBook ? 'showMyModal' : '']">
            <div class="myModalContent">
              <span class="close-button" @click="closeModal"><i class="fas fa-times"></i></span>
              <h3>Modify Book</h3>
              <label class="label-margin-top"><strong>Title:</strong></label>
              <textarea class="form-control text-justify" v-model="newTitle" :placeholder="book.title" rows="2"></textarea>
              <label class="label-margin-top"><strong>Description:</strong></label>
              <textarea class="form-control text-justify" v-model="newDescription" :placeholder="book.description" rows="4"
                cols="5"></textarea>
              <button class="btn btn-outline-primary float-right" @click="modifyBook(book.id, index)">Save <i class="fas fa-cloud"></i></button>
              <label class="label-margin-top"><strong>Rate:</strong></label>
              <star-rating v-model="newRate" :increment="0.5" :border-width="3" :star-size="35"></star-rating>
              <div class="form-group row  mt-3">
                <label for="category" class="col-sm-3 col-form-label"><strong>Category:</strong></label>
                <select v-model="category" class="col-sm-8 col-sm-offset-2 form-control" @change="getSubcategories(category)">
                  <option disabled value="">Please select category</option>
                  <option v-for="(category,index) in categories" :key="index" :value="category.id">{{category.name}}</option>
                  <option value="0">Clear category</option>
                </select>
              </div>
              <div class="form-group row">
                <label for="subcategory" class="col-sm-3 col-form-label"><strong>Subcategory:</strong></label>
                <select v-model="subcategory" class="col-sm-8 col-sm-offset-2 form-control">
                  <option disabled value="">Please select subcategory</option>
                  <option v-for="(subcategory,index) in subcategories" :key="index" :value="subcategory.id">{{subcategory.name}}</option>
                  <option value="0">Clear subcategory</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      </transition>
    </div>
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
        showEditBook: false,
        checkBook: false,
        average: null,
        newRate: null,
        category: '',
        subcategory: '',
        newTitle: this.book.title,
        newDescription: this.book.description
      }
    },
    computed: {
      rate() {
        return this.$store.getters.rates.find(book => {
          if (book.book == this.book.id) {
            return this.$set(this, 'average', Number((book.sum / book.rates).toFixed(2)))
          }
        })
      },
      categoryValue() {
        return this.$store.getters.categories.find(category => {
          if (category.id == this.book.category) {
            return category
          }
        })
      },
      categories() {
        return this.$store.getters.categories
      },
      subcategories() {
        return this.$store.getters.subcategories
      }
    },
    props: ['book', 'index', 'checkMaster'],
    methods: {
      async deleteBook(bookId) {
        try {
          await this.$store.dispatch('DELETE_BOOK', {
            bookId: bookId,
          })
        } catch (e) {
          this.$store.commit('ERROR', e)
        }
      },
      selectedBook(bookId) {
        try {
          this.checkBook = !this.checkBook
          const bookSelected = {}
          this.$set(bookSelected, 'bookId', bookId)
          this.$set(bookSelected, 'index', this.index)
          this.$set(bookSelected, 'checked', this.checkBook)
          this.$store.dispatch('SELECTED_BOOK', bookSelected)
        } catch (e) {
          this.$store.commit('ERROR', e)
        }
      },
      async modifyBook(bookId, index) {
        try {
          if (this.newTitle.length <= 0 || this.newDescription.length <= 0) {
            this.$router.push('books/alertEdit')
          } else {
            await this.$store.dispatch('MODIFY_BOOK', {
              bookId: bookId,
              index: index,
              title: this.newTitle,
              description: this.newDescription,
              rate: this.newRate,
              category: this.category,
              subcategory: this.subcategory
            })
            this.showEditBook = !this.showEditBook
            this.newRate = null
          }
        } catch (e) {
          this.$store.commit('ERROR', e)
        }
      },
      async getSubcategories(value) {
        try {
          await this.$store.dispatch('GET_SUBCATEGORIES', value)
        } catch (e) {
          this.$store.commit('ERROR', e)
        }
      },
      closeModal() {
        this.newTitle = this.book.title
        this.newDescription = this.book.description
        this.showEditBook = !this.showEditBook
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
  .btn-margin {
    margin: 5px;
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
    box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.75);
    border: 1px solid blanchedalmond;
  }

  .starRating {
    margin-bottom: 10px;
  }

  .slide-enter-active {
      animation: slide-in .2s;
  }
  .slide-leave-active {
    animation: slide-out .2s;
  }
  @keyframes slide-in {
    from {
      opacity:0;
      z-index: 0;
    } to {
      opacity: 1;
      z-index: 1;
    }
  }
  @keyframes slide-out {
    from {
      opacity: 1;
      z-index: 1;
    } to {
      opacity: 0;
      z-index: 0;
    }
  }

  @media only screen and (max-width:768px) {
    .btn {
      width: 100%;
    }

    .myModalContent {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      padding: 1rem 1.5rem;
      width: 100%;
      border-radius: 0.5rem;
    }

    .close-button {
      margin-top: 5px;
    }
  }
</style>