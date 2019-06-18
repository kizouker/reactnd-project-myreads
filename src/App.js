import React from 'react';
import './App.css';
import SearchField from './SearchField';
import BookShelf from './BookShelf';
      
class BooksApp extends React.Component {

  readingStates =  [{"currentlyReading" : "Currently Reading"},
                    {"wantToRead" : "Want to Read"},
                    {"read" : "Read"}];
        
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    shelf : '',
    showSearchPage: false
  }
  // keys = Object.values(this.readingStates);
      keys = this.readingStates.map((o) => {
          return Object.keys(o)
      }).reduce((prev, curr) => {
          return prev.concat(curr)
      }).filter((col, i, array) => {
          return array.indexOf(col) === i
      })
  
  render() {
      return (
      <div className="app">
        {this.state.showSearchPage ? (
         <SearchField></SearchField>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {
                  this.keys.map(element => {
                    return (<BookShelf readingState={element}> </BookShelf>)
                })
              }
           
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp;