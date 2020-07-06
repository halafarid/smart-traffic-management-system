import React, { Component } from 'react';

class TrafficTable extends Component {
    state = {  }

    onSort = sortKey => {
        const traffic = this.props.traffic;
        traffic.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
        this.setState({traffic})
    }

    render() { 
        const {traffic} = this.props;

        return ( 
            <table className="table table-bordered table-hover text-center showTable">

                <thead>
                    <tr>
                        <th scope="col" onClick={e => this.onSort('name')}>Traffic Name</th>
                        <th scope="col" onClick={e => this.onSort('governorate')}>Governorate</th>
                        <th scope="col" onClick={e => this.onSort('phoneNumber')} className="hidePhone">Phone</th>
                        <th scope="col" onClick={e => this.onSort('address')} className="hideCol">Address</th>
                        <th scope="col" onClick={e => this.onSort('email')} className="hideCol">Email</th>
                    </tr>
                </thead>

                <tbody>
                    {traffic.map(traffic => (
                        <tr key={traffic.trafficId}>
                            <td>{traffic.name}</td>
                            <td>{traffic.governorate}</td>
                            <td className="hidePhone">{traffic.phoneNumber}</td>
                            <td className="hideCol">{traffic.address}</td>
                            <td className="hideCol">{traffic.email}</td>
                        </tr>  
                    ))}
                </tbody>
                
            </table>
         );
    }
}
 
export default TrafficTable;