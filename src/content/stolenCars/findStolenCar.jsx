import React, { Component } from 'react';
import * as carService from './../../services/carService';

import {ToastContainer, toast} from 'react-toastify';

class FindStolenCar extends Component {
    state = {
        errors: {},
        stolenCar: {
            "plateNumber": "",
            "carId": "",
            "dateStoled": "",
            "lastLocation": "",
            "carOrPlateIsStoled": "0",
        },
        disabled: true,
        disabledUser: true,
        checked: false,
        checkedUser: false
    }

    render() { 
        const {stolenCar, errors} = this.state;
         
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
                        <h2 className="col">Find Stolen Car</h2>
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
                                       <label className="col-5">Is the car returned to traffic? </label>
                                        <input type="checkbox" disabled={this.state.disabled ? true : false} checked={this.state.checked ? true : false} onClick={this.handleCheck} className="col-3"></input>                    
                                    </div> 
                                    
                                    <div className="form-group col-12">
                                        <label className="col-5">Is the car returned to user? </label>
                                        <input type="checkbox" disabled={this.state.disabledUser ? true : false} checked={this.state.checkedUser ? true : false} onClick={this.checkUser} className="col-3"></input>    
                                    </div>  
                                </div>
                            </fieldset>   

                            <button className="btn btn-primary" onClick={this.doSubmit}>Submit</button>                        
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
        const input = currentTarget.value.toUpperCase();

        if (currentTarget.name === "plateNumber") {
            if (input === "") return "";
            this.getCar();
        }
    }

    getCar = async () => {
        const {stolenCar, errors} = this.state;
        try {
            const {data : userCar} = await carService.getCarPlate(stolenCar.plateNumber);

            if (!userCar.reportedAsStolen) {
                errors.plateNumber = "This car hasn't be reported before!.";
                this.setState({ errors });
            } else {
                stolenCar["carId"] = userCar.id;
                this.setState({stolenCar});
                this.checkCarStolen();
            }
        } catch(ex) {
            if (ex.response && ex.response.status === 400)
                errors.plateNumber = "❌ This Car isn't found!.";  
            this.setState({ errors })
        }  
    }

    checkCarStolen = async () => { 
        const {stolenCar, errors} = this.state;
        const {data : car} = await carService.getSpecificStolenCar(stolenCar.carId);

        if (car.reternedToTraffic && car.hasReturenedToOwner) {
            errors.plateNumber = "This car hasn't be reported before!."
            this.setState({ errors });            
        } else {
            this.setState({ disabled: false });
        }
    }

    handleCheck = () => {
        this.setState({ checked: true, disabledUser: false})
        console.log(this.state.checked);
    }
    checkUser = () => {
        this.setState({ checkedUser: true})
        console.log(this.state.checkedUser)
    }
    
    doSubmit = async e => {
        e.preventDefault();
        const {stolenCar, checked, checkedUser} = this.state;

        if (checked) {
            await carService.returnCarToTraffic(stolenCar.plateNumber);

            if (checkedUser)
                await carService.returnCarToUser(stolenCar.plateNumber);

            toast.success("Car is returned successfully!.");
            this.props.history.push('/stolenCars');
        }
    }
}
 
export default FindStolenCar;