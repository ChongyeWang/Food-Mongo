import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

class AddEvent extends Component{
    //call the constructor method
    constructor(props){
        
        super(props);
        //maintain the state required for this component
        this.state = {
            name : "",
            content : "",
            date : "",
            location: false
        }
        
    }

    nameChangeHandler = (e) => {
        this.setState({
            name : e.target.value
        })
    }
    contentChangeHandler = (e) => {
        this.setState({
            content : e.target.value
        })
    }

    dateChangeHandler = (e) => {
        this.setState({
            date : e.target.value
        })
    }

    locationChangeHandler = (e) => {
        this.setState({
            location : e.target.value
        })
    }

    submiEvent = (e) => {
        e.preventDefault();
        const data = {
            id : localStorage.getItem("restaurant_id"),
            name : this.state.name,
            content : this.state.content,
            date : this.state.date,
            location : this.state.location
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;

        axios.post('/event/add_event', data)
            .then(response => {
                console.log("Status Code : ",response.status);
                this.setState({
                    authFlag: true
                });
            })
    }

    render(){ 
        let redirectVar = null;
        if (this.state.authFlag === true) {
            redirectVar = <Redirect to= "/restaurant/profile"/>;
        }
        return(
            <div>
                {redirectVar}
                <div class="container">
                    
                    <div class="">
                        <div class="main-div">
                            <div class="panel">
                                <h2>Add Event</h2>
                            </div>
                                <div class="form-group">
                                    <input onChange = {this.nameChangeHandler} type="text" class="form-control" name="name" placeholder="Name"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.contentChangeHandler} type="text" class="form-control" name="content" placeholder="Content"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.dateChangeHandler} type="text" class="form-control" name="date" placeholder="Date"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.locationChangeHandler} type="text" class="form-control" name="locationC" placeholder="Location"/>
                                </div>
                                <button onClick = {this.submiEvent} class="btn btn-primary">Add</button>                 
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
//export Register Component
export default AddEvent;