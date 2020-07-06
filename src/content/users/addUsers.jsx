import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as userService from '../../services/userService';
import {ToastContainer, toast} from 'react-toastify';

class AddUsers extends Component {
    state = {
        errors: {},
        user: {
            "id": "",
            "name": "",
            "password": "",
            "confirmPassword": "",
            "dateOfBirth": "",
            "address": "",
            "phoneNumber": "",
            "email": "",
            "imagePath": "",
            "bloodType": "",
            "educationalQualification": ""
        }
    }

    render() { 
        const {user, errors} = this.state;

        const enabled = user["id"].length > 0 
                        && user["name"].length > 0
                        && user["dateOfBirth"].length > 0
                        && user["password"].length > 0
                        && user["confirmPassword"].length > 0
                        && user["address"].length > 0
                        && user["educationalQualification"].length > 0
                        && user["bloodType"].length > 0;

        return ( 
            <div>
                <ToastContainer />
                <div className="container">       
                    <div className="row back">
                        <div className="col-md-5 col-sm-4 col-3">
                            <button onClick={() => this.props.history.push('/users')}>
                                <i className="fa fa-arrow-left" aria-hidden="true"></i>
                            </button>
                        </div>
                        <h2 className="col">Add User</h2>
                    </div>

                    <form className="formAdd" autoComplete="off">  
                        <div className="content">           
                           <fieldset>
                                <legend>Personal Information:</legend>
                                <div className="row">
                                    <div className="form-group col-12">
                                        <label htmlFor="id">National ID : </label>
                                        <input type="text" onBlur={this.confirmInput} onKeyPress={this.preventShowLetter} maxLength="14" className={errors.id ? "form-control error": "form-control"} value={user["id"]} id="id" name="id" onChange={this.handleChange}></input>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                        <div className="errorMsg">{errors.id}</div>
                                    </div>
                                    <div className="form-group col-12">
                                        <label htmlFor="name">Full Name : </label>
                                        <input type="text" className="form-control" value={user["name"]} id="name" name="name" onChange={this.handleChange}></input>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                    </div>
                                    <div className="form-group col-12">
                                        <label htmlFor="password">Password : </label>
                                        <input type="password" className={errors.confirmPassword ? "form-control error": "form-control"} value={user["password"]} id="password" name="password" onChange={this.handleChange}></input>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                    </div>
                                    <div className="form-group col-12">
                                        <label htmlFor="confirmPassword">Confirm : </label>
                                        <input type="password" onBlur={this.confirmInput} className={errors.confirmPassword ? "form-control error": "form-control"} value={user["confirmPassword"]} id="confirmPassword" name="confirmPassword" onChange={this.handleChange}></input>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                        <div className="errorMsg">{errors.confirmPassword}</div>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend>Required Data:</legend>
                                <div className="row">  
                                    <div className="form-group col-12">
                                        <label htmlFor="address">Address : </label>
                                        <input type="text" className="form-control" value={user["address"]} id="address" name="address" onChange={this.handleChange}></input>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                    </div>
                                    <div className="form-group selectOption col-lg-4 col-md-12">
                                        <label htmlFor="dateOfBirth" className="birthdate">Birthdate: </label>
                                        <input type="date" className="form-control" value={user["dateOfBirth"]} id="dateOfBirth" name="dateOfBirth" onChange={this.handleChange}></input>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                    </div>
                                    <div className="form-group selectOption col-lg-4 col-md-6">
                                        <label htmlFor="educationalQualification">Qualification: </label>
                                        <select className="form-control" value={user["educationalQualification"]} id="educationalQualification" name="educationalQualification" onChange={this.handleChange}>
                                            <option disabled></option>
                                            <option>A</option>
                                            <option>A+</option>
                                            <option>A-</option>
                                            <option>B</option>
                                            <option>B+</option>
                                            <option>B-</option>
                                            <option>C</option>
                                            <option>C+</option>
                                            <option>C-</option>
                                            <option>D</option>
                                        </select>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                    </div>
                                    <div className="form-group selectOption col-lg-4 col-md-6">
                                        <label htmlFor="bloodType">Blood Type: </label>
                                        <select className="form-control" value={user["bloodType"]} id="bloodType" name="bloodType" onChange={this.handleChange}>
                                            <option disabled></option>
                                            <option>AB+</option>
                                            <option>AB-</option>
                                            <option>A+</option>
                                            <option>A-</option>
                                            <option>B+</option>
                                            <option>B-</option>
                                            <option>O+</option>
                                            <option>O-</option>
                                        </select>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend>Optional Data:</legend>
                                <div className="row">
                                    <div className="form-group optionalData col-lg-6 col-md-12">
                                        <label htmlFor="phoneNumber">Phone: </label>
                                        <input type="tel" onKeyPress={this.preventShowLetter} maxLength="11" className="form-control" value={user["phoneNumber"]} id="phoneNumber" name="phoneNumber" onChange={this.handleChange}></input>
                                    </div>
                                    <div className="form-group optionalData col-lg-6 col-md-12">
                                        <label htmlFor="email">Email: </label>
                                        <input type="email" onBlur={this.confirmInput} className={errors.email ? "form-control error": "form-control"} value={user["email"]} id="email" name="email" onChange={this.handleChange}></input>
                                        <div className="errorMsg">{errors.email}</div>
                                    </div>
                                    <div className="form-group picture">
                                        <label htmlFor="imagePath">Picture: </label>
                                        <input type="file" className="form-control-file" value={user["imagePath"]} id="imagePath" name="imagePath" onChange={this.handleChange}></input>
                                    </div>
                                </div>
                            </fieldset>

                            <button className="btn btn-primary" id="next" onClick={this.doSubmit} disabled={!enabled}><Link to={{pathname:"/users/new/car", state: {userId: user.id}}}>Next</Link></button>                         
                        </div>
                    </form>
                    
                </div>
            </div>
         );
    }

    handleChange = e => {
        const user = {...this.state.user} 
        user[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ user });
    }

    confirmInput = e => {
        const errors = {...this.state.errors};
        const errorMsg = this.showMsgError(e.currentTarget);
        if (errorMsg) errors[e.currentTarget.name] = errorMsg;
        else delete errors[e.currentTarget.name];

        const user = {...this.state.user};
        user[e.currentTarget.name] = e.currentTarget.value;
        this.setState( { user, errors} );
    }
    
    showMsgError = currentTarget => {  
        const user = {...this.state.user};

        if (currentTarget.name === "id") {
            if (user["id"].length < 14)
                return "❌ National ID must be 14 letters!.";         
        }

        if (currentTarget.name === "confirmPassword") {
            if (user["password"].length < 8)
                return "❌ The Password must be at least 8 letters!.";
            if (user["password"] !== user["confirmPassword"])
                return "❌ The Password isn't matched!.";
        }

        if (currentTarget.name === "email") {
            const email = user["email"];
            const expression = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
            const result =  expression.test(email.toLowerCase());
            if (!(result && user["email"]))
                return "❌ Not a valid email address!.";
        }
    }

    preventShowLetter = e => {
        var char = String.fromCharCode(e.which);
        if (!(/[0-9]/.test(char))) {
            e.preventDefault();
        }
    }

    doSubmit = async e => {
        e.preventDefault();
        const {errors, user} = this.state;

        try {
            if(Object.keys(errors).length === 0)  {  
                await userService.register(this.state.user);
                toast.success("Data is added successfully!.");
            } else
                toast.error("Please ensure you add data Correctly!.");
        } catch(ex) {
            if (ex.response && ex.response.status === 400)
                toast.error("Please fill the input fields!.");
        }
        this.setState({user});
    }
}
 
export default AddUsers;