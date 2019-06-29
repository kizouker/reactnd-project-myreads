import React from 'react';
import './App.css';
import BookShelf from './BookShelf';

class SearchField extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.changeShelf = this.props.changeShelf.bind(this);
    this.removeBook = this.props.removeBook.bind(this);
    this.compare = this.props.compare.bind(this);
   
  }

wantToReadBooks; currentlyReadingBooks; readBooks; readingStates = [];

handleChange = (event) => {
// console.log("value: " + event.target.value);

 
  this.props.searchBook(event.target.value);

  this.props.compare();
}
render(){
  this.wantToReadBooks = this.props.state.books.filter(e => {
    return e.shelf === "wantToRead"});
    
    this.currentlyReadingBooks = this.props.state.books.filter(e => {
    return e.shelf === "currentlyReading"});
    
    this.readBooks = this.props.state.books.filter(e => {
    return e.shelf === "read"});
    
  this.readingStates =  [{ shelf : "currentlyReading",  
                      description : "Currently Reading",
                      books: this.props.state.books.filter(e => {
                        return e.shelf === "currentlyReading"})
                    },
                    { shelf: "wantToRead", 
                      description : "Want to Read",
                      books: this.wantToReadBooks
                    },
                    { shelf : "read",  
                      description : "Read", 
                      books: this.readBooks
                    }];

  return( <div className="search-books">
              <div className="search-books-bar">
                <button className="close-search" 
                onClick={() => this.setState({ showSearchPage: false })}>Close</button>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input type="text" placeholder="Search by title or author" 
                  onChange={e => this.handleChange(e)}/>
                </div>
              </div>
                <div className="search-books-results">

                <div>
            {this.readingStates.map(item => {
             // console.log("----------");
             // console.log(item.shelf);
             // console.log(item.description);
             // console.log(item.books);
             // console.log("----------");
                return (<BookShelf books={item.books} readingState={item.shelf} 
                        shelfDescription={item.description}
                        removeBook={this.props.removeBook} changeShelf={this.props.changeShelf}> 
                      </BookShelf>)
              })}               
            </div>
                 
              </div>
          </div>
  );
  }
}

export default SearchField;