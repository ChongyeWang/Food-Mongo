import React, { Component } from 'react';
import List from "./components/List";
import Form from "./components/Form";
import './App.css';

import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';


class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
        
          <Main/>
  
        </div>
      </BrowserRouter>


    );
  }
}

export default App;