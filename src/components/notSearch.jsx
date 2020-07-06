import React, { Component } from 'react';

const NotSearch = () => {
    return ( 
        <div className="notSearch"> 
            <div className="col-12">
                <img src={require("../images/notSearch.png")} alt="pic"></img>
                <h1>No Result Found</h1>
                <p>We've searched but we did not find any result for your search</p>
            </div>
        </div>
    );
}
 
export default NotSearch;