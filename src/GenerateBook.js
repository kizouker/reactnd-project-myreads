import React from 'react';
import './App.css';
import BookShelfChanger from './BookShelfChanger';

class GenerateBook extends React.Component{
  state = {
      shelf : this.props.shelf
  }
  changeShelf = (newShelf) => {
    this.setState ({shelf: newShelf})
    console.log("newShelf:  " +newShelf);
  }
  render(){
    return(<li>
              <div className="book">  
                <div className="book-top">
                <div className="book-cover" 
                  style={{ width: 128, height: 193, backgroundImage: `url("${this.props.imageLinks.thumbnail}")`}}></div>
                  <BookShelfChanger readingState={this.props.readingState} shelf={this.state.shelf} changeShelf={this.changeShelf}></BookShelfChanger> 
                  </div>                
                <div className="book-title">{this.props.bookTitle}</div>
                <div className="book-authors">{this.props.bookAuthors}</div>
                <div className="book-ID">{this.props.id}</div>
              </div> 
          </li>)
  }
}
export default GenerateBook;