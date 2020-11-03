import React, {Component} from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { registerUser } from "../js/actions/index";

//Define a Login Component
class Register extends Component{
    //call the constructor method
    constructor(props){
        
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            email : "",
            phone: "",
            web : "",
            like : "",
            address: "",
            authFlag : false,
            message : false
        }
        
    }

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

    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }

    phoneChangeHandler = (e) => {
        this.setState({
            phone : e.target.value
        })
    }

    webChangeHandler = (e) => {
        this.setState({
            web : e.target.value
        })
    }

    likeChangeHandler = (e) => {
        this.setState({
            like : e.target.value
        })
    }

    addressChangeHandler = (e) => {
        this.setState({
            address : e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password,
            email : this.state.email,
            phone : this.state.phone,
            web : this.state.web,
            like : this.state.like,
            address : this.state.address,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        this.props.registerUser({ 'Username': this.state.username });


        fetch('/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          this.setState({
            authFlag: true
        });
        })
        .catch((error) => {
            console.log("error");
        })

    }

    render(){ 
        let redirectVar = null;
         if (this.state.authFlag === true) {
            redirectVar = <Redirect to= "/users/login"/>;
        }
        let message = "New User Register.";
        console.log(this.state.message);
        if (this.state.message === true) {
            message = "Username Already Exists";
        }
        return(
            <div>
                {redirectVar}
                <div class="container">
                    
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                            <h2>Register</h2>
                                
                            </div>
                            
                                <div class="form-group">
                                    <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.emailChangeHandler} type="email" class="form-control" name="email" placeholder="Email"/>
                                </div>

                                <div class="form-group">
                                    <input onChange = {this.phoneChangeHandler} type="text" class="form-control" name="phone" placeholder="Phone"/>
                                </div>

                                <div class="form-group">
                                    <input onChange = {this.webChangeHandler} type="text" class="form-control" name="web" placeholder="Website"/>
                                </div>

                                <div class="form-group">
                                    <input onChange = {this.likeChangeHandler} type="text" class="form-control" name="like" placeholder="Things Love"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.addressChangeHandler} type="text" class="form-control" name="address" placeholder="Address"/>
                                </div>
                                <button onClick = {this.submitLogin} class="btn btn-primary">Register</button>                 
                        </div>
                        <p>{message}</p>

                        <a href={'/restaurant/register'}><h4>Open a New Restaurant</h4></a>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
   registeredUser: state.username 
});

function mapDispatchToProps(dispatch) {
  return {
    registerUser: user => dispatch(registerUser(user))
  };
}
const RegisteredUser = connect(mapStateToProps, mapDispatchToProps)(Register);
export default RegisteredUser;
