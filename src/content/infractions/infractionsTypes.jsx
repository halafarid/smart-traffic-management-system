import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as infractionsService from './../../services/infractionsService';
import TypesTable from './typesTable';

import Pagination from '../../features/pagination';
import { paginate } from '../../features/paginate';

import { ToastContainer, toast } from 'react-toastify';

class InfractionsTypes extends Component {
    state = { 
        types: [],
        errors: [],
        input: "",
        infractionType: {
            "name": "",
            "punishment": "",
            "fine": "" 
        },

        hidePay: true,

        currentPage: 1,
        pageSize: 9
    }

    async componentDidMount() {
        const {data : types } = await infractionsService.getInfractionsTypes();
        this.setState( { types });
    }
    
    render() { 
        const types = paginate(this.state.types, this.state.currentPage, this.state.pageSize);
        const {errors} = this.state;

        return ( 
            <div className="container">
                <ToastContainer />
                <div className="types">

                    <div className="top">
                        <form>
                            <div className="form-row">
                                <div className="col-4">
                                    <input type="text" autoComplete="off" className="form-control" placeholder="Infraction Type" name="name" onChange={this.changeInput}></input>
                                </div>
                                <div className="col-4">
                                    <input type="text" autoComplete="off" className="form-control" placeholder="Punishment" name="punishment" onChange={this.changeInput}></input>
                                </div>
                                <div className="col">
                                    <input type="text" autoComplete="off" className="form-control" placeholder="Fine" name="fine" onChange={this.changeInput}></input>
                                </div>
                                <button className="btn btn-success col-2" onClick={this.addType}>Add Type</button>
                            </div>
                        </form>
                        <div className="errorMsg">{errors.typeName}</div>
                    </div>

                    <TypesTable 
                        types= {types}
                    /> 
                    
                    <Pagination 
                        itemsCount = {this.state.types.length}
                        pageSize = {this.state.pageSize}
                        currentPage = {this.state.currentPage}
                        onPageChange = {this.handlePageChange}
                    />
                </div>
            </div>
        );
    }

    handlePageChange = page => {
        this.setState({ currentPage: page });
    }

    changeInput = e => {
        const infractionType = {...this.state.infractionType} 
        infractionType[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ infractionType });
    }

    addType = async e => {
        e.preventDefault();
        const {errors, infractionType} = this.state;
    
        try {
            if(Object.keys(errors).length === 0)  { 
                await infractionsService.addInfractionType(infractionType);
                this.props.history.push("/infractions");
                this.props.history.push("/infractions/types");
                toast.success("Data is added successfully!.");
            } else
                toast.error("Please ensure you add data Correctly!.");
        } catch(ex) {
            if (ex.response && ex.response.status === 400)
                toast.error("Please fill the input fields!.");
        }
    }
}
 
export default InfractionsTypes;