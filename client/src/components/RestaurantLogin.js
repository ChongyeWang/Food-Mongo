import React, {Component} from 'react';

import jwt_decode from "jwt-decode";
import {Redirect} from 'react-router';

//Define a Login Component
class RestaurantLogin extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            token: "",
            authFlag : false,
            message : false
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        fetch('/restaurant/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(data => {
              // console.log('Success:', data);
              this.setState({
                  token: data.token,
                  authFlag: true
              });
              console.log(data.token);
          })
          .catch((error) => {
              console.log(error);
          })

    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(this.state.authFlag === true){
            redirectVar = <Redirect to= "/restaurant/profile"/>
        }
        let message = "Please enter password.";
        console.log(this.state.message);
        if (this.state.message === true) {
            message = "Incorrect credentials."
        }
        if (this.state.token.length > 0) {
            localStorage.setItem("token", this.state.token);

            var decoded = jwt_decode(this.state.token.split(' ')[1]);
            localStorage.setItem("restaurant_id", decoded._id);
            localStorage.setItem("restaurant_username", decoded.username);
            
            // redirectVar = <Redirect to="/home" />
        }
        return(
            <div>
                {redirectVar}
                <div class="container">
                    
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <h2>Restaurant Login</h2>
                                <p>Please enter your username and password</p>
                            </div>
                            
                                <div class="form-group">
                                    <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                                </div>
                                <button onClick = {this.submitLogin} class="btn btn-primary">Login</button>                 
                        </div>

                        <p>{message}</p>
                    </div>
                </div>
            </div>
        )
    }
}
//export Login Component
export default RestaurantLogin;