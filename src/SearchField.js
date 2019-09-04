import React from 'react';
import './App.css';
import BookShelf from './BookShelf';
import ls from 'local-storage'

const ALL_BOOKS = "allbooks";

class SearchField extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.changeShelf = this.props.changeShelf.bind(this);
    this.removeBook = this.props.removeBook.bind(this);
  }

wantToReadBooks; currentlyReadingBooks; readBooks; readingStates = [];

handleChange = (event) => {
  let searchString= event.target.value;
  this.props.updateSearchQuery(searchString);
  this.props.searchBook(searchString);
}

render(){
  let allbooks = ls.get(ALL_BOOKS);

    console.log("   location:"  );
    console.log(this.props.location );

  this.wantToReadBooks = allbooks.filter(e => {
    return e.shelf === "wantToRead"});
    
  this.currentlyReadingBooks = allbooks.filter(e => {
  return e.shelf === "currentlyReading"});
    
  this.readBooks = allbooks.filter(e => {
  return e.shelf === "read"});
    
  this.none = allbooks.filter(e => {
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
                      mybooks: this.none
                    }];

  return(<div>
            <div className="search-books">
                  <div className="search-books-bar">
                      <input type="text" placeholder="Search by title or author" 
                              value={this.props.state.searchQuery}
                              onChange={e => this.handleChange(e)}/>
                  </div>
            </div>
            <div className="search-books-results">
              <div>
                {this.readingStates.map(item => {
                    return (<BookShelf key={item.shelf}
                              mybooks={item.mybooks} 
                              readingState={item.shelf} 
                              shelfDescription={item.description}
                              removeBook={this.props.removeBook} 
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