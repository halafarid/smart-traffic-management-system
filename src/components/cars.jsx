import React, { Component } from 'react';

import * as authService from './../services/authService';
import * as carService from './../services/carService';

import CarsTable from '../content/cars/carsTable';
import SearchCars from '../content/cars/searchCars';
import NotSearch from './notSearch';

import Pagination from '../features/pagination';
import { paginate } from '../features/paginate';

class Cars extends Component {
    state = { 
        cars: [],
        filtered: [],

        carPlate: "",
        
        hiddenCarFilter: true,
        hiddenWord: true,
        hiddenNotFound: true,
        hiddenCarTable: false,

        pageNumber: 1,
        pageSize: 10
    }

    async componentDidMount() {
        const {userType} = this.props;

        if (userType === "user") {
            const userDecode = authService.decodeAT();

            const {data: cars} = await carService.getUserCars(userDecode.id);
            this.setState({ cars });

        } else {
            const {data: cars} = await carService.getAllCars();
            this.setState({ cars });
        }
    }

    render() { 
        const cars = paginate(this.state.cars, this.state.pageNumber, this.state.pageSize);
        const {userType} = this.props;
        const {filtered} = this.state;

        return ( 
            <div className="container">
                <div className="cars">
                
                    {userType === "traffic" && 
                        <SearchCars 
                            hiddenCarFilter = {this.state.hiddenCarFilter}
                            hiddenWord = {this.state.hiddenWord}
                            changeInput = {this.changeInput}
                            searchForPlate = {this.searchForPlate}
                        />
                    }

                    <div hidden={this.state.hiddenNotFound ? true : false}>
                        <NotSearch />
                    </div>
                    
                    <div>
                        <div hidden={this.state.hiddenCarTable ? true : false }>
                            <CarsTable 
                                cars = {cars}
                                userType = {userType}
                            />

                            <Pagination 
                                itemsCount = {this.state.cars.length}
                                pageSize = {this.state.pageSize}
                                currentPage = {this.state.pageNumber}
                                onPageChange = {this.handlePageChange}
                            />
                        </div>

                        <div hidden={this.state.hiddenCarFilter ? true : false}>
                            <CarsTable 
                                cars = {filtered}
                                userType = {userType}
                            />
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    handlePageChange = page => {
        this.setState({ pageNumber: page });
    }

    changeInput = e => {
        const carPlate = e.target.value;
        this.setState({ carPlate });

        if (carPlate === "")
            this.setState({ hiddenCarTable: false, hiddenCarFilter: true, hiddenNotFound: true, hiddenWord: true });
    }

    searchForPlate = async () => {
        const { carPlate } = this.state;
        const filtered = this.state.cars.filter(m => {return m.plateNumber === carPlate.toUpperCase()});
        this.setState({filtered});
        
        try {
            const {data : car} = await carService.getCarPlate(carPlate);

            if (carPlate === "") 
                this.setState({ hiddenWord : false });

            if (car.plateNumber)
                this.setState({hiddenCarFilter: false, hiddenCarTable: true, hiddenWord: true, hiddenNotFound: true});
            
        } catch (ex) {
            if (ex.response && ex.response.status >= 400)
                this.setState({hiddenNotFound: false, hiddenWord: true, hiddenCarFilter: true, hiddenCarTable: true});
        }   
    }
}
 
export default Cars;