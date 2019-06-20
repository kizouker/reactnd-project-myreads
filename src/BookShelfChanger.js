import React from 'react';
import './App.css';

class BookShelfChanger extends React.Component{

  changeShelf = (newShelf) => {
    this.setState({shelf : newShelf})
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
  
    console.log("name " +name);
    console.log("target " +target);
    console.log("target " +value);

    this.props.changeShelf(value);
   }

   handleSubmit = (e) => {
    console.log("--- --- handleSubmit --- ---");
    e.preventDefault(); //prevent that the whole page reloads
    alert('Your new shelf is'  + this.props.state.shelf);
  }
  /**  //    <input type="submit" value="Submit" /> */
  render(){
    return( <div className="book-shelf-changer">
              <form onSubmit={this.handleSubmit}>
                <select value={this.props.shelf} onChange={event => this.handleInputChange(event)} >
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
