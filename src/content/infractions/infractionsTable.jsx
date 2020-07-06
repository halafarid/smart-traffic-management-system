import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class InfractionsTable extends Component {
    state = { }
    
    render() { 
        const {infractions, userType} = this.props;

        return ( 
            <table className="table table-bordered table-hover text-center showTable">
                <thead>
                    <tr>
                        <th scope="col">Num.</th>
                        {userType === "traffic" && <th scope="col">Officer Name</th>}
                        {userType === "traffic" && <th scope="col">Owner Name</th>}
                        <th scope="col">Plate Num.</th>
                        <th scope="col">Type</th>
                        <th scope="col">Paid</th>
                    </tr>
                </thead>
                <tbody>
                    {infractions.map(infraction => (
                        <tr key={infraction.id}>
                            <td><Link to={`/infractions/${infraction.id}`}>{infraction.id}</Link></td>
                            {userType === "traffic" && <td>{infraction.officer.name}</td>}
                            {userType === "traffic" && <td><Link to={`/users/${infraction.owner.id}`}>{infraction.owner.name}</Link></td>}
                            <td><Link to={`/cars/${infraction.car.plateNumber}`}>{infraction.car.plateNumber}</Link></td>
                            <td>{infraction.infractionType.name}</td>
                            <td>
                                {
                                this.parseBool(infraction.isPaid) === "true" ?
                                    <i className="fa fa-check-circle-o valid" aria-hidden="true"></i>
                                :
                                    <i className="fa fa-times-circle-o invalid" aria-hidden="true"></i>
                                }
                            </td>
                        </tr>  
                    ))}
                </tbody>
            </table>
         );
    }

    parseBool = val => { 
        if (val === true) return "true";
        else return "false"; 
    }
}
 
export default InfractionsTable;