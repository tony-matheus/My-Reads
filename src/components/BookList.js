import PropTypes from 'prop-types'
import { useBooksContext } from '../context/books'
import { Box, HR, Text } from '../UI'
import { colors } from '../utils/colors'
import { NONE } from '../utils/constants'
import { Book } from './Book'

export const BookList = ({ books, title, isSearched, isLoading }) => {
  const [{ books: allBooks }] = useBooksContext()

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
      {isLoading ? (
        'loading ...'
      ) : (
        <Box display='flex' justifyContent='center' flexWrap='wrap'>
          {(books || []).map((book) => {
            return (
              <Book
                key={book.id}
                book={book}
                isSearched={isSearched}
                authorNames={book?.authors}
                thumbnail={book?.imageLinks?.thumbnail}
                shelf={
                  isSearched
                    ? allBooks.find((b) => b.id === book.id)?.shelf || NONE
                    : book.shelf
                }
              />
            )
          })}
        </Box>
      )}
    </Box>
  )
}

BookList.defaultProps = {
  books: [],
  title: '',
  isSearched: false,
  isLoading: false,
}

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  isSearched: PropTypes.bool,
  isLoading: PropTypes.bool,
}
