import React from 'react';
import './App.css';
import SearchField from './SearchField';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI';
      
class BooksApp extends React.Component {

  readingStates =  [{"currentlyReading" : "Currently Reading"},
                    {"wantToRead" : "Want to Read"},
                    {"read" : "Read"}];
  
  readingStates2 =  {"currentlyReading" : "Currently Reading",
                    "wantToRead" : "Want to Read",
                    "read" : "Read"
                  }
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */

      showSearchPage: false,
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
  }

  componentDidMount(){
    console.log ("componentDidMount");
    let promise = BooksAPI.getAll();
    let books = promise.then(res => {
          this.setState({ books : res});
          return res;
    },(data) => {
      return data;
    });
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
        {this.state.showSearchPage ? (<SearchField></SearchField>):(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.keys.map(key => {
                  this.readingStates.filter (e => 
                                              { //console.log(e);
                                               console.log(e[key]);
                                                return e === key}
                                              )
                  console.log(key);
                    return (<BookShelf books={this.state.books} readingState={key} shelfDescription={this.readingStates.filter(e => 
                      e===key)}> </BookShelf>)
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