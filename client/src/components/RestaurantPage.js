import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import { connect } from "react-redux";
import { restaurantPage2 } from "../js/actions/index";
//Define a Login Component
class RestaurantPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : "",
            email: "",
            phone: "",
            location: [],
            dish: [],
            order: [],
            file : null,
            currentPage: 1,
            todosPerPage: 3,
            search: [],
            orig:[]
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }  

    //get the data from backend  
    componentDidMount(){
        var id = localStorage.getItem("restaurant_id");
        var username = localStorage.getItem("restaurant_username");
        fetch('/restaurant/profile/' + id)
        .then(response => response.json())
        .then(data => {
         console.log('Success:', data);
          this.setState({
              name: data.data.name,
              email: data.data.email,
              phone: data.data.phone,
              location: data.data.location,
              dish: data.data.dish,
              order: data.data.order,
              orig : data.data.order
          });

        })
        .catch((error) => {
            console.log(error);
        })

    }
    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    submitEvent = (id) => {
        console.log(id);
        const data = {
            restaurantId : localStorage.getItem("restaurant_id"),
            orderId : id
        }

        axios.defaults.withCredentials = true;
      
        axios.post('/restaurant/update_order', data)
            .then(response => {
                alert("Updated!");
            })

        this.props.restaurantPage2(
            { 'RestaurantPage': this.state.name, 
              'Order': localStorage.getItem("order"),
              'Status': 'Delivered'
        });
      }

    onChange(e) {
        var orig = e.target.files[0];
        var id = localStorage.getItem("restaurant_id");
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

        axios.post("/restaurant/upload-picture",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
    }

    KeyChangeHandler = (e) => {
      const data = {
          id : localStorage.getItem("restaurant_id"),
          keyword : e.target.value,
      }
    
      axios.post('/restaurant/search', data)
      .then(response => {
        this.setState({
            search: response.data

        });
      }) 

    }

    pending = (e) =>{
        var data = this.state.orig;
        var result = []
        for (var i = 0; i < data.length; i++) {
            if (data[i].status === 'Pending') {
                result.push(data[i]);
            }
        }
        this.setState({
            order: result

        });
    }

    deliver = (e) =>{
        var data = this.state.orig;
        var result = []
        for (var i = 0; i < data.length; i++) {
            if (data[i].status === 'Delivered') {
                result.push(data[i]);
            }
        }
        this.setState({
            order: result

        });
    }

    all = (e) =>{
        this.setState({
            order: this.state.orig

        });
    }

    asc = (e) => {
        this.setState({
            order: this.state.order.sort((a, b) => (a.date > b.date) ? 1 : -1)
        });
        
      }
  
      desc = (e) => {
        this.setState({
            order: this.state.order.sort((a, b) => (a.date > b.date) ? -1 : 1)
        });
      }


    render(){
        var name = this.state.name;
        var email = this.state.email;
        var phone = this.state.phone;
        var location = this.state.location;

        var id = localStorage.getItem("restaurant_id");
        var dish = this.state.dish;
        var search = this.state.search;

        const serachItems = search.map((d) => 
        <li key={d.userId}>
            <a href={'/users/profile/' + d.userId}>View user profile</a>
            <span style={{display:'inline-block', width: '50px'}}></span> 
            {d.content}
            <span style={{display:'inline-block', width: '50px'}}></span>   
            {d.status}
        </li>);

        const dishItems = dish.map((d) => 
        <li key={d.name}>{d.name} 
            <span style={{display:'inline-block', width: '50px'}}></span> 
            {d.price}$
            <span style={{display:'inline-block', width: '50px'}}></span>   
            {d.category}
        </li>);

        var image;
        try {
            const images = require.context('../public/uploads', true);
            console.log(images);
            image = images('./' + 'IMAGE-restaurant-' + id + '.png');

        } catch (err) {
            const images = require.context('../public/uploads', true);
            console.log(images);
            image = images('./' + 'IMAGE-restaurant-default' + '.png');
        }

        var dish = this.state.dish;
        var order = this.state.order;
        var id = this.props.match.params.id;
        var currentPage = this.state.currentPage;
        var todosPerPage = this.state.todosPerPage;

        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = order.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((d, index) => {
            return <li style={{fontSize: '25px', fontWeight: 'bold'}} key={index}>
            <a href={'/user-page/' + d.userId}>View user profile</a>
            <span style={{display:'inline-block', width: '50px'}}></span> 
            {d.content}
            <span style={{display:'inline-block', width: '50px'}}></span>   
            {d.status}
            <span style={{marginRight: '20px'}}></span>
            {d.date}
            <button onClick = {() => {this.submitEvent(d._id)}} class="btn btn-primary">Update Status</button> 
            </li>;
            
          });

          const pageNumbers = [];
          for (let i = 1; i <= Math.ceil(order.length / todosPerPage); i++) {
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
                <div style={{marginLeft: '110px', marginTop: '10px'}}>

                    <div class="column" style={{width: "30%"}}>
                        <img src={image} alt="Logo" style={{width:'150px'}}/> 
                    </div>    
  
                    <form onSubmit={this.onFormSubmit}>
                        <h3>Update Profile Picture</h3>
                        <input type="file" name="myImage" onChange= {this.onChange} />
                        <button type="submit">Upload</button>
                    </form>

                    <h3><a href={'/restaurant/edit'}>Edit Profile Information</a></h3>
                    <h3><a href={'/restaurant/add-dish'}>Add Dish</a></h3>
                    <h3><a href={'/add_event'}>Add Event</a></h3>

                    <h3>Restaurant Name : {name}</h3>
                    <h3>Email : {email}</h3>
                    <h3>Phone : {phone}</h3>
                    <h3>Address : {location}</h3>
                    <h3 style={{fontWeight: 'bold'}}>All Dishes: </h3>
                    <h3>{dishItems}</h3>

                    <div>
                        <h3 style={{fontWeight: 'bold'}}>All Orders</h3>
                        <ul>
                        {renderTodos}
                        </ul>
                        <ul id="page-numbers" style={{display : 'inline-block', color: 'blue'}} >
                        {renderPageNumbers}
                        </ul>
                    </div>
                    <button onClick = {this.pending} class="btn btn-primary">Show Pending</button> 
                    <button onClick = {this.deliver} class="btn btn-primary">Show Delivered</button> 
                    <button onClick = {this.all} class="btn btn-primary">Show All</button> 
                    <button onClick =  {this.asc} class="btn btn-primary">Ascending</button> 
                    <button onClick = {this.desc} class="btn btn-primary">Descending</button> 

                    <div class="" style={{marginTop:'30px', width:'300px'}}>
                        <h3 style={{fontWeight: 'bold'}}>Search Order</h3>
                        <div class="panel">
                        </div>
                        <div class="form-group">
                            <input onChange = {this.KeyChangeHandler} type="text" class="form-control" name="key" placeholder="Search Order"/>
                        </div> 
                        
                    </div>
                    <h3>{serachItems}</h3>          

                </div>  
            </div> 


        )
    }   
}

const mapStateToProps = state => ({
    restaurantPage2: state.name 
 });
 
 function mapDispatchToProps(dispatch) {
   return {
    restaurantPage2: user => dispatch(restaurantPage2(user))
   };
 }
 const RestaurantPageProfile2 = connect(mapStateToProps, mapDispatchToProps)(RestaurantPage);
 export default RestaurantPageProfile2;
 
// export default RestaurantPage;