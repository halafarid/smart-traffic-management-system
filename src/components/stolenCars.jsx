import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as carService from './../services/carService';
import StolenTable from './../content/stolenCars/stolenTable';
import NotResult from './notResult';

import Pagination from '../features/pagination';
import { paginate } from '../features/paginate';

class StolenCars extends Component {
    state = { 
        stolenCar: [],

        currentPage: 1,
        pageSize: 10
    }

    async componentDidMount() {
        const {data: stolenCar} = await carService.getStolenCars();
        this.setState({ stolenCar });
    }
    
    render() { 
        const stolenCar = paginate(this.state.stolenCar, this.state.currentPage, this.state.pageSize);
        const {userType} = this.props;

        return (     
            <div className="container">
                <div className="stolenCars">
                    
                    {userType === "traffic" && <div className="top">
                        <Link to="stolenCars/new">
                            <button className="btn btn-success newStolen">New Report</button>
                        </Link>
                        <Link to="stolenCars/findStolenCar">
                            <button className="btn btn-info newStolen">Find Car</button>
                        </Link>
                    </div>}

                    {userType === "traffic" ? 
                        <div>
                            <StolenTable 
                            stolenCar ={stolenCar}
                            />
                            <Pagination 
                                itemsCount = {this.state.stolenCar.length}
                                pageSize = {this.state.pageSize}
                                currentPage = {this.state.currentPage}
                                onPageChange = {this.handlePageChange}
                            />
                        </div>
                        :
                        <NotResult />
                    }
                </div>
            </div>
         );
    }

    handlePageChange = page => {
        this.setState({ currentPage: page });
    }
}
 
export default StolenCars;