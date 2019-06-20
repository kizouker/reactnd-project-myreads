import React from 'react';
import './App.css';
import GenerateBooks from './GenerateBooks';   

class BookShelf extends React.Component{
    render(){  
      return( <div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.shelfDescription}</h2>
                <div className="bookshelf-books">
                    <GenerateBooks books={this.props.books} readingState={this.props.readingState}></GenerateBooks>
                </div>
              </div>);
      }
    }

export default BookShelf;