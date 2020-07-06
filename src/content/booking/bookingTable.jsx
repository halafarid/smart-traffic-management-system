import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BookingTable extends Component {
    state = {  }
    render() { 
        const {booking} = this.props;
        console.log(booking)
        return ( 
            <table className="table table-bordered table-hover text-center showTable">
                <thead>
                    <tr>
                        <th scope="col">Plate Num.</th>
                        <th scope="col">Date</th>
                        <th scope="col">Turn Num.</th>
                        <th scope="col">Done</th>
                        <th scope="col">Success</th>
                    </tr>
                </thead>
                <tbody>
                    {booking.map(booking => (
                        <tr key={booking.id}>
                            <td><Link to={`/cars/${booking.car.plateNumber}`}>{booking.car.plateNumber}</Link></td>
                            <td>{this.parseDate(booking.date)}</td>
                            <td>{booking.turnNumber}</td>
                            <td>
                                {
                                    this.parseBool(booking.isDone) === "true" ?
                                        <i className="fa fa-check-circle-o" aria-hidden="true"></i>
                                    :
                                        <i className="fa fa-times-circle-o invalid" aria-hidden="true"></i>
                                }
                            </td>
                            <td>
                                {
                                    this.parseBool(booking.isSuccess) === "true" ?
                                        <i className="fa fa-check-circle-o" aria-hidden="true"></i>
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

    parseDate = val => {
        let date = new Date(val);
        return date.toDateString();
    }
}
 
export default BookingTable;