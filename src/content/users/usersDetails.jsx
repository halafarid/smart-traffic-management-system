import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import authorizationToken from './../../services/authToken';
import * as userService from '../../services/userService';
import * as carService from './../../services/carService';

import { ToastContainer,toast } from 'react-toastify';

class UsersDetails extends Component {
    state = { 
        userData: [],
        userCars: [],
        userEdit: {
            "oldPassword": "",
            "newPassword": "",
            "confirmPassword": "",
            "email": "",
            "address": "",
            "phoneNumber": ""
        },
        errors: {},

        hidePass: true,
        hideEmail: true,
        hideAddress: true,
        hidePhone: true,
        hideImage: true,
    }

    async componentDidMount() {
        const {userType} = this.props;

        const accessToken = localStorage.getItem('accessToken');	
        authorizationToken(accessToken);

        if (this.props.match.path === "/profile") {
            const {data : userData} = await userService.getUserProfile(userType);
            this.setState({userData});
        }

        if (this.props.match.path === "/users/:id") {
            const userId = this.props.match.params.id;
            const {data : userData} = await userService.getSpecificUser(userId);

            const {data: userCars} = await carService.getUserCars(userId);
            this.setState({ userData, userCars });
        }
    }

    render() { 
        const {userEdit, errors, userData, userCars} = this.state;

        const enabledEmail = userEdit["email"].length > 0;
        const enabledPhone = userEdit["phoneNumber"].length > 0;
        const enabledAddress = userEdit["address"].length > 0;
        const enabledPassword = userEdit["oldPassword"].length > 0 
                                && userEdit["newPassword"].length > 0
                                && userEdit["confirmPassword"].length > 0;
 
        return ( 
            <div className="container">
                <ToastContainer />
                {
                    this.props.match.path === "/users/:id" && 
                    <div className="row back">
                        <div className="col-md-5 col-sm-4 col-3">
                            <button onClick={() => this.props.history.push('/users')}>
                                <i className="fa fa-arrow-left" aria-hidden="true"></i>
                            </button>
                        </div>
                        <h2 className="col">User Details</h2>
                    </div>
                }

                <form className="formDetails userData">                  
                    <div className="row">
                        <h3 className="col-12">Username</h3>
                        <div className="form-group col-5">
                            <label className="col-lg-4 col-md-5">National ID : </label>
                            <span className="col-lg-5 col-md-4 col-8">{userData.id}</span>
                        </div>
                        <div className="form-group col-6">
                            <label className="col-lg-4 col-md-5">Full Name : </label>
                            <span className="plaintext col-6">{userData.name}</span>
                            <i className="fa fa-picture-o col-2" onClick={this.showImage} aria-hidden="true"></i>
                        </div>
                    </div>

                    <div className="row">
                        <h3 className="col-12">User Data</h3>
                        {
                            this.props.match.path === "/users/:id" && 
                            <div className="form-group col-12">
                                <label className="col-lg-2 col-md-5">Cars Plate : </label>
                                {userCars.map( car =>
                                    <Link to={`/cars/${car.plateNumber}`} key={car.id}>
                                        <span className="col-6">{car.plateNumber}</span>
                                    </Link>
                                )}
                            </div>
                        }
                        <div className="form-group col-lg-5 col-md-12">
                            <label className="col-lg-6 col-md-5">Qualification: </label>
                            <span className="col">{userData.educationalQualification}</span>
                        </div>
                        <div className="form-group col-lg-3 col-md-12">
                            <label className="col-md-4">Age: </label>
                            <span className="col col-md-6">{userData.age}</span>
                        </div>
                        <div className="form-group col-lg-4 col-md-12">
                            <label className="col-lg-6 col-md-5">Blood Type: </label>
                            <span className="col">{userData.bloodType}</span>
                        </div>
                    </div>

                    <div className="row">
                        <h3 className="col-12">Editable Data</h3>
                        <div className="form-group col-12">
                            <label className="col-md-4 col-12">Email : </label>
                            <span className="plaintext col-md-5 col-8">{userData.email}</span>
                            <i onClick={this.showEmail} className="fa fa-pencil-square edit col-2" aria-hidden="true"></i>

                            <div className="showHidePage" hidden={this.state.hideEmail ? true : false}>
                                <span className="helper"></span>
                                <div>
                                    <span className="closeBtn" onClick={this.hideEmail} role="img" aria-label='email'>❌</span>
                                    <div className="form-group myForm">
                                        <label forhtml="email">New Email : </label>
                                        <input type="email" autoComplete="off" onBlur={this.confirmInput} className={errors.email ? "form-control error": "form-control"} value={userEdit["email"]} id="email" name="email" onChange={this.changeInput}></input>
                                        <p className="errorMsg">{errors.email}</p>
                                        <button className="btn btn-primary" onClick={this.validateInput} disabled={!enabledEmail}>Save Changes</button>                        
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-group col-12">
                            <label className="col-md-4 col-12">Phone : </label>
                            <span className="plaintext col-md-5 col-8">{userData.phoneNumber}</span>
                            <i onClick={this.showPhone} className="fa fa-pencil-square edit col-2" aria-hidden="true"></i>

                            <div className="showHidePage" hidden={this.state.hidePhone ? true : false}>
                                <span className="helper"></span>
                                <div>
                                    <span className="closeBtn" onClick={this.hidePhone} role="img" aria-label='phone'>❌</span>
                                    <div className="form-group myForm">
                                        <label forhtml="phoneNumber">New Phone : </label>
                                        <input type="tel" autoComplete="off" maxLength="11" onBlur={this.confirmInput} onKeyPress={this.preventShowLetter} className={errors.phoneNumber ? "form-control error": "form-control"} value={userEdit["phoneNumber"]} id="phoneNumber" name="phoneNumber" onChange={this.changeInput}></input>
                                        <p className="errorMsg">{errors.phoneNumber}</p>
                                        <button className="btn btn-primary" onClick={this.validateInput} disabled={!enabledPhone}>Save Changes</button>                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="form-group col-12">
                            <label className="col-md-4 col-12">Address : </label>
                            <span className="plaintext col-md-5 col-8">{userData.address}</span>
                            <i onClick={this.showAddress} className="fa fa-pencil-square edit col-2" aria-hidden="true"></i>

                            <div className="showHidePage" hidden={this.state.hideAddress ? true : false}>
                                <span className="helper"></span>
                                <div>
                                    <span className="closeBtn" onClick={this.hideAddress} role="img" aria-label='address'>❌</span>
                                    <div className="form-group myForm">
                                        <label forhtml="adress">New Address : </label>
                                        <input type="text" autoComplete="off" onBlur={this.confirmInput} className={errors.address ? "form-control error" : "form-control"} value={userEdit["address"]} id="address" name="address" onChange={this.changeInput}></input>
                                        <p className="errorMsg">{errors.address}</p>
                                        <button className="btn btn-primary" onClick={this.validateInput} disabled={!enabledAddress}>Save Changes</button>                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {this.props.match.path === "/profile" && 
                            <div className="form-group changePass col-12">
                                <label onClick={this.showPass}>Change Password</label>

                                <div className="showHidePage" hidden={this.state.hidePass ? true : false}>
                                    <span className="helper"></span>
                                    <div>
                                        <span className="closeBtn" onClick={this.hidePass} role="img" aria-label='changePass'>❌</span>
                                        <div className="form-group myForm">
                                            <label forhtml="oldPassword">Old Password : </label>
                                            <input type="password" className={errors.oldPassword ? "form-control error": "form-control"} id="oldPassword" name="oldPassword" value={userEdit["oldPassword"]} onChange={this.changeInput}></input>
                                            <p className="errorMsg">{errors.oldPassword}</p>
                                        </div>
                                        <div className="form-group myForm">
                                            <label forhtml="newPassword">New Password : </label>
                                            <input type="password" className={errors.confirmPassword ? "form-control error": "form-control"} id="newPassword" name="newPassword" value={userEdit["newPassword"]} onChange={this.changeInput}></input>
                                        </div>
                                        <div className="form-group myForm">
                                            <label forhtml="confirmPassword">Confirm Password : </label>
                                            <input type="password" onBlur={this.confirmInput} className={errors.confirmPassword ? "form-control error": "form-control"} id="confirmPassword" name="confirmPassword" value={userEdit["confirmPassword"]} onChange={this.changeInput}></input>
                                            <p className="errorMsg">{errors.confirmPassword}</p>
                                            <button className="btn btn-primary" onClick={this.validatePassword} disabled={!enabledPassword}>Save Changes</button>                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="showImg">
                        <div className="showHidePage showHideImg" hidden={this.state.hideImage ? true : false} onClick={this.hideImage}>
                            <span className="helper"></span>
                            <div>
                                <div className="form-group myForm">
                                    <img src={require('../../images/users/user1.png')} alt="pic"></img>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
         );
    }

    showPass = () => {this.setState({hidePass: false})}
    hidePass = () => {this.setState({hidePass: true})}

    showEmail = () => {this.setState({hideEmail: false})}
    hideEmail = () => {this.setState({hideEmail: true})}

    showPhone = () => {this.setState({hidePhone: false})}
    hidePhone = () => {this.setState({hidePhone: true})}

    showAddress = () => {this.setState({hideAddress: false})}
    hideAddress = () => {this.setState({hideAddress: true})}

    showImage = () => {this.setState({hideImage: false})}
    hideImage = () => {this.setState({hideImage: true})}

    changeInput = e => {
        const userEdit = {...this.state.userEdit} 
        userEdit[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ userEdit });
    }

    confirmInput = e => {
        e.preventDefault();
        const errors = {...this.state.errors};
        const errorMsg = this.showMsgError(e.currentTarget);
        if (errorMsg) errors[e.currentTarget.name] = errorMsg;
        else delete errors[e.currentTarget.name];
        
        this.setState({ errors });
    }

    showMsgError = currentTarget => {  
        const {userEdit} = this.state;

        if (currentTarget.name === "confirmPassword") {
            if (userEdit["newPassword"].length < 8)
                return "❌ It must be at least 8 letters!.";
            if (userEdit["newPassword"] !== userEdit["confirmPassword"])
                return "❌ Not a matched Password!.";
        }

        if (currentTarget.name === "email") {
            const email = userEdit["email"];
            const expression = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
            const result =  expression.test(email.toLowerCase());
 
            if (userEdit["email"] === "")
                return "❌ Please enter your new email!."
            if (!(result && userEdit["email"]))
                return "❌ Not a valid email address!.";
        }

        if (currentTarget.name === "phoneNumber") {
            if (userEdit["phoneNumber"] === "")
                return "❌ Please enter your new phone Number!."
            if (userEdit["phoneNumber"].length < 6)
                return "❌ Please enter correct phone Number!."
        }

        if (currentTarget.name === "address") {
            if (userEdit["address"] === "")
                return "❌ Please enter your new address!."
        }
    }

    preventShowLetter = e => {
        var char = String.fromCharCode(e.which);
        if (!(/[0-9]/.test(char))) {
            e.preventDefault();
        }
    }

    validatePassword = async e => {
        e.preventDefault();
        const {userEdit, errors} = this.state;
        const {userType} = this.props;

        try {
            if(Object.keys(errors).length === 0) {
                await userService.changePassword(userType, userEdit["oldPassword"], userEdit["newPassword"], userEdit["confirmPassword"]);
                toast.success("Data is changed successfully!.");
            } else
                return errors;     
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
               errors.oldPassword = "❌ Your old password is incorrect!.";
               this.setState({errors});
            }
        }
    }

    validateInput = async e => {
        e.preventDefault();
        const {userEdit, errors} = this.state;
        const {userType} = this.props;

        try {
            if(Object.keys(errors).length === 0) {
                await userService.changeData(userType, userEdit["email"], userEdit["phoneNumber"], userEdit["address"]);
                toast.success("Data is changed successfully!.");
            } else
                return errors;     
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
               toast.error("❌ Something is error!.");
            }
        }
    }
}
 
export default UsersDetails;