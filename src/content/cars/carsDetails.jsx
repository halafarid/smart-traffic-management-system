import React, { Component } from 'react';

import * as carService from './../../services/carService';
import * as infractionsService from '../../services/infractionsService';
import * as bookingService from '../../services/bookingService';

import TrafficDetailsPage from './../traffic/trafficDetailsPage';
import FormDetails from './../../common/formsDetails';
import { Link } from 'react-router-dom';

class CarsDetails extends Component {
    state = { 
        cars: [],
        traffic: [],
        user: [],
        carsPlates: [],
        carInfractions: [],
        carBooking: [],

        hiddenTraffic: true
    }

    async componentDidMount() {
        const carsPlates = localStorage.getItem("carsPlates");
        this.setState({carsPlates});

        const {userType} = this.props;

        try {
            const carId = this.props.match.params.id;
            const plateNumber = this.props.match.params.plateNumber;

            if (carId !== undefined) {
                const {data: cars} = await carService.getSpecificCar(carId);
                const traffic = cars.traffic;
                this.setState({traffic, cars});   
            }
            else if (plateNumber !== undefined) {
                if (userType === "user") { 
                    if (!carsPlates.includes(plateNumber))
                        window.location = "/cars";
                }
                const {data: cars} = await carService.getCarPlate(plateNumber);
                const {data: carInfractions} = await infractionsService.getCarInfractions(plateNumber);
                // const {data: carBooking} = await bookingService.getCarBooking(plateNumber);
                const traffic = cars.traffic;
                const user = cars.user;

                // carBooking
                this.setState({cars, traffic, user, carInfractions}); 
            }
        } catch(ex) {
            if (ex.response && ex.response.status === 400)
                this.props.history.push("/notFound");
        }
    }

    render() { 
        const {cars, traffic, user, carInfractions, carBooking} = this.state;
        const {userType} = this.props;

        return ( 
            <div className="container">
                <div className="row back">
                    <div className="col-md-5 col-sm-4 col-3">
                        <button onClick={() => this.props.history.push('/cars')}>
                            <i className="fa fa-arrow-left" aria-hidden="true"></i>
                        </button>
                    </div>
                    <h2 className="col">Car Details</h2>
                </div>

                <form className="formDetails carData">

                    <div className="row">
                        <h3 className="col-12">Car Plate</h3>
                        <FormDetails 
                            divRes = "form-group col-6"
                            labelRes = "col-md-5 col-12"
                            spanRes = "col-7"
                            label = "Plate Num : "
                            data = {cars.plateNumber}
                        />
                        {userType === "traffic" && <FormDetails 
                            divRes = "form-group col-6"
                            labelRes = "col-md-5 col-sm-6 col-12"
                            spanResLink = "col-sm-7 col-12"
                            label = "Owner Name : "
                            dataLink = {user.name}
                            toLink = "/users/"
                            specific= {`${user.id}`}
                        />}
                    </div>

                    <div className="row">
                        <h3 className="col-12">Car Type</h3>
                        <FormDetails 
                            divRes = "form-group col-lg-6 col-md-12"
                            labelRes = "col-xl-6 col-lg-7 col-md-5 col-6"
                            spanRes = "col-md-7 col-6"
                            label = "Vechile Type: "
                            data = {cars.vechileType}
                        />
                        <FormDetails 
                            divRes = "form-group col-md-6"
                            labelRes = "col-lg-3 col-md-5 col-6"
                            spanRes = "col-md-7 col-6"
                            label = "Color: "
                            data = {cars.color}
                        />
                        <FormDetails 
                            divRes = "form-group col-lg-4 col-md-6 col-sm-12"
                            labelRes = "col-lg-6 col-md-5 col-6"
                            spanRes = "col-md-7 col-6"
                            label = "Model: "
                            data = {cars.carModel}
                        />
                        <FormDetails 
                            divRes = "form-group col-lg-4 col-md-6 col-sm-12"
                            labelRes = "col-lg-6 col-md-5 col-6"
                            spanRes = "col-md-7 col-6"
                            label = "Brand: "
                            data = {cars.modelMarka}
                        />
                        <FormDetails 
                            divRes = "form-group col-lg-4 col-md-6 col-sm-12"
                            labelRes = "col-md-5 col-6"
                            spanRes = "col-md-7 col-6"
                            label = "Year: "
                            data = {cars.modelYear}
                        />
                    </div>

                    <div className="row">
                        <h3 className="col-12">Car Specifications</h3>
                        <FormDetails 
                            divRes = "form-group col-lg-6 col-md-12"
                            labelRes = "col-lg-6 col-md-5 col-6"
                            spanRes = "col-sm-7 col-6"
                            label = "Chassis Num: "
                            data = {cars.shaseehNumber}
                        />
                        <FormDetails 
                            divRes = "form-group col-lg-6 col-md-12"
                            labelRes = "col-xl-6 col-lg-7 col-md-5 col-6"
                            spanRes = "col-sm-7 col-6"
                            label = "Motor Num: "
                            data = {cars.motorNumber}
                        />
                    </div>
                    <div className="row">
                        <h3 className="col-12">More Data</h3>
                        <FormDetails 
                            divRes = "form-group col-lg-6 col-md-12"
                            labelRes = "col-lg-7 col-md-5 col-sm-6 col-7"
                            spanRes = "col-sm-7 col-sm-6"
                            label = "Passengers Num:"
                            data = {cars.passengers}
                        />
                        <FormDetails 
                            divRes = "form-group col-lg-6 col-md-12"
                            labelRes = "col-xl-6 col-lg-7 col-md-5 col-6"
                            spanRes = "col-sm-7 col-sm-6"
                            label = "Load Weight: "
                            data = {cars.loadWeight}
                        />
                        <FormDetails 
                            divRes = "form-group col-lg-6 col-sm-12"
                            labelRes = "col-xl-6 col-lg-6 col-md-5 col-6"
                            spanRes = "col-sm-6"
                            label = "Fuel: "
                            data = {cars.fuel}
                        />
                        <FormDetails 
                            divRes = "form-group col-lg-6 col-sm-12"
                            labelRes = "col-xl-6 col-lg-7 col-md-5 col-6"
                            spanRes = "col-sm-6"
                            label = "Fuel Capacity: "
                            data = {cars.capacity}
                        />
                    </div>

                    <div className="row">
                        <h3 className="col-12">Car Infractions</h3>
                        {carInfractions.length > 0 ?
                            <div className="form-group col-12">
                                <label className="col-2">Car Infractions: </label>
                                {carInfractions.map( infraction =>
                                    <Link to={`/infractions/${infraction.id}`} key={infraction.id}>
                                        <span className="col-5">{infraction.infractionType.name}</span>
                                        {
                                            this.parseBool(infraction.isPaid) === "true" ?
                                                <i className="fa fa-check-circle-o valid" aria-hidden="true"></i>
                                            :
                                                <i className="fa fa-times-circle-o invalid" aria-hidden="true"></i>
                                        }
                                    </Link>
                                )}
                            </div>
                            :
                            <h5 className="col-12">The Car hasn't any infractions.</h5>
                        }
                    </div>

                    <div className="row">
                        <h3 className="col-12">Car Booking</h3>
                        {carBooking.length > 0 ?
                            <div className="form-group col-12">
                                <label className="col-2">Car Booking: </label>
                                {carBooking.map( infraction =>
                                    <Link to={`/infractions/${infraction.id}`} key={infraction.id}>
                                        <span className="col-5">{infraction.infractionType.name}</span>
                                        {
                                            this.parseBool(infraction.isPaid) === "true" ?
                                                <i className="fa fa-check-circle-o valid" aria-hidden="true"></i>
                                            :
                                                <i className="fa fa-times-circle-o invalid" aria-hidden="true"></i>
                                        }
                                    </Link>
                                )}
                            </div>
                            :
                            <h5 className="col-12">The Car hasn't any Booking.</h5>
                        }
                    </div>

                    <div className="row">
                        <h3 className="col-12">License Data</h3>
                        <FormDetails 
                            divRes = "form-group col-12"
                            labelRes = "col-md-5 col-sm-6 col-12"
                            spanRes = "col-md-7 col-sm-6 col-12"
                            label = "Start License : "
                            data = {this.parseDate(cars.startDate)}
                        />
                        <FormDetails 
                            divRes = "form-group col-12"
                            labelRes = "col-md-5 col-sm-6 col-12"
                            spanRes = "col-md-7 col-sm-6 col-12"
                            label = "End License : "
                            data = {this.parseDate(cars.endDate)}
                            iRes = {
                                    this.parseBool(cars.licenseIsValid) === "true" ?
                                        "fa fa-check-circle-o valid col-sm-3 col-5"
                                    :
                                        "fa fa-times-circle-o invalid col-sm-3 col-5"
                                    }
                        />   
                        <FormDetails 
                            divRes = "form-group col-12"
                            labelRes = "col-md-5 col-6"
                            spanClass = "links"
                            label = "Traffic : "
                            spanData = {traffic.name}
                            functions = {this.showTraffic}
                        />                       
                    </div>

                    <div className="showDetails showForm">
                        <div className="showHidePage" hidden={this.state.hiddenTraffic ? true : false} onClick={this.hiddenTraffic}>
                            <span className="helper"></span>
                            <div>
                                <div className="form-group myForm">
                                    <TrafficDetailsPage 
                                        trafficId = {traffic.trafficId}
                                    />
                                </div>
                            </div>
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

    showImage = () => { this.setState({hiddenImage: false} )}
    hiddenImage = () => { this.setState({hiddenImage: true}) }

    showTraffic = () => { this.setState({hiddenTraffic: false}) }
    hiddenTraffic = () => { this.setState({hiddenTraffic: true}) }
}
 
export default CarsDetails;