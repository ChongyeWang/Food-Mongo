import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';


//Define a Login Component
class Page extends Component{
    constructor(){
        super();
        this.state = {
            name : "",
            email: "",
            phone: "",
            location: [],
            dish: [],
            file : null,
            currentPage: 1,
            todosPerPage: 3,
            review: "",
            reviews: [],
            message: "",
            history : []

        }
        this.handleClick = this.handleClick.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
        this.message = this.message.bind(this);
    }  

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    

    //get the data from backend  
    componentDidMount(){
        var id = this.props.match.params.id;
        fetch('/restaurant/profile/' + id)
        .then(response => response.json())
        .then(data => {
            // console.log('Success:', data);
          this.setState({
              name: data.data.name,
              email: data.data.email,
              phone: data.data.phone,
              location: data.data.phone,
              dish: data.data.dish,
              reviews: data.data.review,
          });

        })
        .catch((error) => {
            console.log(error);
        })

        const data = {
            userId: localStorage.getItem("user_id"),
            restaurantId :  this.props.match.params.id,
        }
       

        axios.post("/restaurant/getMessage", data)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    history: response.data
                });
            }).catch((error) => {
        });

    }
    submitEvent = (id) => {
        if (localStorage.getItem('order') == null) {
            localStorage.setItem('order', id);
        }
        else {
            localStorage.setItem('order', localStorage.getItem('order').concat(",").concat(id));
        }
      }

    placeOrder(e) {
    var restaurant_id = this.props.match.params.id;
    console.log(localStorage.getItem("order"));
    const data = {
        userId : localStorage.getItem("user_id"),
        restaurantId : restaurant_id,
        order: localStorage.getItem("order"),
    }

    axios.defaults.withCredentials = true;
    
    axios.post('/restaurant/place_order', data)
        .then(response => {
            alert("Order Placed!");
        })
    }

    reviewChangeHandler = (e) => {
        this.setState({
            review : e.target.value
        })
    }

    addReview = (e) => {
        const data = {
            restaurantId: this.props.match.params.id,
            userId: localStorage.getItem("user_id"),
            review: this.state.review
        }
        axios.post('/restaurant/add_review', data)
        .then(response => {
            alert("Review Added!");
        })
    }


    message(e){
        e.preventDefault();
        const data = {
            restaurantId: this.props.match.params.id,
            userId : localStorage.getItem("user_id"),
            message : this.state.message
        }
        console.log(data)
       

        axios.post("/users/message", data)
            .then((response) => {
                alert("Message Sent!");
                console.log(response.data);
            }).catch((error) => {
        });
    }

    KeyChangeHandler = (e) => {
        console.log(e.target.value);
        this.setState({
            message: e.target.value
        });
  
      }


    render(){
        var name = this.state.name;
        var email = this.state.email;
        var phone = this.state.phone;
        var location = this.state.location;
        var dish = this.state.dish;

        var id = this.props.match.params.id;

        var currentPage = this.state.currentPage;
        var todosPerPage = this.state.todosPerPage;

        var reviews = this.state.reviews;

        var reviewItems = reviews.map((d, index) => {
            return <li style={{fontSize: '25px', fontWeight: 'bold'}} key={index}>{d.content} 
            <span style={{display:'inline-block', width: '50px'}}></span> 
            {d.date}          
            </li>;
            
          });

        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = dish.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((d, index) => {
            return <li style={{fontSize: '25px', fontWeight: 'bold'}} key={index}>{d.name} 
            <span style={{display:'inline-block', width: '50px'}}></span> 
            {d.price}$
            <span style={{display:'inline-block', width: '50px'}}></span>   
            {d.category}
            <span style={{marginRight: '20px'}}></span>
            <button onClick = {() => {this.submitEvent(d.name)}} class="btn btn-primary">Add</button> 
            </li>;
            
          });
      

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(dish.length / todosPerPage); i++) {
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



        var image;
        try {
            const images = require.context('../public/uploads', true);
            image = images('./' + 'IMAGE-restaurant-' + id + '.png');

        } catch (err) {
            const images = require.context('../public/uploads', true);
            image = images('./' + 'IMAGE-restaurant-default' + '.png');
        }

        var history = this.state.history;

        var historyItems  = history.map((d) => 
        <div style={{fontSize: '25px', fontWeight: 'bold'}} key={d.content}>
        {d.content} 
        <span style={{display:'inline-block', width: '50px'}}></span> {d.date} 
        </div>);

        return(
            <div>
                <div style={{marginLeft: '110px', marginTop: '10px'}}>
                    <div class="column" style={{width: "30%"}}>
                        <img src={image} alt="Logo" style={{width:'150px'}}/> 
                    </div>    

                    <h3>Restaurant Name : {name}</h3>
                    <h3>Email : {email}</h3>
                    <h3>Phone : {phone}</h3>
                    <h3>Address : {location}</h3>
                    <br></br>
                    <h3>All Dishes: </h3>
                    {/* <h3>{dishItems}</h3> */}

                    <div>
                        <ul>
                        {renderTodos}
                        </ul>
                        <ul id="page-numbers" style={{display : 'inline-block', color: 'blue'}} >
                        {renderPageNumbers}
                        </ul>
                    </div>
                    <button onClick = {this.placeOrder} type="submit" class="btn btn-primary">Place Order</button>

                    <div class="form-group">
                        <input onChange = {this.reviewChangeHandler} type="text" class="form-control" name="review" placeholder="Add Reviews"/>
                    </div> 
                    <button onClick = {this.addReview} type="submit" class="btn btn-primary">Add</button>
                    {reviewItems}



                    <div class="form-group" style={{marginTop:'30px'}}>

                        <h3 style={{marginTop: '50px'}}>Message History</h3>
                         {historyItems}
                        <input onChange = {this.KeyChangeHandler} type="text" class="form-control" name="key" placeholder="Send Message"/>
                        <button onClick = {this.message} class="btn btn-primary">Reply</button> 
                    </div>  
                </div>  
             
            </div> 


        )
    }   
}


export default Page;