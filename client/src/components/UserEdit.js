import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

class UserEdit extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : "",
            phone : "",
            things : "",
            address : "",
            authFlag : false
        }
    }

    thingsChangeHandler = (e) => {
        this.setState({
            things : e.target.value
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

    locationChangeHandler = (e) => {
        this.setState({
            address : e.target.value
        })
    }

    submitEdit = (e) => {
        e.preventDefault();
        const data = {
            id: localStorage.getItem("user_id"),
            email : this.state.email,
            phone : this.state.phone,
            things : this.state.things,
            address : this.state.address
        }

        axios.defaults.withCredentials = true;
        axios.post('/users/edit',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            console.log("Status Code : ",111);
            this.setState({
                authFlag : true
            })
            
        })
    }

    render(){ 
        let redirectVar = null;
        if(this.state.authFlag === true){
            redirectVar = <Redirect to= "/users/profile"/>;
        }
        return(
            <div>
                {redirectVar}
                <div class="container"> 
                    <div class="">
                        <div class="main-div">
                            <div class="panel">
                                <h2>Edit Profile</h2>     
                            </div>
                                <div class="form-group">
                                    <input onChange = {this.emailChangeHandler} type="text" class="form-control" name="email" placeholder="Email"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.phoneChangeHandler} type="text" class="form-control" name="phone" placeholder="Phone"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.thingsChangeHandler} type="text" class="form-control" name="things" placeholder="Things I Love"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.locationChangeHandler} type="text" class="form-control" name="location" placeholder="Address"/>
                                </div>
                                <button onClick = {this.submitEdit} class="btn btn-primary">Edit</button>                 
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default UserEdit;