import React from 'react';
import './App.css';
import GenerateBook from './GenerateBook';


class GenerateBooks extends React.Component{
    constructor(props){
      super(props);
    }
    
changeShelf = (bookId, newshelf) => {
    //this.setState({books : })
    this.state.books.filter (b => {
        return b.id === bookId;
    })
}

render(){
    return(<ol className="books-grid">
                {this.props.books.filter (book =>{
                                                return book.shelf === this.props.readingState})
                                        .map(b => {return (<GenerateBook    key={b.industryIdentifiers.identifier} 
                                                                            bookTitle={b.title} 
                                                                            bookAuthors={b.authors}
                                                                            imageLinks={b.imageLinks}
                                                                            id={b.id}
                                                                            shelf={b.shelf}>
                                                            </GenerateBook>)})}
        </ol>)
    }
}

export default GenerateBooks;