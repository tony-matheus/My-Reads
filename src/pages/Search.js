import { useHistory } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { BookList } from '../components/BookList'
import { SearchInput } from '../components/SearchInput'
import { useBookList } from '../hooks/useBookList'
import { Box, Button, Icon } from '../UI'

export const Search = () => {
  const { searchedBooks, searchBook } = useBookList()
  const history = useHistory()

  return (
    <Box>
      <Box display='flex' p={3}>
        <Button p={2} onClick={() => history.push('/')} mr={2}>
          <Icon icon={faArrowLeft} alt='arrow left' />
        </Button>
        <SearchInput onSearch={searchBook} />
      </Box>
      <BookList books={searchedBooks} isSearched />
    </Box>
  )
}
