import React, {Component} from 'react';

import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

//Define a Login Component
class RegisterRestaurant extends Component{
    //call the constructor method
    constructor(props){
        
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            email : "",
            name : "",
            phone : "",
            location : "",
            lat : "",
            lon : "",
            authFlag : false,
            message : false,
            file : null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        
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

    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }

    nameChangeHandler = (e) => {
        this.setState({
            name : e.target.value
        })
    }

    phoneChangeHandler = (e) => {
        this.setState({
            phone : e.target.value
        })
    }

    locationChangeHandler = (e) => {
        this.setState({
            location : e.target.value
        })
    }

    latChangeHandler = (e) => {
        this.setState({
            lat : e.target.value
        })
    }

    lonChangeHandler = (e) => {
        this.setState({
            lon : e.target.value
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
            name : this.state.name,
            phone : this.state.phone,
            location : this.state.location,
            lat : this.state.lat,
            lon : this.state.lon
        }
        //set the with credentials to true

        fetch('/restaurant/register', {
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

    onChange(e) {
        var orig = e.target.files[0];
        var id = this.props.match.params.id;
        var renamedFile = new File([orig], 'restaurant-' + id + '.png', {type: orig.type});
        console.log(renamedFile);
        this.setState({file:renamedFile});
    }

    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        // axios.post("http://localhost:3001/upload-restaurant",formData,config)
        //     .then((response) => {
        //         alert("The file is successfully uploaded");
        //     }).catch((error) => {
        // });
    }

    

    render(){ 
        let redirectVar = null;
         if (this.state.authFlag === true) {
            redirectVar = <Redirect to= "/home"/>;
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
                                <h2>Register New Restaurant</h2>
                                
                            </div>
                            
                                <div class="form-group">
                                <form onSubmit={this.onFormSubmit}>
                                    <h3>Upload Picture</h3>
                                    <input type="file" name="myImage" onChange= {this.onChange} />
                                    <button type="submit">Upload</button>
                                </form>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username" required/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password" required/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.emailChangeHandler} type="email" class="form-control" name="email" placeholder="Email" required/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.nameChangeHandler} type="text" class="form-control" name="name" placeholder="Restaurant Name" required/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.phoneChangeHandler} type="text" class="form-control" name="phone" placeholder="Phone" required/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.locationChangeHandler} type="text" class="form-control" name="location" placeholder="Location" required/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.latChangeHandler} type="text" class="form-control" name="lat" placeholder="Latitude" required/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.lonChangeHandler} type="text" class="form-control" name="lon" placeholder="Longitude" required/>
                                </div>
                                <button onClick = {this.submitLogin} class="btn btn-primary">Register</button>                 
                        </div>
                        <p>{message}</p>
                        <a class="nav-item nav-link"><Link to="/restaurant-login" style={{color:'blue'}}>Already has one? Click here to Login.</Link></a>
                        
                    </div>
                </div>
            </div>
        )
    }
}
//export Register Component
export default RegisterRestaurant;