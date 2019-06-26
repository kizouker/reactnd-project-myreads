import React from 'react';
import './App.css';

class BookShelfChanger extends React.Component{

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
  
    console.log("name " +name);
    console.log("target " +target);
    console.log("target " +value);

    this.props.changeShelf(this.props.bookId, value);
   }

   handleSubmit = (e) => {
    console.log("--- --- handleSubmit --- ---");
    e.preventDefault(); //prevent that the whole page reloads

  }
 
  render(){
    return( <div className="book-shelf-changer">
              <form onSubmit={this.handleSubmit}>
                <select onChange={event => this.handleInputChange(event)} >
                  <option value="move" disabled >Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </form>
            </div>
    );
    }
  }

  export default BookShelfChanger;