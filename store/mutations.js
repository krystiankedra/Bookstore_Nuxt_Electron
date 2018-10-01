import Vue from 'vue'

export default {
  'SET_BOOKS': (state, payload) => {
    Vue.set(state, 'books', payload)
  },
  'ADD_BOOK': (state, payload) => {
    Vue.set(state, 'books', [...payload])
  },
  'DELETE_BOOK': (state, payload) => {
    Vue.set(state, 'books', state.books.reduce((acc, currentValue) => {
      if (currentValue.id != payload.bookId) {
        acc.push({
          id: currentValue.id,
          title: currentValue.title,
          description: currentValue.description
        })
      }
      return acc
    }, []))
  },
  'MODIFY_BOOK': (state, payload) => {
    Vue.set(state.books[payload.index], 'title', payload.title)
    Vue.set(state.books[payload.index], 'description', payload.description)
    Vue.set(state.books[payload.index], 'category', payload.category)
  },
  'SORTED_TITLE': (state, payload) => {
    if (payload) {
      return state.books.sort(
        (element1, element2) => element1.title.toLowerCase() < element2.title.toLowerCase() ? -1 : 1);
    } else {
      return state.books.sort(
        (element1, element2) => element1.title.toLowerCase() < element2.title.toLowerCase() ? 1 : -1);
    }
  },
  'SORTED_DESCRIPTION': (state, payload) => {
    if (payload) {
      return state.books.sort(
        (element1, element2) => element1.description.toLowerCase() < element2.description.toLowerCase() ? -1 : 1);
    } else {
      return state.books.sort(
        (element1, element2) => element1.description.toLowerCase() < element2.description.toLowerCase() ? 1 : -1);
    }
  },
  'SET_RATES': (state, payload) => {
    Vue.set(state, 'rates', payload)
  },
  'SELECTED_BOOK': (state, payload) => {
    if (payload.checked) {
      state.selectedBooks.push(payload)
    } else {
      if (state.selectedBooks.length > 1) {
        Vue.set(state, 'selectedBooks', state.selectedBooks.filter(item => {
          return item.bookId != payload.bookId
        }))
      } else {
        Vue.set(state, 'selectedBooks', [])
      }
    }
  },
  'SET_CATEGORIES' : (state, payload) => {
    Vue.set(state, 'categories', payload)
  },
  'SET_SUBCATEGORIES': (state, payload) => {
    Vue.set(state, 'subcategories', payload)
  },
  'SET_BOOKS_OF_CATEGORY': (state, payload) => {
    Vue.set(state, 'booksOfCategory', payload)
  },
  'SET_CATEGORY_VALUE': (state, payload) => {
    Vue.set(state, 'valueOfCategory', payload)
  },
  'SET_BOOKS_OF_SUBCATEGORY': (state, payload) => {
    Vue.set(state, 'booksOfSubcategory', payload)
  },
  'SET_SUBCATEGORY_VALUE': (state, payload) => {
    Vue.set(state, 'valueOfSubcategory', payload)
  }
}
