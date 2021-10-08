import { useEffect, useState } from 'react'
import {
  changeBookShelf,
  removeBook,
  setBookList,
  addBook,
} from '../context/actions'
import { useBooksContext } from '../context/books'
import { getAll, search, update } from '../services/booksAPI'
import { CURRENTLY_READING, NONE, SHELF_TYPES } from '../utils/constants'

export const useBookList = ({ loadBooksOnStart } = {}) => {
  const [{ books, bookListByShelf, isBooksLoaded }, dispatch] =
    useBooksContext()

  const [searchedBooks, setSearchedBooks] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getAllBooks = () => {
    setIsLoading(true)
    getAll().then((allBooks) => {
      setIsLoading(false)
      dispatch(setBookList(allBooks))
    })
  }

  useEffect(() => {
    if (!isBooksLoaded || loadBooksOnStart) {
      getAllBooks()
    }
  }, [])

  const handleChangeBookShelf = (book, shelf = CURRENTLY_READING) => {
    if (!SHELF_TYPES.includes(shelf) || book.shelf === shelf) {
      return 'error'
    }

    setIsLoading(true)
    update(book, shelf).then(() => {
      setIsLoading(false)
      dispatch(changeBookShelf({ book, shelf }))
    })
  }

  const addBookToList = (book, shelf) => {
    update(book, shelf).then(() => {
      setIsLoading(false)
      dispatch(addBook({ book, shelf }))
    })
  }

  const removeBookFromList = (book, shelf) => {
    if (!SHELF_TYPES.includes(shelf)) {
      return 'error'
    }

    setIsLoading(true)
    update(book, NONE).then(() => {
      setIsLoading(false)
      dispatch(removeBook({ shelf, book }))
    })
  }

  const searchBook = (text) => {
    setIsLoading(true)
    search(text).then((newSearchedBooks) => {
      setIsLoading(false)
      setSearchedBooks(newSearchedBooks)
    })
  }

  return {
    books,
    bookListByShelf,
    searchedBooks,
    isLoading,
    searchBook,
    handleChangeBookShelf,
    addBookToList,
    removeBookFromList,
  }
}
