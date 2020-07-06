import React, { Component } from 'react';

import * as carService from './../../services/carService';
import * as trafficService from '../../services/trafficService';

import {ToastContainer, toast} from 'react-toastify';

class AddCars extends Component {
    state = {
        traffic: [],
        car: {
            "userId": this.props.location.state.userId,
            "plateNumber": "",
            "shaseehNumber": "",
            "motorNumber": "",
            "color": "",
            "modelYear": "",
            "modelMarka": "",
            "carModel": "",
            "vechileType": "",
            "fuel": "",
            "capacity": "",
            "passengers": "",
            "loadWeight": "",
            "startDate": "",
            "trafficId": ""
        }
    }

    async componentDidMount() {
        window.addEventListener('load', this.getRandomPlate);

        const {data: traffic} = await trafficService.getTrafficData();
        this.setState({ traffic });
    }

    render() { 
        const {car, traffic} = this.state;

        const enabled = car["shaseehNumber"].length > 0 
                        && car["motorNumber"].length > 0
                        && car["color"].length > 0
                        && car["modelYear"].length > 0
                        && car["modelMarka"].length > 0
                        && car["carModel"].length > 0
                        && car["vechileType"].length > 0
                        && car["fuel"].length > 0
                        && car["capacity"].length > 0
                        && car["passengers"].length > 0
                        && car["loadWeight"].length > 0
                        && car["startDate"].length > 0
                        && car["trafficId"].length > 0;  
         
        return ( 
            <div>            
                <ToastContainer />
                <div className="container">
                    <div className="row back">
                        <h2 className="CarHeading col-12">Add Car</h2>
                    </div>

                    <form className="formAdd" autoComplete="off"> 
                        <div className="content">
                            <fieldset>
                                <legend>Car Plate</legend>
                                    <div className="row">
                                        <div className="form-group col-xl-6 col-md-12 twoCol">
                                        <label htmlFor="userId">National ID: </label>
                                        <input type="text" className="form-control" disabled value={car["userId"]} id="userId" name="userId"></input>
                                    </div>
                                    <div className="form-group plateNum col-xl-6 col-md-12 twoCol">
                                        <label>Plate Num: </label>
                                        <input type="text" className="form-control" disabled value={car["plateNumber"]} id="plateNumber" name="plateNumber"></input>
                                        <i className="fa fa-refresh" onClick={this.getRandomPlate}></i>
                                    </div>      
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend>Car Type</legend>
                                <div className="row"> 
                                    <div className="form-group threeCol col-lg-4">
                                        <label htmlFor="vechileType">Type: </label>
                                        <select className="form-control" value={car["vechileType"]} id="vechileType" name="vechileType" onChange={this.changeInput}>
                                            <option disabled></option>
                                            <option>SUV</option>
                                            <option>Truck</option>
                                            <option>Van</option>
                                            <option>Convertible</option>
                                            <option>Sedan</option>
                                            <option>Sportage</option>
                                            <option>Hatchback</option>
                                            <option>Crossover</option>
                                            <option>Luxury</option>
                                            <option>Coupe</option>
                                        </select>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                    </div>  
                                    <div className="form-group threeCol col-lg-4 col-md-6">
                                        <label htmlFor="color">Color: </label>
                                        <input type="color" className="form-control" value={car["color"]} id="color" name="color" onChange={this.changeInput}></input>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                    </div> 
                                    <div className="form-group threeCol col-lg-4 col-md-6">
                                        <label htmlFor="modelYear">Year: </label>
                                        <input type="number" min="2000" max="2019" className="form-control" value={car["modelYear"]} id="modelYear" name="modelYear" onChange={this.changeInput}></input>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                    </div>   
                                    <div className="form-group twoColDiff col-lg-6 col-md-12">
                                        <label htmlFor="carModel">Model : </label>
                                        <input type="text" className="form-control" value={car["carModel"]} id="carModel" name="carModel" onChange={this.changeInput}></input>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                    </div>   
                                    <div className="form-group twoColDiff col-lg-6 col-md-12">
                                        <label htmlFor="modelMarka">Brand : </label>
                                        <input type="text" className="form-control" value={car["modelMarka"]} id="modelMarka" name="modelMarka" onChange={this.changeInput}></input>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                    </div>    
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend>Car Numbers</legend>
                                <div className="row">
                                        <div className="form-group col-xl-6 col-md-12 twoCol">
                                        <label htmlFor="shaseehNumber">Chassis Num: </label>
                                        <input type="text" className="form-control" value={car["shaseehNumber"]} id="shaseehNumber" name="shaseehNumber" onChange={this.changeInput}></input>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                    </div>   
                                    <div className="form-group col-xl-6 col-md-12 twoCol">
                                        <label htmlFor="motorNumber">Motor Num: </label>
                                        <input type="text" className="form-control" value={car["motorNumber"]} id="motorNumber" name="motorNumber" onChange={this.changeInput}></input>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                    </div>  
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend>More Data</legend>
                                <div className="row">
                                    <div className="form-group twoCol2 col-xl-6">
                                        <label htmlFor="passengers">Passengers Num: </label>
                                        <input type="number" min="2" max="50" className="form-control" value={car["passengers"]} id="passengers" name="passengers" onChange={this.changeInput}></input>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                    </div>    
                                    <div className="form-group twoCol2 col-xl-6">
                                        <label htmlFor="loadWeight">Load Weight : </label>
                                        <input type="number" min="500" max="3000" step="50" className="form-control" value={car["loadWeight"]} id="loadWeight" name="loadWeight" onChange={this.changeInput}></input>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                    </div>  
                                    <div className="form-group twoColDiff col-xl-6 col-lg-5">
                                        <label htmlFor="fuel">Fuel : </label>
                                        <select className="form-control" value={car["fuel"]} id="fuel" name="fuel" onChange={this.changeInput}>
                                            <option disabled></option>
                                            <option>Diesel</option>
                                            <option>Gasoline</option>
                                            <option>Electric</option>
                                            <option>Hybrid</option>
                                            <option>Petrol</option>
                                            <option>Petrol+CNG</option>
                                            <option>Petrol+LPG</option>
                                        </select>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                    </div>   
                                    <div className="form-group twoColDiff col-xl-6 col-lg-7">
                                        <label htmlFor="capacity">Capacity: </label>
                                        <input type="number" min="1" className="form-control" value={car["capacity"]} id="capacity" name="capacity" onChange={this.changeInput}></input>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                    </div> 
                                </div>
                            </fieldset>  

                            <fieldset>
                                <legend>License Data</legend>
                                <div className="row">
                                    <div className="form-group col-lg-7 col-sm-12 twoCol">
                                        <label htmlFor="startDate">Start License: </label>
                                        <input type="date" className="form-control" value={car["startDate"]} id="startDate" name="startDate" onChange={this.changeInput}></input>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                    </div>   
                                    <div className="form-group col-lg-5 col-sm-12 twoCol">
                                        <label htmlFor="trafficId">Traffic: </label>
                                        <select className="form-control" value={car["trafficId"]} id="trafficId" name="trafficId" onChange={this.changeTraffic}>
                                            <option disabled></option>
                                            {traffic.map(t => 
                                                <option key={t.trafficId} name={t.name} value={t.trafficId}>{t.name}</option>
                                            )}
                                        </select>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                    </div>  
                                </div>
                            </fieldset>

                            <button className="btn btn-primary" onClick={this.doSubmit} disabled={!enabled}>Submit</button>                         
                        </div>
                    </form>
                </div>
            </div>
         );
    }

    changeInput = e => {
        e.preventDefault();
        const {car} = this.state; 
        car[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ car });
    }

    changeTraffic = e => {
        const {car, traffic} = this.state;
        car[e.currentTarget.name] = e.currentTarget.value;
        traffic[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ traffic, car });
    }
    
    doSubmit = async e => {
        e.preventDefault();
        try {
            toast.success("Data is added successfully!.");
            await carService.addCar(this.state.car);
            this.props.history.push('/users');
        } catch(ex) {
            if (ex.response && ex.response.status === 400)
                toast.error("Something is error!.");
        }
    }

    getRandomPlate = () => {
        const {car} = this.state;
        
        let randomNumber = Math.floor(1000 + Math.random() * 9999).toString().substr(0,4);

        let randomLetter = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let charactersLength = characters.length;

        for ( let i = 0; i < 3; i++ ) {
            randomLetter += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        let randomPlate = randomLetter + randomNumber;

        car["plateNumber"] = randomPlate;
        this.setState({ car });        
    }
}
 
export default AddCars;