export default {
    books: state => {
      return state.books
    },
    rates: state => {
      return state.rates
    },
    categories: state => {
      return state.categories
    },
    subcategories: state => {
      return state.subcategories
    },
    booksOfCategory: state => {
      return state.booksOfCategory
    },
    valueOfCategory: state => {
      return state.valueOfCategory
    },
    booksOfSubcategory: state => {
      return state.booksOfSubcategory
    },
    valueOfSubcategory: state => {
      return state.valueOfSubcategory
    },
    valueOfBook: state => {
      return state.valueOfBook
    },
    selectedBooks: state => {
      return state.selectedBooks
    },
    token: state => {
      return state.token
    },
    loginStatus: state => {
      return state.loginStatus
    }
  }