import { BrowserRouter as Router, Route } from 'react-router-dom'
import { MyBookList, Search } from './pages'

function App() {
  return (
    <>
      <Router basename='/'>
        <Route path='/' exact>
          <MyBookList />
        </Route>
        <Route path='/search'>
          <Search />
        </Route>
      </Router>
    </>
  )
}

export default App
