import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
    width: '80%',
    height: '100%',
};
  
class UserHome extends Component{
    constructor(){
        super();
        this.state = {
            res: [],
            search: [],
            currentPage: 1,
            todosPerPage: 3,
            following: []
        }
        this.handleClick = this.handleClick.bind(this);
    }  
    
 
    componentDidMount(){
        axios.get('/users/all')
        .then((response) => {
            console.log(response.data)

            this.setState({
                res: response.data,
            });
        });
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    
    KeyChangeHandler = (e) => {
        const data = {
            keyword : e.target.value,
        }
      
        axios.post('/users/search', data)
        .then(response => {
          console.log(response.data);
          this.setState({
            search: response.data
          });
        }) 
    }

    follow = (e) =>{
        const data = {
            userId : localStorage.getItem("user_id")
        }

        axios.post("/users/show", data)
            .then((response) => {
              var show = response.data;
              console.log(show);
              this.setState({
                res: show
              });
              
            }).catch((error) => {
        });
    }



    render(){
        var res = this.state.res;
        const listItems = res.map((d) => <div key={d._id} style={{marginLeft: '200px', marginTop: '10px'}}>
            <a href={'/user-page/' + d._id}>{d.username}</a>
            <span style={{display:'inline-block', width: '50px'}}></span>
            Contact : {d.email}
        </div>);

        var search = this.state.search;
        const searchItems = search.map((d) => <div key={d._id} style={{ marginTop: '10px'}}>
            <a href={'/user-page/' + d._id}>{d.username}</a>
            <span style={{display:'inline-block', width: '50px'}}></span>
            Contact : {d.email}

        </div>);

        var following = this.state.following;
        console.log(following);
        const followingItems = following.map((d) => <div key={d._id} style={{ marginTop: '10px'}}>
            <a href={'/user-page/' + d._id}>{d.username}</a>
            <span style={{display:'inline-block', width: '50px'}}></span>
            Contact : {d.email}

        </div>);



        var currentPage = this.state.currentPage;
        var todosPerPage = this.state.todosPerPage;

        var users = this.state.res;

        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = users.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((d, index) => {
        return <li style={{fontSize: '25px', fontWeight: 'bold'}} key={index}>
        <a href={'/user-page/' + d._id}>{d.username}</a>
        <span style={{display:'inline-block', width: '50px'}}></span> {d.email} 
        
        </li>;
        });

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(users.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
        return (
            <li style={{display : 'inline-block', width: '50px', fontSize: '20px', fontWeight: 'bold'}} 
            key={number}
            id={number}
            onClick={this.handleClick}
            >
            {number}
            </li>
        );
        
        });

        return(
            <div>
                <div class="" style={{marginTop:'30px', width:'500px', marginLeft: '200px'}}>
                    <h3 style={{fontWeight: 'bold'}}>Search User</h3>
                    <div class="panel">
                    </div>
                    <div class="form-group">
                        <input onChange = {this.KeyChangeHandler} type="text" class="form-control" name="key" placeholder="Search with user name, location"/>
                    </div> 
                    
                    <h4>{searchItems}</h4>


                    <h3 style={{display : 'inline-block', fontSize: '30px', fontWeight: 'bold'}}>All Users</h3>
                    <ul>
                    {renderTodos}
                    </ul>
                    <ul id="page-numbers" style={{display : 'inline-block', color: 'blue'}} >
                    {renderPageNumbers}
                    </ul>

                </div>       
                <button style={{marginTop:'30px', marginLeft: '200px'}} onClick = {this.follow} class="btn btn-primary">Filter by following users</button> 

            </div> 


        )
    }   
}



export default UserHome;