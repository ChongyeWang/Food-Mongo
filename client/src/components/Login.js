import React, { Component } from 'react';
import { Redirect } from 'react-router';
import jwt_decode from "jwt-decode";

//Define a Login Component
class Login extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constructor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username: "",
            password: "",
            authFlag: false,
            token: "",
            message: ""
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        //prevent page from refresh
        console.log(1212)
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        }

        fetch('/users/login', {
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

        // axios.post('https://localhost:5000/users/login',data)
        //     .then(response => {
        //         console.log("Status Code : ",response.status);
        //         if(response.status === 200){
        //             console.log(1111);
        //         }

        //         else{
        //             console.log(222);
        //         }
        //     });

    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        if(this.state.authFlag === true){
            redirectVar = <Redirect to= "/home"/>;
        }
        if (this.state.token.length > 0) {
            localStorage.setItem("token", this.state.token);

            var decoded = jwt_decode(this.state.token.split(' ')[1]);
            localStorage.setItem("user_id", decoded._id);
            localStorage.setItem("username", decoded.username);

            console.log(decoded._id)
            console.log(decoded.username)
            
            redirectVar = <Redirect to="/home" />
        }
        return (
            <div>
                {redirectVar}
                <div class="container">
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <h2>User Login</h2>
                                <p>Please enter your username and password</p>
                            </div>
                            <form onSubmit={this.submitLogin}>
                                <div style={{ color: "#ff0000" }}>{this.state.message}</div>
                                <div class="form-group">
                                    <input onChange={this.usernameChangeHandler} type="text" class="form-control" required name="username" placeholder="Username" />
                                </div>
                                <div class="form-group">
                                    <input onChange={this.passwordChangeHandler} type="password" class="form-control" required name="password" placeholder="Password" />
                                </div>
                                <button type="submit" class="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
//export Login Component
export default Login;