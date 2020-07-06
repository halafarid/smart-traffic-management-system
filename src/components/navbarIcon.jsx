import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class NavgbarIcon extends Component {
    state = {  }
    render() { 
        const {userType} = this.props;
        let style = {display: "none"};

        return ( 
            <div className="navigationIcon position-fixed">
                <nav className={userType === "user"? "nav flex-column nav-pills user" : "nav flex-column nav-pills"} role="tablist" aria-orientation="vertical">
                    <NavLink to="/profile" className="nav-link"  data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="true"><i className="fa fa-address-book" aria-hidden="true"></i></NavLink>
                    <div className="dropdown-divider"></div>
                    <NavLink to="/users"  className="nav-link"  data-toggle="pill" role="tab" aria-controls="v-pills-messages" aria-selected="false" style={userType === "user" ? style: null}><i className="fa fa-users" aria-hidden="true"></i></NavLink>
                    <div className="dropdown-divider"></div>
                    <NavLink to="/cars"  className="nav-link"  data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="true"><i className="fa fa-car" aria-hidden="true"></i></NavLink>
                    <div className="dropdown-divider"></div>
                    <NavLink to="/infractions"  className="nav-link"  data-toggle="pill" role="tab" aria-controls="v-pills-profile" aria-selected="false"><i className="fa fa-exclamation-triangle" aria-hidden="true"></i></NavLink>
                    <div className="dropdown-divider"></div>
                    <NavLink to="/stolenCars"  className="nav-link"  data-toggle="pill" role="tab" aria-controls="v-pills-settings" aria-selected="false"><i className="fa fa-car" aria-hidden="true"></i></NavLink>
                    <div className="dropdown-divider"></div>
                    <NavLink to="/traffic" hidden={userType === "user"? true : false}  className="nav-link"  data-toggle="pill" role="tab" aria-controls="v-pills-settings" aria-selected="false"><i className="fa fa-subway" aria-hidden="true"></i></NavLink>
                    <div className="dropdown-divider" hidden={userType === "user"? true : false}></div>  
                    <NavLink to="/booking"  className="nav-link"  data-toggle="pill" role="tab" aria-controls="v-pills-settings" aria-selected="false"><i className="fa fa-bookmark" aria-hidden="true"></i></NavLink>
                    <div className="dropdown-divider"></div>
                </nav>
            </div> 
         );
    }
}
 
export default NavgbarIcon;