import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'
import { BrowserRouter , Route } from 'react-router-dom';

import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }
  
  componentDidMount() {
    this.getBooks()
  }

  // Get Books Data
	getBooks() {
      BooksAPI.getAll().then((books) => {
          this.setState({books});
      });
  }
  
  // Update Books Data
  updateBooks = (book, shelf) => {
		BooksAPI.update(book, shelf).then(updateBooks => {
			this.getBooks();
		})
	}
  
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path='/' render={() => (
            <ListBooks books={this.state.books} updateBooks={this.updateBooks} />
          )}/>

          <Route exact path='/search' render={() => (
            <SearchBooks books={this.state.books} updateBooks={this.updateBooks} />
          )}/>
        </div>
      </BrowserRouter>
    )
  }

}

export default BooksApp
