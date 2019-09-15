import React, { Component } from 'react'

class UserList extends Component {
    render() {
        return (<div className="users">
            {
                this.props.users.map(user => {
                    return <div key={user.id} className="row mb-1">
                        <div className="col-md-2">
                            <img alt={user.name} src={user.image} />
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-2">Name:</div>
                                <div className="col-md-10">{user.name}</div>
                            </div>
                            <div className="row">
                                <div className="col-md-2">Email:</div>
                                <div className="col-md-10">{user.email}</div>
                            </div>
                            <div className="row">
                                <div className="col-md-2">Groups:</div>
                                <div className="col-md-10">{user.userGroups.map(g => {
                                    let group = this.props.groups.find(grp => grp.id == g);
                                    return group.name;
                                }).join(", ")}</div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button className="float-right btn btn-danger ml-1" onClick={() => { this.props.onDeleteUser(user) }}>Remove</button>
                            <button className="float-right btn btn-warning" onClick={()=>{this.props.onEditUser(user)}}>Edit</button>
                        </div>
                    </div>
                })
            }
        </div>)
    }
}

export default UserList