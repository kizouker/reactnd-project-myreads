import React from 'react';
import './App.css';
import GenerateBooks from './GenerateBooks';   
import GenerateBook from './GenerateBook';

class BookShelf extends React.Component{
    render(){  
      return( <div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.shelfDescription}</h2>
                <div className="bookshelf-books">
                { this.props.books.map((b) => {
                  return(<GenerateBook key={b.id} bookTitle={b.title} bookAuthors={b.authors}
                                imageLinks={b.imageLinks} id={b.id} shelf={b.shelf} 
                                books={this.props.books} readingState={this.props.readingState}>
                  </GenerateBook>)
                })}
                </div>
              </div>
              )
      }
}
export default BookShelf;