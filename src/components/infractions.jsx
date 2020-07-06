import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as authService from './../services/authService';
import * as infractionsService from '../services/infractionsService';
import InfractionsTable from '../content/infractions/infractionsTable';
import NotResult from './notResult';

import Pagination from '../features/pagination';
import { paginate } from '../features/paginate';

import { ToastContainer, toast } from 'react-toastify';

class Users extends Component {
    state = { 
        infractions: [],
        errors: [],
        input: "",

        hidePay: true,

        currentPage: 1,
        pageSize: 10
    }

    async componentDidMount() {
        const {userType} = this.props;

        if (userType === "user") {
            const userDecode = authService.decodeAT();

            const {data: infractions} = await infractionsService.getUserInfractions(userDecode.id);
            this.setState({ infractions });

        } else {
            const {data: infractions} = await infractionsService.getALLInfractions();
            this.setState({ infractions });
        }
    }

    render() { 
        const infractions = paginate(this.state.infractions, this.state.currentPage, this.state.pageSize);
        const {errors} = this.state;
        const {userType} = this.props;
        
        return ( 
            <div className="container">
                <ToastContainer />
                <div className="infractions">

                    {userType === "traffic" && <div className="top">
                        <button className="btn btn-danger infractionsBtn" onClick={this.showPay}>Pay Infraction</button>
                        <Link to="infractions/types">
                            <button className="btn btn-info infractionsBtn">Infractions Types</button>
                        </Link>
                    </div>}

                    {/* {infractions.length > 0 ?  */}
                        <InfractionsTable 
                            infractions= {infractions}
                            userType = {userType}
                        />
                        {/* :
                        <NotResult />
                    } */}
                    
                    <Pagination 
                        itemsCount = {this.state.infractions.length}
                        pageSize = {this.state.pageSize}
                        currentPage = {this.state.currentPage}
                        onPageChange = {this.handlePageChange}
                    />

                    <div className="showHidePage" hidden={this.state.hidePay ? true : false}>
                        <span className="helper"></span>
                        <div>
                            <span className="closeBtn" onClick={this.hidePay} role="img" aria-label='infractionPaid'>❌</span>
                            <div className="form-group myForm">
                                <label forhtml="infractionPaid">Infraction ID : </label>
                                <input type="text" autoComplete="off" onKeyPress={this.preventShowLetter} className={errors.infracionPaid? "form-control error" : "form-control"} id="infractionPaid" name="infractionPaid" onChange={this.changeInput}></input>
                                <p className="errorMsg">{errors.infracionPaid}</p>
                                <button className="btn btn-primary" onClick={this.validateInput}>Pay Infraction</button>                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }

    handlePageChange = page => {
        this.setState({ currentPage: page });
    }

    changeInput = e => {
        const input = e.currentTarget.value;
        this.setState( { input });
    }

    hidePay = () => { this.setState({ hidePay: true })}
    showPay = () => { this.setState({ hidePay: false })}

    preventShowLetter = e => {
        var char = String.fromCharCode(e.which);
        if (!(/[0-9]/.test(char))) {
            e.preventDefault();
        }
    }

    validateInput = async e => {
        e.preventDefault();
        const {input, errors} = this.state;

        if (input === "") {
            errors.infracionPaid = "❌ Please enter infraction ID!.";
            this.setState({ errors });
        } 

        try {
            await infractionsService.payInfraction(input);
            this.props.history.push("/infractions/types");
            this.props.history.push("/infractions");               
            toast.success("The Infraction is paid successfully!.");
        }
        catch (ex) {
            if (ex.response && ex.response.status === 400)
                errors.infracionPaid = "❌ This Infraction isn't found!.";

            this.setState({ errors });
        }
    }
}
 
export default Users;