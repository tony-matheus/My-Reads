import { SearchInput } from '../components/SearchInput'
import { useBookList } from '../hooks/useBookList'
import { Box } from '../UI'

export const Search = () => {
  const { searchBook } = useBookList()

  return (
    <Box>
      <SearchInput onSearch={searchBook} />
    </Box>
  )
}
