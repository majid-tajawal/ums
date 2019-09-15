import React, { Component } from 'react';
import GroupList from "./components/GroupList"
import AddGroup from './components/AddGroup'


class Groups extends Component {
    constructor() {
        super();
        this.state = { showForm: false, groups: [], users: [], editGroup: "" }
        this.addNewGroup = this.addNewGroup.bind(this);
        this.groupAdded = this.groupAdded.bind(this);
        this.onEditGroup = this.onEditGroup.bind(this);
        this.onDeleteGroup = this.onDeleteGroup.bind(this);
    }

    addNewGroup(event) {
        this.setState({ showForm: true,editGroup: "" })
    }

    onEditGroup(group) {
        this.setState({ editGroup: group, showForm: true });
    }

    groupAdded() {
        this.setState({ showForm: false })
        this.fetchGroups()
    }

    onDeleteGroup(group) {
        if (group.users.length) {
            window.alert("Can't delete a group assigned to some users")
            return;
        }
        fetch('http://localhost:3000/groups/' + group.id, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(res => {
                this.fetchGroups();
            });
    }

    fetchGroups = () => {
        fetch("http://localhost:3000/groups")
            .then(response => response.json())
            .then(res => {
                this.fetchGroupUsers(res)
            });
    }

    fetchGroupUsers = (groups) => {
        let userGroups = groups.map(g => g.id).join("&id=");
        fetch("http://localhost:3000/users?id=" + userGroups)
            .then(response => response.json())
            .then(res => {
                groups.forEach(g => {
                    Object.assign(g, { users: res.filter(u => u.userGroups.includes(g.id.toString())) || [] })
                })
                this.setState({ groups: groups })
            });
    }

    componentDidMount() {
        this.fetchGroups();
    }

    render() {
        return <div className="m-3">
            <div className="row">
                <div className="col-md-6">
                    <h2>Groups</h2>
                </div>
                <div className="col-md-6">
                    <div className="float-right">
                        <button onClick={this.addNewGroup} className="btn btn-primary">Add New Group</button>
                    </div>
                </div>
            </div>
            {this.state.showForm ? <AddGroup editGroup={this.state.editGroup} groupAdded={this.groupAdded} /> : null}
            <div className="row">
                <div className="col-md-12">
                    <GroupList onDeleteGroup={this.onDeleteGroup} onEditGroup={this.onEditGroup} groups={this.state.groups} />
                </div>
            </div>
        </div>
    }
}

export default Groups