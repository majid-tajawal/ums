import React, { Component } from 'react';
import UserList from "./components/UserList"
import AddUser from './components/AddUser'


class Users extends Component {
    constructor() {
        super();
        this.state = { showForm: false, groups: [], users: [], editUser: "" }
        this.addNewUser = this.addNewUser.bind(this);
        this.userAdded = this.userAdded.bind(this);
        this.onDeleteUser = this.onDeleteUser.bind(this);
        this.onEditUser = this.onEditUser.bind(this);
    }

    addNewUser(event) {
        this.setState({ showForm: true, editUser: "" });
    }
    userAdded() {
        this.setState({ showForm: false });
        this.fetchUsers();
    }

    onEditUser(user) {
        this.setState({ editUser: user, showForm: true });
    }

    onDeleteUser(user) {
        fetch('http://localhost:3000/users/' + user.id, {
            method: 'DELETE'
        })
            .then(res => {
                this.fetchUsers();
            })
            .then(res => console.log(res))
    }

    fetchUserGroups(users) {
        fetch("http://localhost:3000/groups")
            .then(response => response.json())
            .then(res => {
                this.setState({ groups: res })
                console.log(this.state.groups)
            });
    }
    fetchUsers() {
        fetch("http://localhost:3000/users")
            .then(response => response.json())
            .then(res => {
                console.log(res)
                this.setState({ users: res })
            });
    }

    componentDidMount() {
        this.fetchUserGroups()
        this.fetchUsers();
    }

    render() {
        return <div className="m-3">
            <div className="row">
                <div className="col-md-6">
                    <h2>Users</h2>
                </div>
                <div className="col-md-6">
                    <div className="float-right">
                        <button onClick={this.addNewUser} className="btn btn-primary">Add New User</button>
                    </div>
                </div>
            </div>
            {this.state.showForm ? <AddUser editUser={this.state.editUser} userAdded={this.userAdded} groups={this.state.groups} /> : null}
            <div className="row">
                <div className="col-md-12">
                    <UserList onDeleteUser={this.onDeleteUser} onEditUser={this.onEditUser} groups={this.state.groups} users={this.state.users} />
                </div>
            </div>
        </div>
    }
}

export default Users