import React, { Component } from 'react'

class GroupList extends Component {
    render() {
        return (<div className="groups">
            {
                this.props.groups.map(group => {
                    return <div key={group.id} className="row mb-1">
                        <div className="col-md-8">
                            {group.name}
                        </div>
                        <div className="col-md-2">
                            {group.users.length} users
                        </div>
                        <div className="col-md-2 ">
                            <button className="float-right btn btn-danger ml-1" onClick={() => { this.props.onDeleteGroup(group) }}>Remove</button>
                            <button className="float-right btn-warning btn" onClick={() => { this.props.onEditGroup(group) }}>Edit</button>
                        </div>
                    </div>
                })
            }
        </div>);
    }
}

export default GroupList