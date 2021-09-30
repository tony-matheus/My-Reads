import { BrowserRouter as Router, Route } from 'react-router-dom'
import { BooksProvider } from './context/books'
import { MyBookList, Search } from './pages'

function App() {
  return (
    <BooksProvider>
      <Router basename='/'>
        <Route path='/' exact>
          <MyBookList />
        </Route>
        <Route path='/search'>
          <Search />
        </Route>
      </Router>
    </BooksProvider>
  )
}

export default App
