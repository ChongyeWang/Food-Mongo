import React, { Component } from 'react';
import List from "./components/List";
import Form from "./components/Form";
class App extends Component {
  render() {
    return (
<div>
    <div>
      <h2>BOOKS</h2>
      <List />
    </div>
    <div>
      <h2>Add a new book</h2>
      <Form />
    </div>
  </div>
    );
  }
}

export default App;