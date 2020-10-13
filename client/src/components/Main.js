import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import List from "./List";
import Form from "./Form";

//Create a Main Component
class Main extends Component {

    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/test" render={props =>
                  <div>
                    <List />
                    <Form />
                  </div>
                  } />
    
                
            </div>
        )
    }
}
//Export The Main Component
export default Main;