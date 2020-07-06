import React, { Component } from 'react';
import NavBar from './navbar';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import '../css/login.css';
import '../css/navbar.css';
import '../css/tables.css';

import '../css/formDetails.css';
import '../css/formAdd.css';

import '../css/features.css';
import '../css/showHide.css';
import '../css/notFound.css';

import Cars from './cars';
import Infractions from './infractions';
import Users from './users';
import StolenCars from './stolenCars';
import Traffic from './traffic';
import Booking from './booking';
import NotFound from './notFound';

import CarsDetails from '../content/cars/carsDetails';

import AddUsers from './../content/users/addUsers';
import UsersDetails from '../content/users/usersDetails';

import InfractionsDetails from '../content/infractions/infractionsDetails';

import NavgbarIcon from './navbarIcon';
import * as authService from '../services/authService';
import AddCars from './../content/cars/addCars';
import AddStolenCars from '../content/stolenCars/addStolenCars';
import StolenDetails from '../content/stolenCars/stolenDetails';
import LogIn from './login';
import FindStolenCar from './../content/stolenCars/findStolenCar';
import InfractionsTypes from '../content/infractions/infractionsTypes';


class Layout extends Component {
    state = { 
        userDecode: {},
        userType: "",
    };

    componentDidMount() {
        const userDecode = authService.decodeAT();
        const userType = localStorage.getItem("userType");

        this.setState({ userDecode, userType }); 
    }

    logout = () => {
        window.location = "/";
        authService.logout();
    }
    render() { 
        const {userDecode, userType} = this.state;

        return ( 
            <React.Fragment>
                <div className="highNav">
                    <nav className="navbar navbar-expand-lg navbar-expand fixed-top">
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link">Smart Traffic Management System<span className="sr-only">(current)</span></Link>
                                </li>
                            </ul>
                            <span>{userDecode.name}</span>
                            <i className="fa fa-sign-out" aria-hidden="true" onClick={this.logout}></i>
                        </div>
                    </nav>
                </div>

                <div className="container-fluid">
                    <ToastContainer />
                    <div className="row">
                        <NavBar 
                            userType = {userType}
                        />
                        
                        {/* Small Screen */}
                        <div className="d-lg-none col-1">
                            <NavgbarIcon />
                        </div>

                        <div className="col">             
                            <Switch>
                                <Route 
                                    path="/profile"
                                    render={props => {
                                        if (userType === "traffic" || userType === "user") 
                                            return <UsersDetails {...props} userType={userType} />;
                                        return <LogIn />
                                    }}  
                                />

                                <Route path="/notFound" component={NotFound}/>

                                <Route 
                                    path="/cars/id/:id" 
                                    render= {props => {
                                        if (userType === "user")
                                            return <Redirect to="/cars" />
                                        return <CarsDetails {...props} />
                                    }}
                                />
                                
                                <Route 
                                    path="/cars/:plateNumber" 
                                    render= {props => {
                                        if (userType === "user" || userType === "traffic") 
                                            return <CarsDetails {...props} userType={userType}/>
                                        return <LogIn />
                                    }}
                                />  
                                
                                <Route 
                                    path="/cars" 
                                    render={props => {
                                        if (userType === "user" || userType === "traffic")
                                            return <Cars {...props} userType = {userType} />
                                        return <LogIn />
                                    }}
                                />

                                <Route 
                                    path="/stolenCars/new" 
                                    render={props => {
                                        if (userType === "user" || userType === "traffic")
                                            return <AddStolenCars {...props} userType={userType} />
                                        return <LogIn />
                                    }}
                                />                                
                                
                                <Route path="/stolenCars/findStolenCar" component={FindStolenCar}/>
                                <Route path="/stolenCars/carId/:carId" component= {StolenDetails}/>
                                <Route 
                                    path="/stolenCars" 
                                    render={props => {
                                        if (userType === "user" || userType === "traffic")
                                            return <StolenCars {...props} userType = {userType} />
                                        return <LogIn />
                                    }}
                                />
                                
                                <Route 
                                    path="/users/new/car" 
                                    render={props => {
                                        if (userType === "user")
                                            return <Redirect to="/profile"/>
                                        return <AddCars {...props}/>
                                    }}
                                />

                                <Route 
                                    path="/users/new" 
                                    render={props => {
                                        if (userType === "user") 
                                            return <Redirect to="/profile"/>;
                                        return <AddUsers {...props}/>
                                    }}
                                />

                                <Route 
                                    path="/users/:id" 
                                    render={props => {
                                        if (userType === "user") 
                                            return <Redirect to="/profile"/>;
                                        return <UsersDetails {...props} userType={userType} />
                                    }}
                                />

                                <Route 
                                    path="/users" 
                                    render={props => {
                                        if (userType === "user") 
                                            return <Redirect to="/profile" />;
                                        return <Users {...props} userType={userType}/>
                                    }}      
                                />

                                <Route 
                                    path="/traffic" 
                                    render={props => {
                                        if (userType === "user")
                                            return <Redirect to="/profile"/>
                                        return <Traffic {...props}/>
                                    }}
                                />

                                <Route path="/infractions/types" component={InfractionsTypes}/>
                                <Route path="/infractions/:id" component={InfractionsDetails}/>
                                <Route 
                                    path="/infractions" 
                                    render={props => {
                                        if (userType === "user" || userType === "traffic")
                                            return <Infractions {...props} userType = {userType} />
                                        return <LogIn />
                                    }}
                                />
                                
                                <Route 
                                    path="/booking" 
                                    render={props => {
                                        if (userType === "user" || userType === "traffic")
                                            return <Booking {...props} userType = {userType} />
                                        return <LogIn />
                                    }}
                                />
                            
                                <Redirect from="/" to="/profile"/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Layout;