import React from 'react';
import './App.css';
import SearchField from './SearchField';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI';
import { Route,  Link } from 'react-router-dom'
import ls from 'local-storage'



const MY_BOOKS = "mybooks";
const ALL_BOOKS ="allbooks"


class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        searchQuery : '',     // running refresh in the the browser 
        searchResult: [],     // => runs the constructor again
        mybooks: [],
        allBooks : []
    };

    this.removeBook = this.removeBook.bind(this);
    this.searchBook = this.searchBook.bind(this);
    this.changeShelf = this.changeShelf.bind(this);
    this.checkNotEmptyArray = this.checkNotEmptyArray.bind(this);    
    this.sortIntoShelves = this.sortIntoShelves.bind(this);

    //Init to empty array
   // ls.set(MY_BOOKS, []);
    ls.set(ALL_BOOKS, []);
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


componentDidUpdate(prevProps, prevState, snapshot){

  const locationChanged = prevProps.location !== this.props.location;
  console.log("currentLocation "+ locationChanged);
 
}
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

// we are in the search...

console.log("l")
console.log(location)
console.log("l")


 if (location !== undefined){
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
 * @description: Removes a book from state variable and from the local-storage
 * @param {string} bookId - the book to be removed
 * @returns - nothing
 */
removeBook = (bookId) => {
  // get my books for the local storage
  let myBooks = ls.get(MY_BOOKS);
  //let allBooks = ls.get(ALL_BOOKS);
  // allBooks = this.sortIntoShelves(allBooks);

  // filter out everyone except the selected book
  let filtMyBooks = myBooks.filter(book => {
    return book.id !== bookId
  });

  // let filtAllBooks= allBooks.filter(book => {
  //   return book.id !== bookId
  // });
  // setstate - is async - and state updates are bundled - 
  // so checking state after a setstate doesn't work so well
 this.setState({mybooks: filtMyBooks});
 //this.setState({searchResult : allBooks}); 
  // update the local storage     
  ls.set(MY_BOOKS, filtMyBooks);
 // ls.set(ALL_BOOKS, filtAllBooks);
}

/**
 * @description: Adds a book to state variable and to the local-storage
 * @param {string} book - the book to be added
 * @returns - nothing
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

updateSearchQuery = (searchString) => {
  this.setState({searchQuery : searchString});
}

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
  //let inputSource = this.state.mybooksU.book;
  

  this.wantToReadBooks = inputSource.filter(e => {
  return e.shelf === "wantToRead"});
  
  this.currentlyReadingBooks = inputSource.filter(e => {
  return e.shelf === "currentlyReading"});
  
  this.readBooks = inputSource.filter(e => {
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
                                                                removeBook={this.removeBook} 
                                                                changeShelf={this.changeShelf}
                                                                updateSearchQuery={this.updateSearchQuery}
                                                                location = {this.props.location}
                                                                {...props}>
                                                            </SearchField>}/>
           <Route exact path="/" render={() => (

             
                    <div className="list-books">
                    <div className="list-books-title">
                      <h1>MyReads</h1>
                    </div>
                      <div className="list-books-content">
                        <div>
                          {

                     
                      console.log(this.props.location )
                                                }

                          {ls.set(ALL_BOOKS, [])}
                        {
                      //  console.log("location:" +this.props.location )
                        }
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