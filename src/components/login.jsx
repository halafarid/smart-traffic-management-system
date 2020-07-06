import React, { Component } from 'react';

import * as authService from './../services/authService';
import * as carService from './../services/carService';
import InputLogIn from '../common/inputLogIn';

import {ToastContainer, toast} from 'react-toastify';
import authorizationToken from './../services/authToken';

class LogIn extends Component {
    state = { 
        account: {nationalID: "",password: "", checked: "traffic"},
        errors: {},
        carsPlates: []
    }

    render() { 
        const { account, errors } = this.state;

        return ( 
            <div className="log">
                <div className="container">
                    <ToastContainer />
                    <div className="logIn">
                        <div className="row">
                            <div className="d-md-block d-none left">
                                <div className="image">
                                    <div className="text">
                                        {/* <i className="fa fa-truck" aria-hidden="true"></i> */}
                                        <h3>Smart Traffic <br/> Management System</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md right">
                                <div className="formLogIn">
                                    <hr></hr>
                                    <form autoComplete="off">
                                        <i className="fa fa-user-o" aria-hidden="true"></i>
                                        <InputLogIn
                                            type="text" 
                                            name="nationalID"
                                            id = "nationalID"
                                            placeholder="National ID"
                                            fontawesome= "fa fa-id-card"
                                            maxLength="14"
                                            className={errors.nationalID ? "form-control error" : "form-control"}
                                            value={account.nationalID}
                                            onChange={this.handleChange}
                                            onKeyPress={this.preventShowLetter} 
                                            error = {errors.nationalID}
                                        />
                                        <InputLogIn 
                                            type="password" 
                                            name="password"
                                            id= "password"
                                            placeholder="Password"
                                            fontawesome= "fa fa-lock"
                                            className={errors.password ? "form-control error" : "form-control"}
                                            value={account.password}
                                            onChange={this.handleChange}
                                            error = {errors.password}
                                        />

                                        <div className="form-group radio">
                                            <div>
                                                <input 
                                                    type="radio" 
                                                    name="checked" 
                                                    className="form-check-input"
                                                    defaultChecked
                                                    value="traffic"
                                                    id="traffic" 
                                                    onChange={this.handleChange}>
                                                </input>
                                                <label className="form-check-label" htmlFor="traffic">traffic</label>      
                                            </div>
                                            <div>
                                                <input 
                                                    type="radio" 
                                                    name="checked" 
                                                    className="form-check-input"
                                                    value="user" 
                                                    id="user" 
                                                    onChange={this.handleChange}>
                                                </input>
                                                <label className="form-check-label" htmlFor="user">user</label>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary" onClick={this.validateInputs}>Log In</button>
                                    </form>
                                </div>
                            </div>
                        </div>      
                    </div>            
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }

    // check for inputs in login is empty
    validateInputs = async e => {
        e.preventDefault();

        const {account} = this.state;
        const errors = {};

        if (account.nationalID.trim() === "")
            errors.nationalID = "National ID is required.";
        if (account.password === "")
            errors.password = "Password is required.";

        this.setState( { errors } );

        if(Object.keys(errors).length === 0)    
            this.doSubmit();
        else
            return errors;
    }

    doSubmit = async () => {
        const { account, carsPlates } = this.state; 

        try {
            const {data : {accessToken}} = await authService.login(account.checked, account.nationalID, account.password);

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("userType", account.checked); 

            if (account.checked === "user") {
                const accessToken = localStorage.getItem('accessToken');	
                authorizationToken(accessToken);

                const {data: userCars} = await carService.getUserCars(account.nationalID);
                for (let i = 0; i < userCars.length; i++){
                    carsPlates.push(userCars[i].plateNumber);
                }
                localStorage.setItem("carsPlates", carsPlates);
            }

            this.props.history.replace('/profile');

        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error("National ID or Password is incorrect!");
            }
        }
    }

    preventShowLetter = e => {
        var char = String.fromCharCode(e.which);
        if (!(/[0-9]/.test(char))) {
            e.preventDefault();
        }
    }
    
    handleChange = e => {
        const errors = {...this.state.errors};
        const errorMsg = this.validateOnChange(e.currentTarget);
        if (errorMsg) errors[e.currentTarget.name] = errorMsg;
        else delete errors[e.currentTarget.name];

        const account = {...this.state.account};
        account[e.currentTarget.name] = e.currentTarget.value;
        this.setState( { account, errors} );
    }

    validateOnChange = currentTarget => {
        if (currentTarget.name === 'nationalID')
            if (currentTarget.value.trim() === "") 
                return "National ID is required.";
        
        if (currentTarget.name === "password")
            if (currentTarget.value === "") 
                return "Password is required.";
    }

    handleChange(event) {
        this.setState({ checked: event.target.value });
    }
      
}
 
export default LogIn;