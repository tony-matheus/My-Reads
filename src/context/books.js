import { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import { cond, equals, T } from 'ramda'
import { ACTIONS } from './actions'
import { CURRENTLY_READING, READ, WANT_TO_READ } from '../utils/constants'
import { _addItem, _moveItem, _removeItem } from './helpers'

const BooksState = createContext()
const BooksDispatch = createContext()

BooksState.displayName = 'BooksState'
BooksDispatch.displayName = 'BooksDispatch'

function useBooksContext() {
  const state = useContext(BooksState)
  const dispatch = useContext(BooksDispatch)

  if (state === undefined || dispatch === undefined) {
    throw new Error('useBooksContext must be used within a BooksProvider')
  }

  return [state, dispatch]
}

function booksReducer(state, action) {
  const { type, payload } = action

  return cond([
    [
      equals(ACTIONS.setBookList),
      () => ({
        ...state,
        bookListByShelf: payload.bookListByShelf,
        isBooksLoaded: true,
        bookIds: payload.bookIds,
        books: payload.books,
      }),
    ],
    [equals(ACTIONS.changeBookShelf), () => _moveItem(state, payload)],
    [
      equals(ACTIONS.removeBook),
      () => ({
        ...state,
        bookListByShelf: _removeItem(state, payload),
        books: state.books.filter((b) => b.id !== payload.book.id),
      }),
    ],
    [
      equals(ACTIONS.addBook),
      () => ({
        ...state,
        bookListByShelf: _addItem(state, payload),
        books: [...state.books, { ...payload.book, shelf: payload.shelf }],
      }),
    ],
    [
      T,
      () => {
        throw new Error(`Unhandled action type: ${type}`)
      },
    ],
  ])(type)
}

function BooksProvider({ children }) {
  const initialState = {
    bookListByShelf: {
      [CURRENTLY_READING]: [],
      [WANT_TO_READ]: [],
      [READ]: [],
    },
    books: [],
    bookIds: [],
    isBooksLoaded: false,
    isLoading: false,
    searchedBooks: [],
  }

  const [booksState, setBooksState] = useReducer(booksReducer, initialState)

  return (
    <BooksState.Provider value={booksState}>
      <BooksDispatch.Provider value={setBooksState}>
        {children}
      </BooksDispatch.Provider>
    </BooksState.Provider>
  )
}

BooksProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { useBooksContext, BooksProvider }
