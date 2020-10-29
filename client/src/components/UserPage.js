import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';


//Define a Login Component
class UserPage extends Component{


    constructor(){
        super();
        this.state = {
            name : "",
            email: "",
            phone: "",
            things: "",
            address: "",
            file : null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }  

    //get the data from backend  
    componentDidMount(){
        var id = localStorage.getItem("user_id");
        fetch('/users/profile/' + id)
        .then(response => response.json())
        .then(data => {
            // console.log('Success:', data);
          this.setState({
              name: data.data.name,
              email: data.data.email,
              phone: data.data.phone,
              things: data.data.things,
              address: data.data.address,
          });

        })
        .catch((error) => {
            console.log(error);
        })
    }

    // contentChangeHandler = (e) => {
    //     e.preventDefault();
    //     this.setState({
    //         review : e.target.value
    //     })
    // }


    // selectChangeHandler = (e) => {
    //     e.preventDefault();
    //     this.setState({
    //         selectItems:[...this.state.selectItems, e.target.value]
    //     })
    //     console.log(this.state.selectItems);
    // }


    // submitReview = (e) => {
    //     e.preventDefault();
    //     const data = {
    //         content : this.state.review,
    //     }
    //     //set the with credentials to true
    //     // axios.defaults.withCredentials = true;

    //     // var id = this.props.match.params.id;
    //     // axios.post(`http://localhost:3001/restaurant/${id}/review`,data)
    //     //     .then(response => {
    //     //         console.log("Status Code : ",response.status);
    //     // })

    // }
    

    // delivery = (e) => {
    //     this.setState({
    //         delivery: true
    //     })
    // }

    // pickUp = (e) => {
    //     this.setState({
    //         delivery: false
    //     })
    // }

    // placeOrder = (e) => {
    //     e.preventDefault();
    //     const data = {
    //         delivery : this.state.delivery,
    //         selectItems : this.state.selectItems
    //     }
    //     //set the with credentials to true
    //     // axios.defaults.withCredentials = true;

    //     var id = this.props.match.params.id;
    //     // axios.post(`http://localhost:3001/restaurant/${id}/place_order`,data)
    //     //     .then(response => {
    //     //         console.log("Status Code : ",response.status);
    //     // })
    // }


    onChange(e) {
        var orig = e.target.files[0];
        var id = localStorage.getItem("restaurant_id");
        var renamedFile = new File([orig], 'user-' + id + '.png', {type: orig.type});
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

        axios.post("/users/upload-picture",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
    }


    render(){
        var name = this.state.name;
        var email = this.state.email;
        var phone = this.state.phone;
        var things = this.state.things;
        var address = this.state.address;

        var id = localStorage.getItem("restaurant_id");

    //     var dish = this.state.dish;
    //     var reviews = this.state.reviews;
    //     const dishItems = dish.map((d) => <li key={d.name}>{d.name} <span style={{display:'inline-block', width: '50px'}}></span> {d.price}$<span style={{display:'inline-block', width: '50px'}}></span>   {d.category}</li>);
    //     const reviewItems = reviews.map((d) => <li key={d.date}>{d.date}<span style={{display:'inline-block', width: '50px'}}></span>{d.content}</li>);
    //     var id = this.props.match.params.id;


    //     const selectItems = dish.map((d) => 
    //         <option value={d.name}>Name:{d.name} Price:{d.price}$ Category:{d.category}</option>);


        var image;
        try {
            const images = require.context('../public/uploads', true);
            console.log(images);
            image = images('./' + 'IMAGE-user-' + id + '.png');

        } catch (err) {
            const images = require.context('../public/uploads', true);
            console.log(images);
            image = images('./' + 'IMAGE-user-default' + '.png');
        }


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

                    <h3><a href={'/users/edit'}>Edit Profile Information</a></h3>

                    <h3>Userame : {name}</h3>
                    <h3>Email : {email}</h3>
                    <h3>Phone : {phone}</h3>
                    <h3>Address : {address}</h3>
                    <h3>Things Love : {things}</h3>

                </div>  
             
            </div> 


        )
    }   
}


export default UserPage;