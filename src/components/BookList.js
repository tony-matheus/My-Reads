import PropTypes from 'prop-types'
import { Box, HR, Text } from '../UI'
import { colors } from '../utils/colors'
import { Book } from './Book'

export const BookList = ({ books, title }) => {
  return (
    <Box textAlign='center'>
      {title && (
        <Box px={10}>
          <Text
            color={colors.white}
            textAlign='left'
            fontSize='26px'
            fontWeight='bold'
          >
            {title}
          </Text>
          <HR borderColor={colors.white} />
        </Box>
      )}

      <Box display='flex' justifyContent='center' flexWrap='wrap'>
        {books.map((book) => (
          <Book
            key={book.id}
            title={book.title}
            subtitle={book.subtitle}
            authorName={book.authors?.[0]}
            thumbnail={book.imageLinks.thumbnail}
          />
        ))}
      </Box>
    </Box>
  )
}

BookList.defaultProps = {
  books: [],
  title: '',
}

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}
