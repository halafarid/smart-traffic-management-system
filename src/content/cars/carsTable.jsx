import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CarsTable extends Component {
    state = { }

    onSort = sortKey => {
        const cars = this.props.cars;

        if (sortKey) {
            cars.sort((a,b) => a[sortKey].toString().localeCompare(b[sortKey]))
            this.setState({cars})
        } else {
            console.log(cars)
        }
    }

    render() { 
        const {cars, userType} = this.props;

        return ( 
            <div className="myMain">
                <table className="table table-bordered table-hover text-center showTable">

                    <thead>
                        <tr>
                            <th scope="col" onClick={e => this.onSort('plateNumber')}>Plate No.</th>
                            <th scope="col" onClick={e => this.onSort('carModel')} className="hideCol" >Model</th>
                            <th scope="col" onClick={e => this.onSort('modelMarka')} className="hideCol">Brand</th>
                            <th scope="col" onClick={e => this.onSort('modelYear')} className="hideCol">Year</th>
                            {userType === "traffic" && <th scope="col" onClick={e => this.onSort()}>Owner</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {cars.map(car => (
                            <tr key={car.id}>
                                <td><Link to={`/cars/${car.plateNumber}`}>{car.plateNumber}</Link></td>
                                <td className="hideCol">{car.carModel}</td>
                                <td className="hideCol">{car.modelMarka}</td>
                                <td className="hideCol">{car.modelYear}</td>
                                {userType === "traffic" && <td><Link to={`/users/${car.user.id}`}>{car.user.name}</Link></td>}
                            </tr>  
                        ))}
                    </tbody>
                    
                </table>
            </div>
         );
    }
}
 
export default CarsTable;