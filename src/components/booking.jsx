import React, { Component } from 'react';

import * as authService from './../services/authService';
import * as bookingService from '../services/bookingService';
import BookingTable from './../content/booking/bookingTable';
import NotResult from './notResult';

import Pagination from '../features/pagination';
import { paginate } from '../features/paginate';

class Booking extends Component {
    state = { 
        booking: [], 

        currentPage: 1,
        pageSize: 10
    }

    async componentDidMount() {
        const {userType} = this.props;

        if (userType === "user") {
            const userDecode = authService.decodeAT();

            const {data: booking} = await bookingService.getUserBooking(userDecode.id);
            this.setState({ booking });

        } else {
            const { data : booking } = await bookingService.getAllBooking();
            this.setState({ booking });
        }
    }

    render() { 
        const booking = paginate(this.state.booking, this.state.currentPage, this.state.pageSize);

        return ( 
            
            <div className="container">
                <div className="booking">
                    <div className="bordr"></div>
                    <div className="bordr2"></div>

                    {booking.length > 0 ?
                        <BookingTable 
                            booking ={booking}
                        />
                        :
                        <NotResult />
                    }

                    <Pagination 
                        itemsCount = {this.state.booking.length}
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
 
export default Booking;