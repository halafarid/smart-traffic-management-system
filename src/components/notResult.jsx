import React, { Component } from 'react';

const NotResult = () => {
    return ( 
        <div className="notResult"> 
            <div className="col-12">
                <img src={require("../images/notResult.png")} alt="pic"></img>
                <h1>No Data Found</h1>
                <p className="col-8 offset-2">You do not have any data. When you have a new data, We will send you a notification about it</p>
            </div>
        </div> 
    );
}
 
export default NotResult;