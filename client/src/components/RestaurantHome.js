import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
    width: '80%',
    height: '100%',
};
  
class RestaurantHome extends Component{
    constructor(){
        super();
        this.state = {
            res: [],
            pos: [],
            search: [],
            currentPage: 1,
            todosPerPage: 3,
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
        
        });

    }

    
    KeyChangeHandler = (e) => {
        const data = {
            keyword : e.target.value,
        }
      
        axios.post('/restaurant/search-all', data)
        .then(response => {
          console.log(response.data);
          this.setState({
            search: response.data
  
          });
        }) 
    }

    displayMarkers = () => {
        return this.state.pos.map((store, index) => {
          return <Marker key={index} id={index} position={{
           lat: store.latitude,
           lng: store.longitude
         }}
         onClick={() => console.log("You clicked me!")} />
        })
      }


    render(){
        var res = this.state.res;
        const listItems = res.map((d) => <div key={d._id} style={{marginLeft: '200px', marginTop: '10px'}}>
            <a href={'/restaurant-page/' + d._id}>{d.name}</a>
            <span style={{display:'inline-block', width: '50px'}}></span>{d.phone}

        </div>);

        var search = this.state.search;
        const searchItems = search.map((d) => <div key={d._id} style={{marginLeft: '200px', marginTop: '10px'}}>
            <a href={'/restaurant-page/' + d._id}>{d.name}</a>
            <span style={{display:'inline-block', width: '50px'}}></span>{d.phone}

        </div>);


        var currentPage = this.state.currentPage;
        var todosPerPage = this.state.todosPerPage;

        var res = this.state.res;

        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = res.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((d, index) => {
        return <li style={{fontSize: '25px', fontWeight: 'bold', marginLeft:'200px'}} key={index}>
        <a href={'/restaurant-page/' + d._id}>{d.username}</a>
        <span style={{display:'inline-block', width: '50px'}}></span> {d.email} 

        </li>;
        });

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(res.length / todosPerPage); i++) {
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
;

        return(
            <div>
                <div class="" style={{marginTop:'30px', width:'500px', marginLeft: '200px'}}>
                    <h3 style={{fontWeight: 'bold'}}>Search Restaurant</h3>
                    <div class="panel">
                    </div>
                    <div class="form-group">
                        <input onChange = {this.KeyChangeHandler} type="text" class="form-control" name="key" placeholder="Search with restaurant name, location, dish name"/>
                    </div> 
                </div>
                <h4>{searchItems}</h4>

                <h3 style={{fontWeight: 'bold', marginLeft: '200px'}}>All Restaurants</h3>
                {/* <h4>{listItems}</h4> */}

                    <ul>
                    {renderTodos}
                    </ul>
                    <ul id="page-numbers" style={{display : 'inline-block', color: 'blue'}} >
                    <div style={{ marginLeft:'200px'}}>
                    {renderPageNumbers}
                    </div>
                    </ul>

                <div style={{marginLeft: '200px'}}>
                    <button onClick = {this.pending} class="btn btn-primary">Filter by Pickup</button> 
                    <button onClick = {this.deliver} class="btn btn-primary">Filter by Deliver</button> 
                    <h4 style={{marginTop:'30px'}}>View Restaurants on Map</h4>
                    <Map
                        google={this.props.google}
                        zoom={8}
                        style={mapStyles}
                        initialCenter={{ lat: 37.333, lng: -121.886}}
                        >
                        {this.displayMarkers()}
                    </Map>
                </div>
                        
            </div> 


        )
    }   
}


export default  GoogleApiWrapper({
    apiKey: 'AIzaSyCgPAURPD6hyNrsQf1qqa2VoRicjwqJjBk'
  })(RestaurantHome);
// export default RestaurantHome;