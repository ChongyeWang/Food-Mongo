import React, {Component} from 'react';
import { connect } from "react-redux";
import axios from 'axios';


class Events extends Component{

    constructor(){
        super();
        this.state = {
            events: [],
            search: [],
            currentPage: 1,
            todosPerPage: 3

        }
        this.handleClick = this.handleClick.bind(this);
  
    }  

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

     //get the data from backend  
     componentDidMount(){

      fetch('/event/all')
      .then(response => response.json())
      .then(data => {
         console.log('Success:', data);
        this.setState({
            events: data
        });
        this.setState({
          events: this.state.events.sort((a, b) => (a.date > b.date) ? 1 : -1)
        });

      })
      .catch((error) => {
          console.log(error);
      })

  }

  
  
  KeyChangeHandler = (e) => {
      const data = {
          keyword : e.target.value,
      }
    
      axios.post('/event/search', data)
      .then(response => {

        this.setState({
          search: response.data
      });

      }) 

    }

  submitEvent = (id) => {
      // e.preventDefault();
      const data = {
          userId : localStorage.getItem("user_id"),
          eventId : id,
      }
  
      //set the with credentials to true
      axios.defaults.withCredentials = true;
    
      axios.post('/event/register_event', data)
          .then(response => {
              alert("Successfully Registered!");
          })
    }

    asc = (e) => {
      this.setState({
        events: this.state.events.sort((a, b) => (a.date > b.date) ? 1 : -1)
      });
      
    }

    desc = (e) => {
      this.setState({
        events: this.state.events.sort((a, b) => (a.date > b.date) ? -1 : 1)
      });
    }
  

    
  render() {
    var events = this.state.events;

    var currentPage = this.state.currentPage;
    var todosPerPage = this.state.todosPerPage;

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = events.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderTodos = currentTodos.map((d, index) => {
      return <li style={{fontSize: '25px', fontWeight: 'bold'}} key={index}>{d.name} 
      <span style={{display:'inline-block', width: '50px'}}></span> {d.content} 
      <span style={{display:'inline-block', width: '50px'}}></span> {d.date} 
      <span style={{display:'inline-block', width: '50px'}}></span> {d.location} 
      <span style={{display:'inline-block', width: '50px'}}></span> 
      <button onClick = {() => {this.submitEvent(d._id)}} class="btn btn-primary">Register</button> 
      
      </li>;
      
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(events.length / todosPerPage); i++) {
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

    var searchItems  = this.state.search.map((d) => 
      <div style={{fontSize: '25px', fontWeight: 'bold'}} key={d.name}>
      {d.name} 
      <span style={{display:'inline-block', width: '50px'}}></span> {d.content} 
      <span style={{display:'inline-block', width: '50px'}}></span> {d.date} 
      <span style={{display:'inline-block', width: '50px'}}></span> {d.location} 
      <span style={{display:'inline-block', width: '50px'}}></span> 
      <button onClick = {() => {this.submitEvent(d._id)}} class="btn btn-primary">Register</button> 
    </div>);

    return (
      <div >
          <div style={{marginLeft:'150px', marginTop:'30px'}}>
          <div class="" style={{marginTop:'30px', width:'300px'}}>
              <div class="panel">
              </div>
              <div class="form-group">
                  <input onChange = {this.KeyChangeHandler} type="text" class="form-control" name="key" placeholder="Search Event"/>
              </div>           
            
          </div>
          <h4>{searchItems}</h4>

          <button onClick =  {this.asc} class="btn btn-primary">Ascending</button> 
          <button onClick = {this.desc} class="btn btn-primary">Descending</button> 
            <h3>All Events</h3>
            <ul>
            {renderTodos}
            </ul>
            <ul id="page-numbers" style={{display : 'inline-block', color: 'blue'}} >
            {renderPageNumbers}
            </ul>

          <h3>Registered Users</h3>
          {events.map(post => (
          <li key={post._id} className='list-group-item'>
            <span style={{fontWeight: 'bold', marginRight: '20px'}}>{post.name}</span> 
            {post.content} {post.date} {post.location} 
            <span style={{marginRight: '20px'}}></span>

            <ul className='list-group mb-4'>
              {post.userId.map((user,index) => (
                <li>
                  <a href={'/user-page/' + user}>{index}</a>
                </li>
              ))}
            </ul>

          </li>
        ))}
        </div>
      </div>
    );

  }
    
};

export default Events;
