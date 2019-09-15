import React, { Component } from 'react'
class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: '',
                email: '',
                image: 'https://dummyimage.com/150',
                userGroups: []
            }
        };
        this.valueChanged = this.valueChanged.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if (this.props.editUser) {
            this.setState({ user: { ...this.props.editUser } });
        }
    }

    valueChanged(e) {
        console.log(e.target.type)
        let nam = e.target.name;
        let val = e.target.type === 'select-multiple' ? [...this.getSelectedValues(Array.apply(null, e.target.options))] : e.target.value;
        this.setState({ user: { ...this.state.user, [nam]: val } });
        console.log(this.state.user)
        e.preventDefault();
    }

    getSelectedValues(options) {
        let selected = options.filter(item => {
            return item.selected;
        })
        return selected.map(item => item.value);
    }

    handleSubmit(e) {
        fetch("http://localhost:3000/users" + (this.props.editUser ? "/" + this.props.editUser.id : ""), {
            method: this.props.editUser ? 'put' : 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.user)
        })
            .then(res => {
                this.props.userAdded();
            });

        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-row mb-2">
                    <div className="col">
                        <input required type="text" name="name" onChange={this.valueChanged} value={this.state.user.name} className="form-control" placeholder="Name" />
                    </div>
                    <div className="col">
                        <input required type="text" name="email" onChange={this.valueChanged} value={this.state.user.email} className="form-control" placeholder="Email" />
                    </div>
                    <div className="col">
                        <select className="form-control" multiple name="userGroups" value={this.state.user.userGroups} onChange={this.valueChanged}>
                            {
                                this.props.groups.map(group => {
                                    return <option key={group.id} value={group.id}>{group.name}</option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="col">
                        <input type="submit" className="btn btn-primary" value="Submit" />
                    </div>
                </div>

            </form>
        );
    }
}

export default AddUser