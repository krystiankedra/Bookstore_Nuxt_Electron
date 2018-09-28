import Vue from 'vue'

export default {
    async 'GET_BOOKS'({commit}) {
      try {
        const books = []
        let response = await Vue.http.get('http://bootcamp.opole.pl/books/my-books/87f4')
        let responseData = response.data.books
        for (let i in responseData) {
          books.unshift(responseData[i])
        }
        commit('SET_BOOKS', books)
      } catch (e) {
        console.log(e)
      }
    },
    async 'SEND_BOOK'({commit}, payload) {
      try {
        await Vue.http.post('http://bootcamp.opole.pl/books/add-book/87f4', payload, {emulateJSON: true})
        commit('ADD_BOOK', payload)
      } catch (e) {
        console.log(e)
      }
    },
    async 'DELETE_BOOK'({commit}, payload) {
      try {
        await Vue.http.delete('http://bootcamp.opole.pl/books/delete-book/' + payload.bookId + '/87f4')
        commit('DELETE_BOOK', payload)
      } catch (e) {
        console.log(e)
      }
    },
    async 'MODIFY_BOOK'({commit}, payload) {
      try {
        await Vue.http.post('http://bootcamp.opole.pl/books/edit-book/' + payload.bookId + '/87f4', {title: payload.title, description: payload.description, category: payload.category, subcategory: payload.subcategory}, {emulateJSON: true})
        await Vue.http.post('http://bootcamp.opole.pl/books/rate/87f4', {id: payload.bookId, rate: payload.rate}, {emulateJSON: true})
        const response = await Vue.http.get('http://bootcamp.opole.pl/books/my-rates/87f4')
        const rates = response.body.rates
        commit('SET_RATES', rates)
        commit('MODIFY_BOOK', payload)
      } catch (e) {
        console.log(e)
      }
    },
    'SORT_BY_TITLE'({commit}, payload) {
      commit('SORTED_TITLE', payload)
    },
    'SORT_BY_DESCRIPTION'({commit}, payload) {
      commit('SORTED_DESCRIPTION', payload)
    },
    async 'GET_RATES'({commit}) {
      try {
        const response = await Vue.http.get('http://bootcamp.opole.pl/books/my-rates/87f4')
        const rates = response.body.rates
        commit('SET_RATES', rates)
      } catch (e) {
        console.log(e)
      }
    },
    async 'DELETE_SELECTED'({commit}) {
      try {
        for (let i in this.state.selectedBooks) {
          await Vue.http.delete('http://bootcamp.opole.pl/books/delete-book/' + this.state.selectedBooks[i].bookId + '/87f4')
          commit('DELETE_BOOK', this.state.selectedBooks[i])
        }
        const response = await Vue.http.get('http://bootcamp.opole.pl/books/my-books/87f4')
        const books = response.data.books
        commit('SET_BOOKS', books)
      } catch (e) {
        console.log(e)
      }
    },
    'SELECTED_BOOK'({commit}, payload) {
        commit('SELECTED_BOOK', payload)
    },
    async 'GET_JSON'() {
      try {
        let response = await Vue.http.get('/localBooks.json')
        let responseData = response.body.books
        for (let i in responseData) {
          await Vue.http.post('http://bootcamp.opole.pl/books/add-book/87f4', responseData[i] , {emulateJSON: true})
        }
      } catch (e) {
        console.log(e)
      }
    },
    async 'GET_CATEGORIES'({commit}) {
      try {
        const categories = []
        let response = await Vue.http.get('http://bootcamp.opole.pl/categories')
        let responseData = response.data.categories
        for (let i in responseData) {
          categories.unshift(responseData[i])
        }
        commit('SET_CATEGORIES', categories)
      } catch (e) {
        console.log(e)
      }
    },
    async 'GET_SUBCATEGORIES'({commit}, payload) {
      try {
        const subcategories = []
        let response = await Vue.http.post('http://bootcamp.opole.pl/subcategories', {id: payload}, {emulateJSON: true})
        let responseData = response.body.sub_categories
        for (let i in responseData) {
          subcategories.unshift(responseData[i])
        }
        commit('SET_SUBCATEGORIES', subcategories)
      } catch (e) {
        console.log(e)
      }
    },
    async 'GET_BOOKS_OF_CATEGORY'({commit}, payload) {
      try {
        await Vue.http.get('http://bootcamp.opole.pl/books/my-books/category/' + payload + '/87f4')
        .then(response => {
          const booksOfCategory = []
          for (let i in response.body.books) {
            booksOfCategory.push(response.body.books[i])
          }
          commit('SET_BOOKS_OF_CATEGORY', booksOfCategory)
        })
      } catch (e) {
        console.log(e)
      }
    },
    async 'GET_CATEGORY_VALUE'({commit}, payload) {
      try {
        const categories = []
        let response = await Vue.http.get('http://bootcamp.opole.pl/categories')
        let responseData = response.data.categories
        for (let i in responseData) {
          categories.unshift(responseData[i])
        }
        categories.find(item => {
          if (item.id == payload.id) {
            commit('SET_CATEGORY_VALUE', item)
        }})
      } catch (e) {
        console.log(e)
      }
    },
    async 'GET_BOOKS_OF_SUBCATEGORY'({commit}, payload) {
      await Vue.http.get('http://bootcamp.opole.pl/books/my-books/subcategory/' + payload +'/87f4')
      .then(response => {
        const books = []
        for (let i in response.body.books) {
          books.push(response.body.books[i])
        }
        commit('SET_BOOKS_OF_SUBCATEGORY', books)
      })
    }
  }