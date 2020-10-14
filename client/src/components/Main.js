import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import List from "./List";
import Form from "./Form";
import Register from './Register';
import Login from './Login';
import Nav from './Navbar';
import Home from './Home';

//Create a Main Component
class Main extends Component {

    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Nav}/>
                <Route path="/home" component={Home}/>
                <Route path="/users/register" component={Register}/>
                <Route path="/users/login" component={Login}/>
    
                
            </div>
        )
    }
}
//Export The Main Component
export default Main;