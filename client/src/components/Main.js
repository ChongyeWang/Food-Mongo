import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import Nav from './Navbar';
import Home from './Home';
import RestaurantPage from './RestaurantPage';
import RestaurantLogin from './RestaurantLogin';
import RestaurantHome from './RestaurantHome';
import RegisterRestaurant from './RegisterRestaurant';
import Page from './Page';
import Dish from './Dish';
import RestaurantEdit from './RestaurantEdit';
import UserPage from './UserPage';
import UserEdit from './UserEdit';
import Event from './Event';
import Events from './Events';
import AddEvent from './AddEvent';
import UserProfile from './UserProfile';

import UserHome from './UserHome';
//Create a Main Component
class Main extends Component {

    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Nav}/>
                <Route path="/home" component={Home}/>
                <Route path="/users/register" component={Register}/>
                <Route path="/users/login" component={Login}/>
                <Route path="/users/profile" component={UserPage}/>
                <Route path="/users/all" component={UserHome}/>
                <Route path="/user-page/:id" component={UserProfile}/>
                <Route path="/users/edit" component={UserEdit}/>
                <Route path="/restaurant-page/:id" component={Page}/>
                <Route path="/restaurant/login" component={RestaurantLogin}/>
                <Route path="/restaurant/add-dish" component={Dish}/>
                <Route path="/restaurant/all" component={RestaurantHome}/>
                <Route path="/restaurant/register" component={RegisterRestaurant}/>
                <Route path="/restaurant/profile" component={RestaurantPage}/>
                <Route path="/restaurant/edit" component={RestaurantEdit}/>
                <Route path="/logout" component={Logout}/>   
                <Route path="/event" component={Events}/> 
                <Route path="/add_event" component={AddEvent}/>   
            </div>
        )
    }
}
//Export The Main Component
export default Main;