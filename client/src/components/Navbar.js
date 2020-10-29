import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';

//create the Navbar Component
class Nav extends Component {
    
    render(){
        
        return(
            <div>

                <nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
                  <a class="navbar-brand" href="">Foooood!</a>
                  
                  <a class="nav-item nav-link active" href="#"><Link to="/home" style={{color:'white'}}>Home</Link> <span class="sr-only">(current)</span></a> 
                  <a class="nav-item nav-link"><Link to="/users/register" style={{color:'white'}}>Register</Link></a>
                  <a class="nav-item nav-link"><Link to="/users/login" style={{color:'white'}}>Login</Link></a>
                  <a class="nav-item nav-link"><Link to="/restaurant/login" style={{color:'white'}}>Restaurant Login</Link></a>
                  <a class="nav-item nav-link"><Link to="/logout" style={{color:'white'}}>Logout</Link></a>

                </nav>
            
        </div>
        )
    }
}

export default Nav;