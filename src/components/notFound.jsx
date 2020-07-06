import React, { Component } from 'react';

class NotFound extends Component {
    state = {  }
    render() { 
        return (
            <div className="notFound"> 
                <div className="row">
                    <div className="col-3">
                        <img src={require("../images/notFound.png")} alt="pic"></img>
                    </div>
                    <div className="col-7">
                        <h1>Page not found</h1>
                        <hr />
                        <p>We are sorry but the page you are looking for doesn't exist or has been removed.</p>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default NotFound;