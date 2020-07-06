import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import LogIn from './components/login';
import Layout from './components/layout';

class App extends Component {
  state = { }

  render() {
    
    return (
      <React.Fragment>
        <Route path="/" exact component={LogIn} />
        <Route path="/home" component={Layout}/>
        <Route path="/profile" component={Layout}/>
        <Route path="/cars" component={Layout}/>
        <Route path="/infractions" component={Layout}/>
        <Route path="/users" component={Layout}/>
        <Route path="/complains" component={Layout}/>
        <Route path="/stolenCars" component={Layout}/>
        <Route path="/traffic" component={Layout}/>
        <Route path="/booking" component={Layout}/>
        <Route path="/notFound" component={Layout}/>
      </React.Fragment>
    );
  }
}

export default App;
