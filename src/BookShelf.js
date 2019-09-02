import React from 'react';
import './App.css'; 
import GenerateBook from './GenerateBook';

class BookShelf extends React.Component{

  constructor(props){
    super(props);
    //this.changeShelf = this.props.changeShelf.bind(this);
    this.removeBook = this.props.removeBook.bind(this);
  }

  changeShelf = (bookId, shelf) => {
    console.log("forceupdate")
   // this.forceUpdate();
    this.props.changeShelf(bookId, shelf);
  }
    render(){  
      return( 
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.shelfDescription}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              <li>
                { this.props.mybooks.map((b) => {
                    return( <GenerateBook key={b.id} bookTitle={b.title} bookAuthors={b.authors}
                                        imageLinks={b.imageLinks} id={b.id} shelf={b.shelf} 
                                        mybooks={this.props.mybooks} readingState={this.props.readingState} 
                                        removeBook={this.props.removeBook}
                                        changeShelf={this.changeShelf}>
                            </GenerateBook>)   
                        })
                  }
              </li>
            </ol>                 
          </div>
        </div>)
      }
}
export default BookShelf;