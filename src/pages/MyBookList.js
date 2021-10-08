import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import { BookList } from '../components/BookList'
import { useBookList } from '../hooks/useBookList'
import { Box, Button, Icon, Text } from '../UI'
import { colors } from '../utils/colors'

export const MyBookList = () => {
  const { bookListByShelf, isLoading } = useBookList({ loadBooksOnStart: true })
  const { currentlyReading, wantToRead, read } = bookListByShelf
  const history = useHistory()

  return (
    <Box>
      <Box bg={colors.red.light} py='20px' px='10px'>
        <Text fontSize={26} fontWeight='bold' color={colors.white}>
          MY BOOKS
        </Text>
      </Box>
      <BookList
        books={currentlyReading}
        title='Currently Reading'
        isLoading={isLoading}
      />
      <BookList books={wantToRead} title='Want to Read' isLoading={isLoading} />
      <BookList books={read} title='Read' isLoading={isLoading} />
      <Box position='fixed' bottom='50px' right='30px' display='flex'>
        <Button
          borderRadius='100%'
          height='40px'
          width='40px'
          p={2}
          onClick={() => history.push('/search')}
          mr={2}
        >
          <Icon icon={faPlus} alt='plus icon' color={colors.white} />
        </Button>
      </Box>
    </Box>
  )
}
