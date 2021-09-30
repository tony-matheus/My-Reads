import { useHistory } from 'react-router-dom'
import { BookList } from '../components/BookList'
import { SearchInput } from '../components/SearchInput'
import { useBookList } from '../hooks/useBookList'
import { Box, Button } from '../UI'

export const Search = () => {
  const { searchedBooks, searchBook } = useBookList()
  const history = useHistory()

  return (
    <Box>
      <Button p={3} onClick={() => history.push('/')}>
        Back
      </Button>
      <SearchInput onSearch={searchBook} />
      <BookList books={searchedBooks} />
    </Box>
  )
}
