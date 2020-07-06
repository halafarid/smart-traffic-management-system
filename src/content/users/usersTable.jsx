import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UsersTable extends Component {
    state = { };

    render() { 
        const {users} = this.props;

        return ( 
            <table className="table table-bordered table-hover text-center showTable">

                <thead>
                    <tr>
                        <th scope="col">National ID</th>
                        <th scope="col">Name</th>
                        <th scope="col" className="hidePhone">Phone</th>
                        <th scope="col" className="hideCol">Email</th>
                        <th scope="col" className="hideBD">Age</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td><Link to={`/users/${user.id}`}>{user.id}</Link></td>
                            <td>{user.name}</td>
                            <td className="hidePhone">{user.phoneNumber}</td>
                            <td className="hideCol">{user.email}</td>
                            <td className="hideBD">{user.age} &nbsp; years</td>
                        </tr>  
                    ))}
                </tbody>
                
            </table>
        );
    }
}
 
export default UsersTable;