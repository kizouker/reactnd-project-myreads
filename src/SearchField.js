import React from 'react';
import './App.css';
import BookShelf from './BookShelf';
import ls from 'local-storage'
import {ALL_BOOKS} from './constants.js'

class SearchField extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.changeShelf = this.props.changeShelf.bind(this);
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);

    
  }

wantToReadBooks; currentlyReadingBooks; readBooks; readingStates = [];

componentDidMount(){
  this.focusTextInput();
}

focusTextInput = () => {
  // Explicitly focus the text input using the raw DOM API
   // Note: we're accessing "current" to get the DOM node
   this.textInput.current.focus();
}
handleChange = (event) => {
  let searchString= event.target.value;
  this.props.updateSearchQuery(searchString);
  this.props.searchBook(searchString);
}

render(){

let allBooks = ls.get(ALL_BOOKS);
  if (allBooks === null || allBooks === undefined){
    allBooks = [];
    ls.set(ALL_BOOKS, allBooks);
  }

  this.wantToReadBooks = allBooks.filter(e => {
    return e.shelf === "wantToRead"});
    
  this.currentlyReadingBooks = allBooks.filter(e => {
  return e.shelf === "currentlyReading"});
    
  this.readBooks = allBooks.filter(e => {
  return e.shelf === "read"});
    
  this.none = allBooks.filter(e => {
    return e.shelf === "none"});

  this.readingStates = [
    { shelf : "currentlyReading",  
      description : "Currently Reading",
      mybooks: this.currentlyReadingBooks
    },
    { shelf: "wantToRead", 
      description : "Want to Read",
      mybooks: this.wantToReadBooks
    },
    { shelf : "read",  
      description : "Read", 
      mybooks: this.readBooks,
    },
    { shelf : "none",  
      description : "None", 
      mybooks: this.none}
  ];

  return(<div>
            <div className="search-books">
                  <div className="search-books-bar">
                      <input type="text" placeholder="Search by title or author" 
                              ref={this.textInput}
                              value={this.props.state.searchQuery}
                              onChange={e => this.handleChange(e)}
                      />
                  </div>
            </div>
            <div className="search-books-results">
              <div>
                {this.readingStates.map(item => {
                    return (<BookShelf key={item.shelf}
                              mybooks={item.mybooks} 
                              readingState={item.shelf} 
                              shelfDescription={item.description}
                              changeShelf={this.props.changeShelf}
                              location={this.props.location}> 
                            </BookShelf>)})
                  }               
              </div>         
            </div>
          </div>);
  }
}

export default SearchField;