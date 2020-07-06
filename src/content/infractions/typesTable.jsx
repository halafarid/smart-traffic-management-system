import React, { Component } from 'react';

class TypesTable extends Component {
    state = { }
    
    render() { 
        const {types} = this.props;

        return ( 
            <table className="table table-bordered table-hover text-center showTable">
                <thead>
                    <tr>
                        <th scope="col">Types</th>
                        <th scope="col">Punishment</th>
                        <th scope="col">Fine</th>
                    </tr>
                </thead>
                <tbody>
                    {types.map(type => (
                        <tr key={type.id}>
                            <td>{type.name}</td>
                            <td>{type.punishment}</td>
                            <td>{type.fine}</td>
                        </tr>  
                    ))}
                </tbody>
            </table>
         );
    }
}
 
export default TypesTable;