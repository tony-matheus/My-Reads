import { useEffect, useState } from 'react'
import { getAll, search, update } from '../services/booksAPI'

const SHELF_TYPES = ['currentlyReading', 'wantToRead', 'read', 'none']
const [CURRENTLY_READING, WANT_TO_READ, READ, NONE] = SHELF_TYPES

export const useBookList = () => {
  const [bookList, setBookList] = useState({
    [CURRENTLY_READING]: [],
    [WANT_TO_READ]: [],
    [READ]: [],
  })

  const getAllBooks = () => {
    getAll().then((books) => {
      setBookList({
        [CURRENTLY_READING]: books.filter(
          ({ shelf }) => shelf === CURRENTLY_READING
        ),
        [WANT_TO_READ]: books.filter(({ shelf }) => shelf === WANT_TO_READ),
        [READ]: books.filter(({ shelf }) => shelf === READ),
      })
    })
  }

  useEffect(() => {
    getAllBooks()
  }, [])

  const changeBookShelf = (book, shelf = CURRENTLY_READING) => {
    if (!SHELF_TYPES.includes(shelf)) {
      return 'error'
    }

    const oldShelf = book.shelf

    update(book, shelf).then(() =>
      setBookList({
        ...bookList,
        [oldShelf]: bookList[oldShelf].filter((b) => book.id !== b.id),
        [shelf]: [...bookList[shelf], book],
      })
    )
  }

  const removeBookFromList = (book) => {
    const { shelf } = book
    if (!SHELF_TYPES.includes(shelf)) {
      return 'error'
    }

    const newBookList = bookList[shelf].filter((b) => book.id !== b.id)

    update(book, NONE).then(() =>
      setBookList({ ...bookList, [shelf]: newBookList })
    )
  }

  const searchBook = (text) => {
    const books = search(text)
    console.log(books)
  }

  return { bookList, searchBook, changeBookShelf, removeBookFromList }
}
