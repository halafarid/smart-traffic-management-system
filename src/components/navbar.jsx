import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NavgbarIcon from './navbarIcon';

class NavBar extends Component {
    state = { }

    constructor() {
        super()
        this.state = {
            showNav: true
        }
    }

    render() { 
        const {userType} = this.props;
        let style = {display: "none"}
        return (
            <React.Fragment>
                <button className="hideShow" onClick={() => this.handleToggle()}><i className="fa fa-bars"></i></button>
                {
                    this.state.showNav? 
                    <div className="d-none d-lg-block col-2">
                        <div className="navigationBar position-fixed">
                            <nav className={userType === "user"? "nav flex-column nav-pills user" : "nav flex-column nav-pills"} role="tablist" aria-orientation="vertical">
                                <NavLink to="/profile" className="nav-link"  data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="true"><i className="fa fa-address-book" aria-hidden="true"></i>Profile</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink to="/users"  className="nav-link"  data-toggle="pill" role="tab" aria-controls="v-pills-messages" aria-selected="false" style={userType === "user" ? style: null}><i className="fa fa-users" aria-hidden="true"></i>Users</NavLink>
                                <div className="dropdown-divider" ></div>
                                <NavLink to="/cars" className="nav-link"  data-toggle="pill" role="tab" aria-controls="v-pills-home" aria-selected="true"><i className="fa fa-car" aria-hidden="true"></i>Cars</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink to="/infractions"  className="nav-link"  data-toggle="pill" role="tab" aria-controls="v-pills-profile" aria-selected="false"><i className="fa fa-exclamation-triangle" aria-hidden="true"></i>Infractions</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink to="/stolenCars"  className="nav-link"  data-toggle="pill" role="tab" aria-controls="v-pills-settings" aria-selected="false"><i className="fa fa-car" aria-hidden="true"></i>Stolen Cars</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink to="/traffic"  className="nav-link" hidden={userType === "user"? true : false} data-toggle="pill" role="tab" aria-controls="v-pills-settings" aria-selected="false"><i className="fa fa-subway" aria-hidden="true"></i>Traffic</NavLink>
                                <div className="dropdown-divider" hidden={userType === "user"? true : false}></div>
                                <NavLink to="/booking"  className="nav-link"  data-toggle="pill" role="tab" aria-controls="v-pills-settings" aria-selected="false"><i className="fa fa-bookmark" aria-hidden="true"></i>Booking</NavLink>
                                <div className="dropdown-divider"></div>            
                            </nav>
                        </div>
                    </div>
                    : 
                    <div className="d-none d-lg-block col-1">
                        <NavgbarIcon 
                            userType = {userType}
                        />  
                    </div>          
                }
            </React.Fragment>
        );
    }
    handleToggle = () => {
        this.setState({ showNav: !this.state.showNav})
    }
}
 
export default NavBar;