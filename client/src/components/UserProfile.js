import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';


//Define a Login Component
class UserProfile extends Component{
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
        this.follow = this.follow.bind(this);
    }  

    //get the data from backend  
    componentDidMount(){
        var id = localStorage.getItem("user_id");
        fetch('/users/profile/' + id)
        .then(response => response.json())
        .then(data => {
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


    onChange(e) {
        var orig = e.target.files[0];
        var id = this.props.match.params.id;
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

    follow(e){
        e.preventDefault();
        const data = {
            targetId: this.props.match.params.id,
            userId : localStorage.getItem("user_id")
        }
       

        axios.post("/users/follow", data)
            .then((response) => {
                alert("Followed!");
                console.log(response.data);
            }).catch((error) => {
        });
    }

    render(){
        var name = this.state.name;
        var email = this.state.email;
        var phone = this.state.phone;
        var things = this.state.things;
        var address = this.state.address;

        var id = this.props.match.params.id;

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

                    <button onClick = {this.follow} class="btn btn-primary">Follow</button> 

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

export default UserProfile;