import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import { userProfile } from "../js/actions/index";
import { connect } from "react-redux";

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
            file : null,
            message : "",
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

    onChange(e) {
        var orig = e.target.files[0];
        var id = localStorage.getItem("user_id");
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

        this.props.userProfile({ 'userProfile': 'Updated User Profile' });
    }



    render(){
        var name = this.state.name;
        var email = this.state.email;
        var phone = this.state.phone;
        var things = this.state.things;
        var address = this.state.address;

        var id = localStorage.getItem("user_id");

        var image;
        console.log(111);
        try {
            const images = require.context('../public/uploads', true);
            image = images('./' + 'IMAGE-user-' + id + '.png');

        } catch (err) {
            const images = require.context('../public/uploads', true);
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

const mapStateToProps = state => ({
    userProfile: 'Updated User Profile'
 });
 
 function mapDispatchToProps(dispatch) {
   return {
    userProfile: user => dispatch(userProfile(user))
   };
 }
 const userdProfile = connect(mapStateToProps, mapDispatchToProps)(UserPage);
 export default userdProfile;
 

// export default UserPage;