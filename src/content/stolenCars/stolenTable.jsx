import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class StolenTable extends Component {
    state = { 
        returnCar: true
    }
    
    onSort = sortKey => {
        const stolenCar = this.props.stolenCar;

        if (sortKey) {
            stolenCar.sort((a,b) => a[sortKey].toString().localeCompare(b[sortKey]))
            this.setState({stolenCar})
        } else {
            {stolenCar.map( e => 
                console.log(e[0])
            )}
        }
    }

    render() { 
        const {stolenCar} = this.props;
        
        return ( 
            <div className="stolenTable">
            <table className="table table-bordered table-hover text-center showTable">

                <thead>
                    <tr>
                        <th scope="col" onClick={e => this.onSort()}>Plate Num.</th>
                        <th scope="col" onClick={e => this.onSort('objectStoled')} className="hideStolen">Stolen Type</th>
                        <th scope="col" onClick={e => this.onSort('dateStoled')} className="hideCol">Stolen Date</th>
                        <th scope="col">Traffic</th>
                        <th scope="col">User</th>
                        {/* <th scope="col"></th> */}
                    </tr>
                </thead>

                <tbody>
                    {stolenCar.map(stolen => (
                        <tr key={stolen.id}>
                            <td><Link to={`/stolenCars/carId/${stolen.car.id}`}>{stolen.car.plateNumber}</Link></td>
                            <td className="hideStolen">{stolen.objectStoled}</td>
                            <td className="hideCol">{this.parseDate(stolen.dateStoled)}</td>
                            <td>
                                {
                                this.parseBool(stolen.reternedToTraffic) === "true" ?
                                    <i className="fa fa-check-circle-o" aria-hidden="true"></i>
                                    :
                                    <i className="fa fa-times-circle-o invalid" aria-hidden="true"></i>
                                }
                            </td>
                            <td>
                                {
                                this.parseBool(stolen.hasReturenedToOwner) === "true" ?
                                    <i className="fa fa-check-circle-o" aria-hidden="true"></i>
                                    :
                                    <i className="fa fa-times-circle-o invalid" aria-hidden="true"></i>
                                }
                            </td>
                            {/* <td><i className="fa fa-repeat returnCar" onClick={this.returnCar} aria-hidden="true"></i></td> */}
                        </tr>  
                    ))}
                </tbody>
            </table>
            <div className="showHidePage" hidden={this.state.returnCar ? true : false}>
                <span className="helper"></span>
                <div>
                    <span className="closeBtn" onClick={this.showReturnCar} role="img" aria-label='address'>❌</span>
                    <div className="form-group myForm">
                        <p></p>
                        <label className="col-7">Is the car returned to traffic? </label>
                        <input type="checkbox" className="col-3"></input>
                        <br />
                        <label className="col-7">Is the car returned to user? </label>
                        <input type="checkbox" disabled className="col-3"></input>
                        <br />
                        <button className="btn btn-primary" onClick={this.validateInput}>Save Changes</button>                        
                    </div>
                </div>
            </div>
            </div>
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

    showReturnCar = () => {this.setState({returnCar: true})}

    returnCar = () => {
        const {stolenCar} = this.props;
        console.log(stolenCar)
        


        this.setState({ returnCar : false})
    }
}
 
export default StolenTable;