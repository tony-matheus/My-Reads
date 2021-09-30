import PropTypes from 'prop-types'
import { Box, Text } from '../UI'
import { Book } from './Book'

export const BookList = ({ books, title }) => {
  return (
    <Box textAlign='center'>
      <Text fontSize='26px' fontWeight='bold'>
        {title}
      </Text>
      <Box display='flex' justifyContent='center'>
        {books.map((book) => (
          <Book
            title={book.title}
            authorName={book.authors[0]}
            thumbnail={book.imageLinks.thumbnail}
          />
        ))}
      </Box>
    </Box>
  )
}

BookList.defaultProps = {
  books: [],
}

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}
