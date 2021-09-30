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
      () => ({ ...state, bookList: payload.bookList, isBooksLoaded: true }),
    ],
    [
      equals(ACTIONS.changeBookShelf),
      () => ({
        ...state,
        bookList: _moveItem(state, payload),
      }),
    ],
    [
      equals(ACTIONS.removeBook),
      () => () => ({
        ...state,
        bookList: _removeItem(state, payload),
      }),
    ],
    [
      equals(ACTIONS.addItem),
      () => ({
        ...state,
        bookList: _addItem(state, payload),
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
    bookList: {
      [CURRENTLY_READING]: [],
      [WANT_TO_READ]: [],
      [READ]: [],
    },
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
