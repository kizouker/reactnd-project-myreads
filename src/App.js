import React from 'react';
import './App.css';
import SearchField from './SearchField';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI';
import { isUpdateExpression } from '@babel/types';
      
class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.addItem = this.addItem.bind(this);
    this.searchBook = this.searchBook.bind(this);
    this.compare = this.compare.bind(this);
  }
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
      showSearchPage: false,
      searchResult: [],
      books: [
      {
          "title": "The Linux Command Line",
          "subtitle": "A Complete Introduction",
          "authors": [
              "William E. Shotts, Jr."
          ],
          "publisher": "No Starch Press",
          "publishedDate": "2012",
          "description": "You've experienced the shiny, point-and-click surface of your Linux computer—now dive below and explore its depths with the power of the command line. The Linux Command Line takes you from your very first terminal keystrokes to writing full programs in Bash, the most popular Linux shell. Along the way you'll learn the timeless skills handed down by generations of gray-bearded, mouse-shunning gurus: file navigation, environment configuration, command chaining, pattern matching with regular expressions, and more. In addition to that practical knowledge, author William Shotts reveals the philosophy behind these tools and the rich heritage that your desktop Linux machine has inherited from Unix supercomputers of yore. As you make your way through the book's short, easily-digestible chapters, you'll learn how to: * Create and delete files, directories, and symlinks * Administer your system, including networking, package installation, and process management * Use standard input and output, redirection, and pipelines * Edit files with Vi, the world’s most popular text editor * Write shell scripts to automate common or boring tasks * Slice and dice text files with cut, paste, grep, patch, and sed Once you overcome your initial \"shell shock,\" you'll find that the command line is a natural and expressive way to communicate with your computer. Just don't be surprised if your mouse starts to gather dust. A featured resource in the Linux Foundation's \"Evolution of a SysAdmin\"",
          "industryIdentifiers": [
              {
                  "type": "ISBN_13",
                  "identifier": "9781593273897"
              },
              {
                  "type": "ISBN_10",
                  "identifier": "1593273894"
              }
          ],
          "readingModes": {
              "text": true,
              "image": false
          },
          "pageCount": 480,
          "printType": "BOOK",
          "categories": [
              "COMPUTERS"
          ],
          "averageRating": 4,
          "ratingsCount": 2,
          "maturityRating": "NOT_MATURE",
          "allowAnonLogging": true,
          "contentVersion": "1.2.2.0.preview.2",
          "panelizationSummary": {
              "containsEpubBubbles": false,
              "containsImageBubbles": false
          },
          "imageLinks": {
              "smallThumbnail": "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
              "thumbnail": "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
          },
          "language": "en",
          "previewLink": "http://books.google.com/books?id=nggnmAEACAAJ&dq=linux&hl=&cd=3&source=gbs_api",
          "infoLink": "https://play.google.com/store/books/details?id=nggnmAEACAAJ&source=gbs_api",
          "canonicalVolumeLink": "https://market.android.com/details?id=book-nggnmAEACAAJ",
          "id": "nggnmAEACAAJ",
          "shelf": "currentlyReading"
      }]
  };
wantToReadBooks; currentlyReadingBooks; readBooks; readingStates; totalResArray = [];

componentDidMount(){
  console.log ("componentDidMount");
  let promise = BooksAPI.getAll();
  promise.then(res => {
        this.setState({ books : res});
        return res;
  },(data) => {
    return data;
  });
}

searchBook(searchString){
  let promise = BooksAPI.search(searchString);
  let res;
  promise.then(res => {
      
      console.log ("--- res ---");
      console.log(res);
      console.log ("--- res ---");

      if (!(res === undefined) && Array.isArray(res) && (!(res.length === 0)))
      {
        let summa = this.compare(res); 
        if (!(summa === undefined) && Array.isArray(summa) 
          && (!(summa.length === 0))){    
          this.setState({searchResult : summa});      
        } else {
          this.setState({searchResult : []});
        }
      } else {
        res = [];
        this.setState({searchResult : res});
      } 
        return res;        
    },(data) => {
      return data;
    }).catch(error => {
        alert(error)
        res = [];
        this.setState({searchResult : res});
    }
  );
 }

removeBook = (bookId) => {
//console.log("remove book id: "+ bookId + " title: ");
this.setState(prevState => ({books: this.state.books.filter(book => {
  return book.id !== bookId
  })}
))
}

addItem = (book) => {
  //console.log("add item id: "+ book.id + " title: "+ book.title);
  this.setState(oldState => ({
    books : [...oldState.books,  book]
 }))
}
      
changeShelf = (bookId, shelf) => {
//console.log("changeShelf id: "+ bookId + " title: ");
let book = this.state.books.find(book => {
  return book.id === bookId
})
book.shelf = shelf;

this.removeBook(book.id);
this.addItem(book);
}

compare =  (searchresult) => searchresult.map(searchBook => { 
   this.state.books.map(allBook => {
    if (allBook.id === searchBook.id){
      searchBook.shelf = allBook.shelf;
    }
    });
  // inner end

  //searchbook is not in my books
  if (searchBook.shelf === undefined || searchBook.shelf === ''){
    searchBook.shelf = 'none';
  }
  
  console.log("--------");
  console.log(searchBook);
  console.log("--------");

  return searchBook;
});

render() {
  this.wantToReadBooks = this.state.books.filter(e => {
  return e.shelf === "wantToRead"});
  
  this.currentlyReadingBooks = this.state.books.filter(e => {
  return e.shelf === "currentlyReading"});
  
  this.readBooks = this.state.books.filter(e => {
  return e.shelf === "read"});
  
  this.readingStates =  [{ shelf : "currentlyReading",  
                      description : "Currently Reading",
                      books: this.currentlyReadingBooks
                    },
                    { shelf: "wantToRead", 
                      description : "Want to Read",
                      books: this.wantToReadBooks
                    },
                    { shelf : "read",  
                      description : "Read", 
                      books: this.readBooks
                    }];  
   
    return (
    <div className="app">
      {this.state.showSearchPage ? (<SearchField state={this.state} searchBook={this.searchBook} 
                                                 readingStates={this.readingStates}
                                                 removeBook={this.removeBook} 
                                                 changeShelf={this.changeShelf}
                                                 compare={this.compare}>
                                    </SearchField>):(
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
            {this.readingStates.map(item => {              
                return (<BookShelf books={item.books} readingState={item.shelf} 
                        shelfDescription={item.description} removeBook={this.removeBook} 
                        changeShelf={this.changeShelf}> 
                      </BookShelf>)
              })}               
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