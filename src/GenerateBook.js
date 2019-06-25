import React from 'react';
import './App.css';
import BookShelfChanger from './BookShelfChanger';
import { throwStatement } from '@babel/types';


class GenerateBook extends React.Component{

  constructor(props){
    super(props);
    this.changeShelf = this.props.changeShelf.bind(this);
    this.removeBook = this.props.removeBook.bind(this);
  }

  
  render(){
    return(<div className="book">  
                <div className="book-top">
                <div className="book-cover" 
                  style={{ width: 128, height: 193, backgroundImage: `url("${this.props.imageLinks.thumbnail}")`}}></div>
                  <BookShelfChanger readingState={this.props.readingState} changeShelf={this.props.changeShelf}
                  bookId={this.props.id}></BookShelfChanger> 
                  </div>                
                <div className="book-title">{this.props.bookTitle}</div>
                <div className="book-authors">{this.props.bookAuthors}</div>
                <div className="book-ID">{this.props.id}</div>
                
                <button onClick={e => this.props.removeBook(this.props.id, e )}>
                  Remove book
                </button>
                
                </div>)
  }
}
export default GenerateBook;