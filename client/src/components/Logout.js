import React, { Component } from 'react';
import { Redirect } from 'react-router';

//Define a Logout Component
class Logout extends Component {

    componentWillMount() {
        localStorage.clear();
    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        redirectVar = <Redirect to="/home" />
        
        return (
            <div>
                {redirectVar}
                
            </div>
        )
    }
}
//export Login Component
export default Logout;