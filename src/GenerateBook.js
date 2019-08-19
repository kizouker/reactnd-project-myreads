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

  stylish = () => {
    let urlValue;
    console.log ("asDFASDFASDF");      
    if (this.props.imageLinks === undefined) {
      console.log("imgagelink null");
      urlValue = `url()`;        
    } else {
      console.log("imgagelink :" + this.props.imageLinks.thumbnail);
      urlValue = `url(${this.props.imageLinks.thumbnail})`;
      //urlValue = `url(` + this.props.imageLinks.thumbnail + `)`;
    }

    const style = {
      width: 128, 
      height: 193, 
      backgroundImage : urlValue
    };
    return style;
  }
  
  render(){
    return(<div className="book">  
                <div className="book-top">
                <div className="book-cover" 
                  style={this.stylish()}></div>
                  <BookShelfChanger readingState={this.props.readingState} changeShelf={this.props.changeShelf}
                  bookId={this.props.id} shelf={this.props.shelf}></BookShelfChanger> 
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