import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

class Dish extends Component{
    //call the constructor method
    constructor(props){
        
        super(props);
        //maintain the state required for this component
        this.state = {
            name : "",
            price : "",
            category : "",
            authFlag: false
        }
        
    }

    nameChangeHandler = (e) => {
        this.setState({
            name : e.target.value
        })
    }
    priceChangeHandler = (e) => {
        this.setState({
            price : e.target.value
        })
    }

    categoryChangeHandler = (e) => {
        this.setState({
            category : e.target.value
        })
    }

    submitDish = (e) => {
        var headers = new Headers();
        e.preventDefault();
        const data = {
            id : localStorage.getItem("restaurant_id"),
            name : this.state.name,
            price : this.state.price,
            category : this.state.category
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;

        axios.post('/restaurant/add_dish', data)
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
                                <h2>Add Dish</h2>
                                
                            </div>
                            
                                <div class="form-group">
                                    <input onChange = {this.nameChangeHandler} type="text" class="form-control" name="name" placeholder="Name"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.priceChangeHandler} type="text" class="form-control" name="price" placeholder="Price"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.categoryChangeHandler} type="text" class="form-control" name="category" placeholder="Category"/>
                                </div>
                                <button onClick = {this.submitDish} class="btn btn-primary">Add</button>                 
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
//export Register Component
export default Dish;