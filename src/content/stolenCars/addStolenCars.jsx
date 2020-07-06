import React, { Component } from 'react';
import * as carService from './../../services/carService';

import {ToastContainer, toast} from 'react-toastify';

class AddStolenCars extends Component {
    state = {
        errors: {},
        carsPlates: [],
        stolenCar: {
            "plateNumber": "",
            "carId": "",
            "dateStoled": "",
            "lastLocation": "",
            "carOrPlateIsStoled": "0",
        }
    }

    async componentDidMount() {
        const {userType} = this.props;

        if (userType === "user") {
            const carsPlates = localStorage.getItem("carsPlates");
            this.setState({ carsPlates });
        }
    }

    render() { 
        const {stolenCar, errors} = this.state;

        const enabled =  stolenCar["plateNumber"].length > 0
                        && stolenCar["dateStoled"].length > 0 
                        && stolenCar["lastLocation"].length > 0;
         
        return ( 
            <div>            
                <ToastContainer />
                <div className="container">

                    <div className="row back">
                        <div className="col-md-4 col-sm-3 col-2">
                            <button onClick={() => this.props.history.push('/stolenCars')}>
                                <i className="fa fa-arrow-left" aria-hidden="true"></i>
                            </button>
                        </div>
                        <h2 className="col">Add Report</h2>
                    </div>

                    <form className="formAdd" autoComplete="off"> 
                        <div className="content">
                            <fieldset>
                                <legend>Stolen Car</legend>
                                <div className="row">
                                    <div className="form-group col-12">
                                        <label htmlFor="carId">Plate Number: </label>
                                        <input type="text" className={errors.plateNumber ? "form-control error" : "form-control"} onBlur={this.confirmInput} value={stolenCar["plateNumber"]} id="plateNumber" name="plateNumber" onChange={this.handleChange}></input>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                        <div className="errorMsg">{errors.plateNumber}</div>
                                    </div>
                                    <div className="form-group col-12">
                                        <label htmlFor="dateStoled">Date Stoled: </label>
                                        <input type="date" className="form-control" value={stolenCar["dateStoled"]} id="dateStoled" name="dateStoled" onChange={this.handleChange}></input>
                                        <i className="fa fa-certificate" aria-hidden="true"></i>
                                    </div> 
                                    <div className="form-group col-12">
                                        <label htmlFor="lastLocation">Last Location: </label>
                                        <input type="text" className="form-control" value={stolenCar["lastLocation"]} id="lastLocation" name="lastLocation" onChange={this.handleChange}></input>
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

    handleChange = e => {
        const stolenCar = {...this.state.stolenCar} 
        stolenCar[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ stolenCar });
    }

    confirmInput = e => {
        const errors = {...this.state.errors};
        const errorMsg = this.showMsgError(e.currentTarget);
        if (errorMsg) errors[e.currentTarget.name] = errorMsg;
        else delete errors[e.currentTarget.name];

        const stolenCar = {...this.state.stolenCar};
        stolenCar[e.currentTarget.name] = e.currentTarget.value;
        this.setState( { stolenCar, errors} );
    }
    
    showMsgError = currentTarget => {  
        const {carsPlates} = this.state;
        const {userType} = this.props;
        const input = currentTarget.value.toUpperCase();

        if (currentTarget.name === "plateNumber") {
            if (input === "") return "";

            if (userType === "user") { 
                // lw el 3rbya bta3to
                if(carsPlates.includes(input))
                    this.getCar();
                else
                    return "❌ This Car isn't found!."

            // As Traffic
            } else {
                this.getCar();
            }
        }
    }

    getCar = async () => {
        const {stolenCar, errors} = this.state;
        try {
            const {data : userCar} = await carService.getCarPlate(stolenCar.plateNumber);
            stolenCar["carId"] = userCar.id;
            this.setState({stolenCar});
            this.checkCarStolen();
        } catch(ex) {
            if (ex.response && ex.response.status === 400)
                errors.plateNumber = "❌ This Car isn't found!.";  
            this.setState({ errors })
        }  
    }

    checkCarStolen = async () => { 
        const {stolenCar, errors} = this.state;
        const {data : car} = await carService.getSpecificStolenCar(stolenCar.carId);

        if (car) {
            if (car.reternedToTraffic === true && car.hasReturenedToOwner === false)
                errors.plateNumber = "This car is founded in the traffic!.";
            if (car.reternedToTraffic === false && car.hasReturenedToOwner === false)
                errors.plateNumber = "Sorry, It's already Reported to stolen!.";
            this.setState({ errors });
        }
    }
    
    doSubmit = async e => {
        e.preventDefault();
        const {stolenCar, errors} = this.state

        try {
            if(Object.keys(errors).length === 0)  {  
                toast.success("Data is added successfully!.");
                await carService.addStolenCar(stolenCar);
                this.props.history.push('/stolenCars');
            } else
                toast.error("Please ensure you enter data Correctly!");
        } catch(ex) {
            if (ex.response && ex.response.status === 400)
                toast.error("Something is error!");
        }
    }
}
 
export default AddStolenCars;