import { CURRENTLY_READING, READ, WANT_TO_READ } from '../utils/constants'

export const ACTIONS = {
  setBookList: 'set book list',
  changeBookShelf: 'change book shelf',
  removeBook: 'remove book',
  addBook: 'add book',
}

export const setBookList = (books) => {
  const bookListByShelf = {
    [CURRENTLY_READING]: books.filter(
      ({ shelf }) => shelf === CURRENTLY_READING
    ),
    [WANT_TO_READ]: books.filter(({ shelf }) => shelf === WANT_TO_READ),
    [READ]: books.filter(({ shelf }) => shelf === READ),
  }

  return {
    type: ACTIONS.setBookList,
    payload: { bookListByShelf, books, bookIds: books.map((b) => b.id) },
  }
}

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

export const addBook = ({ book, shelf }) => ({
  type: ACTIONS.addBook,
  payload: {
    book,
    shelf,
  },
})
