import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as carService from '../../services/carService';

class StolenDetails extends Component {
    state = { 
        stolenCar: [],
        carDetails: []
    }

    async componentDidMount() {
        try {
            const carId = this.props.match.params.carId;

            const {data: stolenCar} = await carService.getSpecificStolenCar(carId);
            const carDetails = stolenCar.car;

            this.setState({stolenCar, carDetails});
        } catch (ex) {
            if (ex.response && ex.response.status === 400)
                this.props.history.push("/notFound");
        }
    }

    render() { 
        const { stolenCar, carDetails } = this.state;

        return ( 
            <div className="container">
                <div className="row back">
                    <div className="col-lg-4 col-md-3 col-sm-2 col-1">
                        <button onClick={() => this.props.history.push('/stolenCars')}>
                            <i className="fa fa-arrow-left" aria-hidden="true"></i>
                        </button>
                    </div>
                    <h2 className="col">Stolen Car Details</h2>
                </div>

                <form className="formDetails stolenData">

                    <div className="row">
                        <h3 className="col-12">Car Plate</h3>
                        <div className="form-group col-lg-4 col-md-12">
                            <label className="col-md-5 col-sm-5 col-6">Plate Num : </label>
                            <span className="col"><Link to={`/cars/${carDetails.plateNumber}`}>{carDetails.plateNumber}</Link></span>
                        </div>
                        <div className="form-group col-lg-3 col-md-12">
                            <label className="col-md-5 col-6">Type: </label>
                            <span className="col-6">{stolenCar.objectStoled}</span>
                        </div>
                        <div className="form-group col-lg-5 col-12">
                            <label className="col-lg-5 col-md-5 col-6">Date Created: </label>
                            <span className="col">{this.parseDate(stolenCar.dateCreated)}</span>
                        </div>
                    </div>

                    <div className="row">
                        <h3 className="col-12">Steal Details</h3>
                        <div className="form-group col-xl-6 col-12">
                            <label className="col-xl-6 col-lg-4 col-md-5 col-6">Last Location: </label>
                            <span className="col-6">{stolenCar.lastLocation}</span>
                        </div>
                        <div className="form-group col-xl-6 col-12">
                            <label className="col-xl-5 col-lg-4 col-5">Stolen Date: </label>
                            <span className="col-6">{this.parseDate(stolenCar.dateStoled)}</span>
                        </div>
                        <div className="form-group col-xl-6 col-12">
                            <label className="col-lg-4 col-4">Longitude: </label>
                            <span className="col-6">{stolenCar.longitude}</span>
                        </div>
                        <div className="form-group col-xl-6 col-12">
                            <label className="col-lg-4 col-4">Latitude: </label>
                            <span className="col-6">{stolenCar.latitude}</span>
                        </div>
                    </div>
                    
                    <div className="row">
                        <h3 className="col-12">{stolenCar.objectStoled} Return</h3>
                        {
                            this.parseBool(stolenCar.reternedToTraffic) === "true" ? 
                                <div className="form-group col-12">
                                    <div className="form-group col-12">
                                        <label className="col-lg-5 col-6">Date Returned to Traffic: </label>
                                        <span className="col-6">{this.parseDate(stolenCar.dateReternedToTraffic)}</span>
                                    </div>

                                    {
                                        this.parseBool(stolenCar.teturned) === "true" ? 
                                            <div className="form-group col-12">
                                                <label className="col-lg-5 col-6">Date Returned to User: </label>
                                                <span className="col-6">{this.parseDate(stolenCar.dateReturened)}</span>
                                            </div>
                                        :
                                            <h5 className="col-12">The {stolenCar.objectStoled} hasn't returned to user yet.</h5>
                                    }
                                </div>
                            :
                                <h4 className="col-12">The {stolenCar.objectStoled} hasn't returned yet.</h4>
                        }
                    </div>
                </form>
            </div>
        );
    }

    parseBool =(val)=> { 
        if (val === true) return "true";
        else return "false"; 
    };

    parseDate = val => {
        let date = new Date(val);
        return date.toDateString();
    };
}
 
export default StolenDetails;