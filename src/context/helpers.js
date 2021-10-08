import { prop, uniqBy } from 'ramda'
import { NONE } from '../utils/constants'

export const _moveItem = (state, payload) => {
  const { book, shelf } = payload
  const oldShelf = book.shelf

  const books = state.books.filter((b) => b.id !== book.id)
  const oldShelfList = uniqBy(
    prop('id'),
    state.bookListByShelf[oldShelf].filter((b) => book.id !== b.id)
  )
  if (oldShelf === NONE) {
    return {
      ...state,
      bookListByShelf: {
        ...state.bookListByShelf,
        [oldShelf]: oldShelfList,
      },
      books,
    }
  }

  return {
    ...state,
    bookListByShelf: {
      ...state.bookListByShelf,
      [oldShelf]: oldShelfList,
      [shelf]: uniqBy(prop('id'), [
        ...state.bookListByShelf[shelf],
        { ...book, shelf },
      ]),
    },
    books: uniqBy(prop('id'), [...books, { ...book, shelf }]),
  }
}

export const _removeItem = (state, payload) => {
  const { book, shelf } = payload
  const newBookListByShelf = state.bookListByShelf[shelf].filter(
    (b) => book.id !== b.id
  )

  return { ...state.bookListByShelf, [shelf]: newBookListByShelf }
}

export const _addItem = (state, payload) => {
  const { book, shelf } = payload
  return {
    ...state.bookListByShelf,
    [shelf]: [...state.bookListByShelf[shelf], book],
  }
}
