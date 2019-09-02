import React from 'react';
import './App.css';
import SearchField from './SearchField';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI';
import NotFound from './NotFound.js';
import { Route,  Link } from 'react-router-dom'
import ls from 'local-storage'

const MY_BOOKS = "mybooks";
const ALL_BOOKS ="allbooks"

class BooksApp extends React.Component {
  constructor(props){

    super(props);
    this.state = {
        searchQuery : '',     
        searchResult: [],
        mybooks: [],
        allBooks : []
    };
    this.addItem = this.addItem.bind(this);
    this.searchBook = this.searchBook.bind(this);
    this.compare = this.compare.bind(this);
    this.changeShelf = this.changeShelf.bind(this);
    this.checkNotEmptyArray = this.checkNotEmptyArray.bind(this);    
  }
  
wantToReadBooks; currentlyReadingBooks; readBooks = []; 
readingStates = [];
totalResArray = [];

/**
 * @description: Checks if the argument is an array, is not undefined,
 * and is not empty
 * @param {string} arg - the arg to be tested
 * @returns - true if the arg is an array, not empty, otherwise false
 */
checkNotEmptyArray = (arg) => {
  if (Array.isArray(arg) && arg.length) {
    return true;
  } else {
    return false;
  }
}

/**
 * This method is available after the component has mounted. That is, after the HTML from render has 
 * finished loading. It is called once in the component life cycle and it signals that the component 
 * and all its sub-components have rendered properly.
 * 
 * This is the best place to make API calls since, at this point, the component has been mounted and 
 * is available to the DOM. 
 */

componentDidMount(){
  let promise = BooksAPI.getAll();

  // The list of my books are retrieved from the BooksAPI
  // and put in the state variable mybooks

  // However to hinder that this list and the state is
  // over-written on a refresh of the page, the list of books
  // is also saved in local-storage

  let mybooks = ls.get(MY_BOOKS);
  promise.then(res => {
    if (this.checkNotEmptyArray(mybooks)){
      this.setState({mybooks : mybooks}); // If the list has been fetched before
                                          // and is in the local storage it is set
                                          // in the state variable
    } else {
                                        // If the list has not been fetched before
      this.setState({mybooks : res});   // it is fetched from the API an stored in state
      ls.set(MY_BOOKS, res);            // ELSE, it is fetched from local-storage 
    } 
      return res;
  },(data) => {
    return data;
  });
}
/**
 * @description: Changes a book from one shelf to another.
 * @param {string} bookId - the Id of the book
 * @param {string} shelf - the Id of the book shelf to change to
 * @returns - doesn't return anything
 */
changeShelf = (bookId, shelf) => {
  let myBooks = ls.get(MY_BOOKS);
  // Checks if the book is already in my book collection
  let selectedBook = myBooks.find(book => {
    return book.id === bookId
  })

  // ...if it is, move it to the new shelf
  if (selectedBook !== undefined){
    selectedBook.shelf = shelf;
    this.removeBook(selectedBook.id);
    this.addItem(selectedBook);
  } else {
    alert ("New book added to my collection");  
    let allBooks = ls.get(ALL_BOOKS);           
                                                // If the book is not in my collection
    selectedBook = allBooks.find(book => {      // find it amongst the search result
        return book.id === bookId
    })

  if (selectedBook !== undefined){
    selectedBook.shelf = shelf;                 // ... update the shelf
    this.addItem(selectedBook);                 // ... and add it to my collection
    } 
  }
}

/**
 * @description: Adds a book to state variable and to the local-storage
 * @param {string} book - the book to be added
 * @returns - nothing
 */
addItem = (book) => {
  // get my books for the local storage
  let myBooks = ls.get(MY_BOOKS);
 
  myBooks = [...myBooks, book ]; // add the book to the list
  //update state, triggers re-rendering
  this.setState({mybooks : myBooks});
  // update the local storage 
  ls.set(MY_BOOKS, myBooks);
}

/**
 * @description: Removes a book from state variable and from the local-storage
 * @param {string} bookId - the book to be removed
 * @returns - nothing
 */
removeBook = (bookId) => {
  // get my books for the local storage
  let myBooks = ls.get(MY_BOOKS);
  // filter out everyone except the selected book
  myBooks = myBooks.filter(book => {
    return book.id !== bookId
  });

  // setstate - is async - and state updates are bundled - 
  // so checking state after a setstate doesn't work so well
 this.setState({mybooks: myBooks});
  // update the local storage     
  ls.set(MY_BOOKS, myBooks);
}

/**
 * @description: Adds a book to state variable and to the local-storage
 * @param {string} book - the book to be added
 * @returns - nothing
 */
searchBook(searchString){
  let promise = BooksAPI.search(searchString);
  
  promise.then(res => {
   //   if (this.checkNotEmptyArray(res))
    if (!(res === undefined) && Array.isArray(res) && (!(res.length === 0)))
      {
        let summa = this.compare(res); 
        if (!(summa === undefined) && Array.isArray(summa) 
          && (!(summa.length === 0))){    
          this.setState({searchResult : summa});   
          ls.set(ALL_BOOKS, summa);
        } else {
          this.setState({searchResult : []});
        }
      } else {
          this.setState({searchResult : []});
      } 
        return res;        
    },(data) => {
        return data;
    }).catch(error => {
        alert(error)
        this.setState({searchResult : []});
    }
  );
 }

updateSearchQuery = (searchString) => {
  this.setState({searchQuery : searchString});
}

compare = (searchresult) => searchresult.map(searchBook => { 
  this.state.mybooks.map(allBook => {
      if (allBook.id === searchBook.id){
          searchBook.shelf = allBook.shelf;
        }
      return searchBook;
      });
  
  // Inner 
  // searchbook is not in my books
  if (searchBook.shelf === undefined || searchBook.shelf === ''){
    searchBook.shelf = 'none';
  }
    return searchBook;
});

render() {
  this.wantToReadBooks = this.state.mybooks.filter(e => {
  return e.shelf === "wantToRead"});
  
  this.currentlyReadingBooks = this.state.mybooks.filter(e => {
  return e.shelf === "currentlyReading"});
  
  this.readBooks = this.state.mybooks.filter(e => {
  return e.shelf === "read"});
  
  this.readingStates =  [{ shelf : "currentlyReading",  
                      description : "Currently Reading",
                      mybooks: this.currentlyReadingBooks
                    },
                    { shelf: "wantToRead", 
                      description : "Want to Read",
                      mybooks: this.wantToReadBooks
                    },
                    { shelf : "read",  
                      description : "Read", 
                      mybooks: this.readBooks
                    }];  
   
    return (
    <div className="app">  
        <div className="menu">
          <ul>  
              <li>
                <Link to="/search">Search</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
          </ul>
          <hr />
            <Route exact path="/search" component={(props) =><SearchField 
                                                                state={this.state} 
                                                                searchBook={this.searchBook} 
                                                                readingStates={this.readingStates}
                                                                removeBook={this.removeBook} 
                                                                changeShelf={this.changeShelf}
                                                                compare={this.compare}
                                                                updateSearchQuery={this.updateSearchQuery}
                                                                {...props}>
                                                            </SearchField>}/>
           <Route exact path="/" render={() => (
                    <div className="list-books">
                    <div className="list-books-title">
                      <h1>MyReads</h1>
                    </div>
                      <div className="list-books-content">
                        <div>
                          {this.readingStates.map(item => { 
                          return (<BookShelf key={item.shelf} mybooks={item.mybooks} readingState={item.shelf} 
                                      shelfDescription={item.description} removeBook={this.removeBook} 
                                      changeShelf={this.changeShelf} > 
                                  </BookShelf>)
                          })}               
                        </div>
                      </div>
                    </div>)}>
            </Route>  
        </div>)             
    </div>
    )
  }
}

export default BooksApp;