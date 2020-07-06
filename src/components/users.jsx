import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as userService from '../services/userService';

import UsersTable from '../content/users/usersTable';
import NotSearch from './notSearch';

import Pagination from '../features/pagination';
import { paginate } from '../features/paginate';

class Users extends Component {
    state = { 
        users: [],
        cars:[],
        filtered: [],

        userId: "",
        
        hiddenUserFilter: true,
        hiddenWord: true,
        hiddenNotFound: true,
        hiddenBtn: false,
        hiddenUserTable: false,

        currentPage: 1,
        pageSize: 9
    }

    async componentDidMount() {
        const {data : users} = await userService.getAllUsers();
        this.setState({ users });
    }

    render() { 
        const users = paginate(this.state.users, this.state.currentPage, this.state.pageSize);
        const {filtered} = this.state;
        const {userType} = this.props;

        return ( 
            <div className="container">
                <div className="users">

                    {userType === "traffic" && 
                        <div className="top">
                            <div className="search">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><span className="fa fa-search form-control-feedback"></span></div>
                                    </div>
                                    <input type="search" className="form-control" placeholder="Enter National ID" onBlur={this.changeInput}></input>
                                </div>
                                <button className="btn btn-primary" onClick={this.searchForId}>Search</button>
                            </div>
            
                            <div className="showHideElement">
                                <div className="element" hidden={this.state.hiddenUserFilter ? true : false }> 
                                    <span> &nbsp; ✅ This National ID is found!. 
                                        <Link to={{pathname:"/users/new/car", state: {userId: this.state.userId}}}>Add Car</Link>
                                    </span>
                                </div>
            
                                <div className="element" hidden={this.state.hiddenWord ? true : false }>
                                    <span className="not"> &nbsp; ❌ Please enter your national ID!.</span>
                                </div>
                            </div>
            
                            <div className="d-none d-md-inline">
                                <Link to="users/new">
                                    <button className="btn btn-success newUser" hidden={this.state.hiddenBtn ? true : false }>New User</button>
                                </Link>
                            </div>
                            <div className="d-md-none d-inline">
                                <Link to="users/new">
                                    <button className="btn btn-success newUser" hidden={this.state.hiddenBtn ? true : false }>+</button>
                                </Link>
                            </div>
                        </div>
                    }

                    <div className="element">
                        <div hidden={this.state.hiddenNotFound ? true : false}><NotSearch /></div>
                    </div>

                    <div hidden={this.state.hiddenUserTable ? true : false }>
                        <UsersTable 
                            users = {users}
                        />

                        <Pagination 
                            itemsCount = {this.state.users.length}
                            pageSize = {this.state.pageSize}
                            currentPage = {this.state.currentPage}
                            onPageChange = {this.handlePageChange}
                        />
                    </div>

                    <div hidden={this.state.hiddenUserFilter ? true : false}>
                        <UsersTable 
                            users = {filtered}
                        />
                    </div>
                </div>
            </div>
        );
    }

    handlePageChange = page => {
        this.setState({ currentPage: page });
    }

    changeInput = e => {
        const userId = e.target.value;
        this.setState({ userId });

        if (userId === "")
            this.setState({ hiddenUserTable: false, hiddenBtn: false, hiddenUserFilter: true, hiddenNotFound: true, hiddenWord: true });
    }

    searchForId = async () => {
        const { userId } = this.state;
        const filtered = this.state.users.filter(m => {return m.id === userId.toUpperCase()});
        this.setState({filtered});

        try {
            const {data : user} = await userService.getSpecificUser(userId);

            if (userId === "") 
                this.setState({ hiddenWord : false });

            if (user.id)
                this.setState({hiddenUserFilter: false, hiddenBtn: true, hiddenUserTable: true, hiddenWord: true, hiddenNotFound: true});
            
        } catch (ex) {
            if (ex.response && ex.response.status >= 400)
                this.setState({hiddenNotFound: false, hiddenBtn: false, hiddenWord: true, hiddenUserFilter: true, hiddenUserTable: true});
        }   
    }
}
 
export default Users;