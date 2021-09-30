import { BookList } from '../components/BookList'
import { useBookList } from '../hooks/useBookList'
import { Box, Text } from '../UI'

export const MyBookList = () => {
  const { bookList } = useBookList()
  const { currentlyReading, wantToRead, read } = bookList

  return (
    <Box>
      <BookList books={currentlyReading} title='Currently Reading' />
      <BookList books={wantToRead} title='Want to Read' />
      <BookList books={read} title='Read' />
    </Box>
  )
}
