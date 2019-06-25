import React from 'react';
import './App.css'; 
import GenerateBook from './GenerateBook';

class BookShelf extends React.Component{

  constructor(props){
    super(props);
    this.removeBook = this.props.changeShelf.bind(this);
    this.removeBook = this.props.removeBook.bind(this);
  }
    render(){  
      return( 
        <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfDescription}</h2>
                  <div className="bookshelf-books">
                  <ol className="books-grid">
                  <li>
                  
                  { this.props.books.map((b) => {
                    return(<GenerateBook key={b.id} bookTitle={b.title} bookAuthors={b.authors}
                                  imageLinks={b.imageLinks} id={b.id} shelf={b.shelf} 
                                  books={this.props.books} readingState={this.props.readingState} 
                                  removeBook={this.props.removeBook}
                                  changeShelf={this.props.changeShelf}>
                    </GenerateBook>)
                  })}
                  </li>
                </ol>                 
                  </div>
                </div>
                  )
      }
}
export default BookShelf;