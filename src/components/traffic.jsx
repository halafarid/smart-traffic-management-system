import React, { Component } from 'react';

import * as trafficService from './../services/trafficService';
import TrafficTable from './../content/traffic/trafficTable';

import Pagination from '../features/pagination';
import { paginate } from '../features/paginate';

class Traffic extends Component {
    state = { 
        traffic: [],

        currentPage: 1,
        pageSize: 10
    }

    async componentDidMount() {
        const {data: traffic} = await trafficService.getTrafficData();
        this.setState({ traffic });
    }

    render() { 
        const traffic = paginate(this.state.traffic, this.state.currentPage, this.state.pageSize);

        return ( 
            <div className="container">
                <div className="traffic">

                    <TrafficTable 
                        traffic ={traffic}
                    />

                    <Pagination 
                        itemsCount = {this.state.traffic.length}
                        pageSize = {this.state.pageSize}
                        currentPage = {this.state.currentPage}
                        onPageChange = {this.handlePageChange}
                    />
                    
                </div>
            </div>
         );
    }

    handlePageChange = page => {
        this.setState({ currentPage: page });
    }
}
 
export default Traffic;