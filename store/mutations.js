import Vue from 'vue'

export default {
  'SET_BOOKS': (state, payload) => {
    Vue.set(state, 'books', payload)
  },
  'ADD_BOOK': (state, payload) => {
    Vue.set(state, 'books', [...payload])
  },
  'DELETE_BOOK_LOCAL': (state, payload) => {
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
  'MODIFY_BOOK_LOCAL': (state, payload) => {
    Vue.set(state.books[payload.index], 'title', payload.title)
    Vue.set(state.books[payload.index], 'description', payload.description)
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
  'SELECTED_BOOK_LOCAL': (state, payload) => {
    let found = state.books.some(item => {
      item.id == payload.bookId
    })
    if (!found && payload.checked) {
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
}
