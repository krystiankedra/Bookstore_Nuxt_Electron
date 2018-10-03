<template>
  <div class="container">
    <div class="card mt-5">
      <div class="card-header text-center">
        <strong>Title: </strong>{{valueOfBook.title}}
      </div>
      <div class="card-body">
        <p class="text-justify mt-3"><strong>Description: </strong>{{valueOfBook.description}}</p>
        <p class="text-justify mt-3"><strong>Category: </strong>{{valueOfCategory.name}}</p>
        <p class="text-justify mt-3"><strong>Subcategory: </strong>{{valueOfSubcategory.name}}</p>
        <strong>Rate:</strong>
        <star-rating v-if="rate" v-model="average" :increment="0.01" :border-width="3" :star-size="25" :read-only="true"></star-rating>
        <nuxt-link tag="button" class="btn btn-outline-danger float-right" :to="`/books`">Back to book list <i class="fas fa-sign-out-alt"></i></nuxt-link>
      </div>
      <div class="card-footer text-center">
        <button class="btn btn-outline-danger float-left" @click="deleteBook">Delete <i class="fas fa-trash-alt"></i></button>
        <button class="btn btn-outline-success float-right" @click="showEditBook = !showEditBook">Edit <i
            class="fas fa-user-edit"></i></button>
      </div>
    </div>
    <div v-if="showEditBook">
      <div class="container">
        <div class="ownModal" :class="[showEditBook ? 'showMyModal' : '']">
          <div class="myModalContent">
            <span class="close-button" @click="closeModal()"><i class="fas fa-times"></i></span>
            <h3>Modify Book</h3>
            <label class="label-margin-top"><strong>Title:</strong></label>
            <textarea class="form-control text-justify" v-model="valueOfBook.title" :placeholder="valueOfBook.title"
              rows="2"></textarea>
            <label class="label-margin-top"><strong>Description:</strong></label>
            <textarea class="form-control text-justify" v-model="valueOfBook.description" :placeholder="valueOfBook.description"
              rows="4" cols="5"></textarea>
            <button class="btn btn-outline-primary float-right" @click="modifyBook(valueOfBook.id)">Save <i class="fas fa-cloud"></i></button>
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
        average: null,
        showEditBook: false,
        newRate: null,
        category: '',
        subcategory: '',
      }
    },
    computed: {
      valueOfBook() {
        return this.$store.getters.valueOfBook ? this.$store.getters.valueOfBook : []
      },
      valueOfSubcategory() {
        return this.$store.getters.valueOfSubcategory ? this.$store.getters.valueOfSubcategory : []
      },
      valueOfCategory() {
        return this.$store.getters.valueOfCategory ? this.$store.getters.valueOfCategory : []
      },
      rate() {
        return this.$store.getters.rates.find(book => {
          if (book.book == this.valueOfBook.id) {
            return this.$set(this, 'average', Number((book.sum / book.rates).toFixed(2)))
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
    async mounted() {
      try {
        await this.$store.dispatch('GET_VALUE_OF_BOOK', this.$route.params.id)
        await this.$store.dispatch('GET_SUBCATEGORY_VALUE', {
          categoryValue: this.valueOfBook.category,
          subcategoryValue: this.valueOfBook.subcategory
        })
        await this.$store.dispatch('GET_RATES')
        await this.$store.dispatch('GET_CATEGORIES')
        await this.$store.dispatch('GET_SUBCATEGORIES')
      } catch (e) {
        this.$store.commit('ERROR', e)
      }
    },
    methods: {
      async deleteBook() {
        try {
          await this.$store.dispatch('DELETE_BOOK', {
            bookId: this.valueOfBook.id
          })
          await this.$router.push(`/books`)
        } catch (e) {
          this.$store.commit('ERROR', e)
        }
      },
      closeModal() {
        this.showEditBook = !this.showEditBook
      },
      async getSubcategories(value) {
        try {
          await this.$store.dispatch('GET_SUBCATEGORIES', value)
        } catch (e) {
          this.$store.commit('ERROR', e)
        }
      },
      async modifyBook(bookId) {
        try {
          if (this.valueOfBook.title.length <= 0 || this.valueOfBook.length <= 0) {
            this.$router.push('books/alertEdit')
          } else {
            await this.$store.dispatch('MODIFY_BOOK_LIGHT', {
              bookId: bookId,
              title: this.valueOfBook.title,
              description: this.valueOfBook.description,
              rate: this.newRate,
              category: this.category,
              subcategory: this.subcategory
            })
            this.showEditBook = !this.showEditBook
            this.newRate = null
            this.$router.push(`/books`)
          }
        } catch (e) {
          this.$store.commit('ERROR', e)
        }
      },
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