import { useHistory } from 'react-router-dom'
import { BookList } from '../components/BookList'
import { useBookList } from '../hooks/useBookList'
import { Box, Button, Text } from '../UI'

export const MyBookList = () => {
  const { bookList } = useBookList({ loadBooksOnStart: true })
  const { currentlyReading, wantToRead, read } = bookList
  const history = useHistory()

  return (
    <Box>
      <Button p={3} onClick={() => history.push('/search')}>
        Front
      </Button>
      <Box>
        <Text>MY BOOKS</Text>
      </Box>
      <BookList books={currentlyReading} title='Currently Reading' />
      <BookList books={wantToRead} title='Want to Read' />
      <BookList books={read} title='Read' />
    </Box>
  )
}
