import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addBook } from "../js/actions/index";
class ConnectedForm extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  async handleSubmit(event) {
    event.preventDefault();
    
    console.log(11111);
    
    fetch('/users')
      .then((response) => response.json())
      .then((data) => console.log('This is your data', data));

    const { title } = this.state;
    const id = uuidv1();
     this.props.addBook({ title, id });
    this.setState({ title: "" });
  }
  render() {
    const { title } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          SAVE
        </button>
      </form>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    addBook: book => dispatch(addBook(book))
  };
}
const Form = connect(null, mapDispatchToProps)(ConnectedForm);
export default Form;