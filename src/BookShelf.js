import React from 'react';
import './App.css';
import GenerateBooks from './GenerateBooks';   

class BookShelf extends React.Component{
    render(){  
      return( <div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.readingState}</h2>
                <div className="bookshelf-books">
                    <GenerateBooks readingState={this.props.readingState}></GenerateBooks>
                </div>
              </div>);
      }
    }

export default BookShelf;