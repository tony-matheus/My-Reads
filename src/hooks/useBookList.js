import { useEffect, useState } from 'react'
import { changeBookShelf, removeBook, setBookList } from '../context/actions'
import { useBooksContext } from '../context/books'
import { getAll, search, update } from '../services/booksAPI'

const SHELF_TYPES = ['currentlyReading', 'wantToRead', 'read', 'none']
const [CURRENTLY_READING, WANT_TO_READ, READ, NONE] = SHELF_TYPES

export const useBookList = ({ loadBooksOnStart } = {}) => {
  const [{ bookList, isBooksLoaded }, dispatch] = useBooksContext()

  const [searchedBooks, setSearchedBooks] = useState([])
  const [isLoading, setIsLoading] = useState([])

  const getAllBooks = () => {
    setIsLoading(true)
    getAll().then((books) => {
      setIsLoading(false)
      dispatch(
        setBookList({
          [CURRENTLY_READING]: books.filter(
            ({ shelf }) => shelf === CURRENTLY_READING
          ),
          [WANT_TO_READ]: books.filter(({ shelf }) => shelf === WANT_TO_READ),
          [READ]: books.filter(({ shelf }) => shelf === READ),
        })
      )
    })
  }

  useEffect(() => {
    if (!isBooksLoaded || loadBooksOnStart) {
      getAllBooks()
    }
  }, [])

  const handleChangeBookShelf = (book, shelf = CURRENTLY_READING) => {
    if (!SHELF_TYPES.includes(shelf)) {
      return 'error'
    }

    setIsLoading(true)
    update(book, shelf).then(() => {
      setIsLoading(false)
      dispatch(changeBookShelf({ book, shelf }))
    })
  }

  const removeBookFromList = (book) => {
    const { shelf } = book
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
    search(text).then((books) => {
      setIsLoading(false)
      setSearchedBooks(books)
    })
  }

  return {
    bookList,
    searchedBooks,
    isLoading,
    searchBook,
    handleChangeBookShelf,
    removeBookFromList,
  }
}
