import React from 'react';
import './App.css';

class BookShelfChanger extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value : this.props.shelf
    }
    this.handleChange = this.handleChange.bind(this);
    this.state.value = this.props.shelf;
    this.changeShelf = this.props.changeShelf.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const bookShelf = target.value;
    this.changeShelf(this.props.book, bookShelf, this.props.location);
    this.setState({value: event.target.value});
   }  
 
  render(){
    return( <div className="book-shelf-changer">
              <form onSubmit={this.handleSubmit}>
                <select value={this.state.value} onChange={event => this.handleChange(event)} >
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