import React, { Component } from 'react';

import * as trafficService from './../../services/trafficService';


class TrafficDetailsPage extends Component {
    state = { 
        traffic: [],
        label: ["Governorate", "Phone", "Address", "Email"],
        data: ["governorate", "phoneNumber", "address", "email"]
    }

    async componentWillReceiveProps() {
        const {trafficId} = this.props;

        if (trafficId) {
            const {data: traffic} = await trafficService.getSpecificTraffic(trafficId);
            this.setState({traffic});
        }
    }

    render() { 
        const {traffic, data, label} = this.state;
        
        return ( 
            <div className="formDetails trafficDataPage">  
                <h1>Traffic Name : {traffic.name}</h1>

                <div className="row">              
                    {data.map( (data, labl) =>
                        <div className="form-group col-9" key={labl}>
                            <label>{label[labl]} : </label>
                            <span>{traffic[data]}</span>
                        </div>
                    )}     
                </div>
            </div>
         );
    }
}
 
export default TrafficDetailsPage;