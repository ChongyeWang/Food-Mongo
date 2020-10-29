import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';


//Define a Login Component
class RestaurantHome extends Component{


    constructor(){
        super();
        this.state = {
            res: [],
            pos: []
        }


    }  

    //get the data from backend  
    componentDidMount(){

        axios.get('/restaurant/all')
        .then((response) => {
        //update the state with the response data

        var pos = []
        for (var i = 0; i < response.data.length; i++) {
            var data = {};
            var ele = response.data[i];
            data['latitude'] = parseFloat(ele['lat']);
            data['longitude'] = parseFloat(ele['lon']);
            pos.push(data);
        }

        this.setState({
            res: response.data,
            pos: pos
        });

        console.log(response.data[0]);
        
    });

    }



    render(){
        var res = this.state.res;
        const listItems = res.map((d) => <div key={d._id} style={{marginLeft: '200px', marginTop: '10px'}}>
            <a href={'/restaurant-page/' + d._id}>{d.name}</a>
            <span style={{display:'inline-block', width: '50px'}}></span>{d.phone}

        </div>);
;

        return(
            <div>
                <h4>{listItems}</h4>
                {/* <div style={{marginLeft: '110px', marginTop: '10px'}}>

                    <div class="column" style={{width: "30%"}}>
                        <img src={image} alt="Logo" style={{width:'150px'}}/> 
                        </div>    
  

                        
                    <form onSubmit={this.onFormSubmit}>
                        <h3>Update Profile Picture</h3>
                        <input type="file" name="myImage" onChange= {this.onChange} />
                        <button type="submit">Upload</button>
                    </form>

                    <h3>Restaurant Name : {name}</h3>
                    <h3>Email : {email}</h3>
                    <h3>Phone : {phone}</h3>
                    <h3>Address : {location}</h3>
                </div>   */}
             
            </div> 


        )
    }   
}


export default RestaurantHome;