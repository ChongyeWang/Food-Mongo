import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

//Define a Login Component
class RestaurantEdit extends Component{
    constructor(props){
        super(props);
        //maintain the state required for this component
        this.state = {
            name : "",
            email : "",
            phone : "",
            location : "",
            authFlag : false
        }
    }

    nameChangeHandler = (e) => {
        this.setState({
            name : e.target.value
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
            location : e.target.value
        })
    }

    submitEdit = (e) => {
        var headers = new Headers();
        e.preventDefault();
        const data = {
            id: localStorage.getItem("restaurant_id"),
            name : this.state.name,
            email : this.state.email,
            phone : this.state.phone,
            location : this.state.location
        }
        var id = this.props.match.params.id;

        axios.defaults.withCredentials = true;
        axios.post('/restaurant/edit',data)
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
            redirectVar = <Redirect to= "/restaurant/profile"/>;
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
                                    <input onChange = {this.nameChangeHandler} type="text" class="form-control" name="name" placeholder="Name"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.emailChangeHandler} type="text" class="form-control" name="email" placeholder="Email"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.phoneChangeHandler} type="text" class="form-control" name="phone" placeholder="Phone"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.locationChangeHandler} type="text" class="form-control" name="location" placeholder="Location"/>
                                </div>
                                <button onClick = {this.submitEdit} class="btn btn-primary">Edit</button>                 
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
//export Register Component
export default RestaurantEdit;