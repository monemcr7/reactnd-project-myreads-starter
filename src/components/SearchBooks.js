import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
    state = {
        query: '',
        searchBooks: []
    }

	updateQuery = (query) => {
		if(query) {
		  this.setState({ query : 'searching' })
		  BooksAPI.search(query).then((searchBooks) => {
			if (searchBooks) {
			  if(!searchBooks.error){
				searchBooks = searchBooks.map((book) => {
					const bookInShelf = this.props.books.find(b => b.id === book.id);
					if (bookInShelf) {
						book.shelf = bookInShelf.shelf;
					}
					return book;
				});
				this.setState({ query : 'results', searchBooks : searchBooks })
			  } else {
				this.setState({ query : 'error', searchBooks : searchBooks.error })
			  }
			} 
		  })
		}else{
			this.setState({ query : 'noresults', searchBooks: [] })
		}
	  }

    render() {
		const { query , searchBooks } = this.state
		const { updateBook} = this.props
		return (
			<div className="search-books">
			  <div className="search-books-bar">
				<Link to='/' className="close-search">Close</Link>
				<div className="search-books-input-wrapper">
					{/*
						NOTES: The search from BooksAPI is limited to a particular set of search terms.
						You can find these search terms here:
						https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

						However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
						you don't find a specific author or title. Every search is limited by search terms.
					*/}
				  <input 
					onChange={(event) => this.updateQuery(event.target.value)}
					type="text" 
					placeholder="Search by title or author"
				  />
				  
				</div>
			  </div>
			  <div className="search-books-results">
				<ol className="books-grid">
					{query === 'searching' &&( 
					  <div className="search-message">Searching...</div>
				  )}
					{query === 'noresults' &&( 
					  <div className="search-message"></div>
				  )}
					{query === 'error' && searchBooks === 'empty query' &&( 
					  <div className="search-message">No Results</div>
				  )}
				  {query === 'results' &&( 
					  searchBooks.map((book) => (
						<Book 
						  key={book.id}
						  book={book}
						  updateBook={updateBook}
						/>
					  ))
				  )}
				</ol>
			  </div>
			</div>
	  
		  )
        
    } 
}

export default SearchBooks