import { CURRENTLY_READING } from '../utils/constants'

export const ACTIONS = {
  setBookList: 'set book list',
  changeBookShelf: 'change book shelf',
  removeBook: 'remove book',
  addItem: 'add item',
}

export const setBookList = (bookList) => ({
  type: ACTIONS.setBookList,
  payload: { bookList },
})

export const changeBookShelf = ({ book, shelf = CURRENTLY_READING }) => ({
  type: ACTIONS.changeBookShelf,
  payload: {
    book,
    shelf,
  },
})

export const removeBook = ({ book, shelf }) => ({
  type: ACTIONS.removeBook,
  payload: {
    book,
    shelf,
  },
})

export const addItem = ({ book, shelf }) => ({
  type: ACTIONS.addItem,
  payload: {
    book,
    shelf,
  },
})
