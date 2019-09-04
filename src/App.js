import React from 'react';
import './App.css';
import SearchField from './SearchField';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI';
import { Route,  Link } from 'react-router-dom'
import ls from 'local-storage'
import {MY_BOOKS, ALL_BOOKS} from './constants.js'

class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        searchQuery : '',     // running refresh in the the browser 
        searchResult: [],     // => runs the constructor again
        mybooks: [],
        allBooks : []
    };
    this.searchBook = this.searchBook.bind(this);
    this.changeShelf = this.changeShelf.bind(this);
    this.checkNotEmptyArray = this.checkNotEmptyArray.bind(this);    
    this.sortIntoShelves = this.sortIntoShelves.bind(this);
  }

  currentlyReadingBooks = []; 
  wantToReadBooks = []; 
  readBooks = []; 
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
changeShelf = (book, shelf, location) => {
  let myBooks = ls.get(MY_BOOKS);
  let allBooks = ls.get(ALL_BOOKS);      

// we are on the search page ...
 if (location!==undefined && location.pathname.includes("search")){
 //Change the book on the search page
 // find it amongst the search result  
      //alert ("New book added to my collection");  
      // ... and change the shelf of the searchresult
      allBooks = this.justInTimeReplacement(allBooks, book, shelf);
      if(allBooks.length !== 0 ){
        //update state, triggers re-rendering
        this.setState({allBooks : allBooks});
        // update the local storage 
        ls.set(ALL_BOOKS, allBooks);
      }
    }
    //change the shelf
    myBooks = this.justInTimeReplacement(myBooks, book, shelf);
     // Always change the shelf - and update
    //update state, triggers re-rendering
    this.setState({mybooks : myBooks});
    // update the local storage 
    ls.set(MY_BOOKS, myBooks);
} 

/**
 * @description: Changes the shelf of a book and adds the book to an array 
 * if the element already exists it is replaced.
 * @param {array} inarray - the current list of books
 * @param {object} item - the book item to be added/changed
 * @param {shelf} shelf - the shelf
 * @returns - returns the changed array
 */
justInTimeReplacement = (inarray, item, shelf ) => {
  let foundIndex = inarray.findIndex(e => e.id === item.id)

  item.shelf = shelf;
  if (foundIndex !== -1){ // the item is already in the array so
    inarray.splice(foundIndex, 1, item); // ... replace the old item
  } else{// the item is not already in the array
    inarray.push(item); // Add the book to my collection
  }
  return inarray
}

/**
 * @description: Search for a books using external api. 
 * State variable and local-storage are updated
 * @param {string} searchString - the search string for books
 * @returns - search result
 */
searchBook(searchString){
  let promise = BooksAPI.search(searchString);
  
  promise.then(res => {
if (this.checkNotEmptyArray(res)){
        let shelfSortedSearch = this.sortIntoShelves(res); 
        if(this.checkNotEmptyArray(shelfSortedSearch)){    
          ls.set(ALL_BOOKS, shelfSortedSearch);
          this.setState({allBooks : shelfSortedSearch});
        } else {
          ls.set(ALL_BOOKS, []);
          this.setState({allBooks : []});
        }
      } else {
          ls.set(ALL_BOOKS, []);
          this.setState({allBooks : []});
      } 
        return res;        
    },(data) => {
        return data;
    }).catch(error => {
        alert(error)
        ls.set(ALL_BOOKS, []);
        this.setState({allBooks : []});
    }
  );
 }

 /**
 * @description: Updates the searchstring - saves it so it persists
 * @param {string} searchString - the search string for books
 * @returns - nothing
 */
updateSearchQuery = (searchString) => {
  this.setState({searchQuery : searchString});
}

 /**
 * @description: Sorts books from the search result based on what the user
 * already possess. 
 * 
 * @param {string} searchresult - the search string for books
 * @returns - nothing
 */
sortIntoShelves = (searchresult) => searchresult.map(newBook => { 
  this.state.mybooks.map(mybook => {
      if (mybook.id === newBook.id){
          newBook.shelf = mybook.shelf;
        }
        return newBook;
      });
  
      // newBook is not in my books
      if (newBook.shelf === undefined || newBook.shelf === ''){
        newBook.shelf = 'none';
      }
        return newBook;
      });

render() {
  // is state really updated? can I rely on that?

  let inputSource = this.state.mybooks;
  
  this.wantToReadBooks = inputSource.filter(e => {
  return e.shelf === "wantToRead"});
  
  this.currentlyReadingBooks = inputSource.filter(e => {
  return e.shelf === "currentlyReading"});
  
  this.readBooks = inputSource.filter(e => {
  return e.shelf === "read"});
  
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
      mybooks: this.readBooks
    }
    ];  
   
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
          <hr />
            <Route exact path="/search" render={(props) => (<SearchField 
                                                                state={this.state} 
                                                                searchBook={this.searchBook} 
                                                                changeShelf={this.changeShelf}
                                                                updateSearchQuery={this.updateSearchQuery}
                                                                location = {this.props.location}
                                                                {...props}>
                                                            </SearchField>
                                                            )}/>
           <Route exact path="/" render={() => (
                    <div className="list-books">
                    <div className="list-books-title">
                      <h1>MyReads</h1>
                    </div>
                      <div className="list-books-content">
                        <div>
                        {this.readingStates.map(item => { 
                          return (<BookShelf key={item.shelf} mybooks={item.mybooks} readingState={item.shelf} 
                                      shelfDescription={item.description} changeShelf={this.changeShelf} > 
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