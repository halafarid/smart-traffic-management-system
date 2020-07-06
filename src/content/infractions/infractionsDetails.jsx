import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as infractionsService from '../../services/infractionsService';
import { ToastContainer, toast } from 'react-toastify';

class InfractionsDetails extends Component {
    state = { 
        infractions: [],
        infractionId: "",
        officer: [],
        owner: [],
        car: [],
        type: [],
    }

    async componentDidMount() {
        try {
            const infractionId = this.props.match.params.id;
            const {data : infractions} = await infractionsService.getSpecificInfraction(infractionId);
            const officer = infractions.officer;
            const owner = infractions.owner;
            const car = infractions.car;
            const type = infractions.infractionType;
            this.setState({ infractions, infractionId, officer, owner, car, type });

        } catch(ex) {
            if (ex.response && ex.response.status === 400)
                this.props.history.push("/notFound");
        }
    }
    
    render() { 
        const {infractions, infractionId, officer, owner, car, type} = this.state;

        return ( 
            <div className="container">
                <ToastContainer />

                <form className="formDetails infractionData">                  
                    <div className="row">
                        <h3 className="col-12">Username</h3>
                        <div className="form-group col-6">
                            <label className="col-lg-6 col-md-5">Officer Name : </label>
                            <Link to={`/users/${officer.id}`}>
                                <span className="col">{officer.name}</span>                            
                            </Link>
                        </div>
                        <div className="form-group col-6">
                            <label className="col-lg-5 col-md-5">Car Plate : </label>
                            <Link to={`/cars/${car.plateNumber}`}>
                                <span className="col">{car.plateNumber}</span>                            
                            </Link>
                        </div>
                    </div>

                    <div className="row">
                        <h3 className="col-12">Infraction Type</h3>
                        <div className="form-group col-lg-6 col-md-12">
                            <label className="col-lg-2 col-md-5">Name: </label>
                            <span className="col">{type.name}</span>
                        </div>
                        <div className="form-group col-lg-6 col-md-12">
                            <label className="col-md-4">Punishment : </label>
                            <span className="col col-md-6">{type.punishment}</span>
                        </div>
                        <div className="form-group col-lg-3 col-md-12">
                            <label className="col-lg-4">Fine : </label>
                            <span className="col">{type.fine}</span>
                        </div>
                        <div className="form-group col-lg-8">
                            <label className="col-lg-2 col-md-5">Paid : </label>
                            {
                                this.parseBool(infractions.isPaid) === "true" ?
                                    <div className="isPaid">
                                        <i className="fa fa-check-circle-o valid col-sm-3 col-5" aria-hidden="true"></i>
                                        <label className="col-lg-3 col-md-5">Date Paid : </label>
                                        <span className="col">{this.parseDate(infractions.paidDate)}</span>
                                    </div>
                                : 
                                    <div className="isPaid">
                                        <i className="fa fa-times-circle-o invalid col-sm-3 col-5" aria-hidden="true"></i>
                                        <Link to={`/infractions/${infractionId}`} className="goPay" onClick={this.payInfraction}>Click here to pay</Link>
                                    </div>
                            }
                        </div>
                    </div>

                    <div className="row">
                        <h3 className="col-12">Infraction Details</h3>
                        <div className="form-group col-lg-4 col-md-12">
                            <label className="col-3">Date : </label>
                            <span className="col">{this.parseDate(infractions.dateCreated)}</span>
                        </div>
                        <div className="form-group col-lg-4 col-md-12">
                            <label className="col-5">Longitude : </label>
                            <span className="col">{infractions.longitude}</span>
                        </div>
                        <div className="form-group col-lg-4 col-md-12">
                            <label className="col-5">Latitude : </label>
                            <span className="col">{infractions.latitude}</span>
                        </div>
                    </div>
                </form>
            </div>
         );
    }

    parseBool = val => { 
        if (val === true) return "true";
        else return "false"; 
    }

    parseDate = val => {
        let date = new Date(val);
        return date.toDateString();
    }

    payInfraction = async () => {
        const {infractionId} = this.state;
        const pay = window.confirm("are you sure to pay this infraction ?");
        
        if (pay === true) {
            await infractionsService.payInfraction(infractionId);
            this.props.history.push("/infractions");
            this.props.history.push(`/infractions/${infractionId}`);
            toast.success("The Infraction is paid successfully!.");
        }
    }
}
 
export default InfractionsDetails;