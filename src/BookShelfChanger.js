import React from 'react';
import './App.css';

class BookShelfChanger extends React.Component{
  constructor(props){
    super(props);
    this.state = {value : this.props.shelf};

    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const bookShelf = target.value;
    this.setState({value: event.target.value});


    this.props.changeShelf(this.props.bookId, bookShelf);
   }

   handleSubmit = (e) => {
    alert('Your favorite flavor is: ' + this.state.value);
    e.preventDefault(); //prevent that the whole page reloads
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