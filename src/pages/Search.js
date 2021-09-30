import { useBookList } from '../hooks/useBookList'

export const Search = () => {
  const { bookList, setBookOnList, removeBookFromList } = useBookList()
  return 'search'
}
