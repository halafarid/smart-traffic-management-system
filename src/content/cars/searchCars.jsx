import React, { Component } from 'react';

class SearchCars extends Component {
    state = { };
    
    render() { 
        return ( 
            <div className="top">
                <div className="search">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text"><span className="fa fa-search form-control-feedback"></span></div>
                        </div>
                        <input type="search" className="form-control" placeholder="Enter Plate Number" onBlur={this.props.changeInput}></input>
                    </div>
                    <button className="btn btn-primary" onClick={this.props.searchForPlate}>Search</button>
                </div>

                <div className="showHideElement">
                    <div className="element" hidden={this.props.hiddenCarFilter? true : false }> 
                        <span role="img" aria-label='found'> &nbsp; ✅ This Plate Number is found!.</span>
                    </div>

                    <div className="element" hidden={this.props.hiddenWord ? true : false }>
                        <span className="not" role="img" aria-label='search'> &nbsp; ❌ Please enter your Plate Number!.</span>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default SearchCars;