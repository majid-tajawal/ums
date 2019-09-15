import React, { Component } from 'react'
class AddGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group: {
                name: ''
            }
        };

        this.valueChanged = this.valueChanged.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if (this.props.editGroup) {
            this.setState({ group: { id: this.props.editGroup.id, name: this.props.editGroup.name } });
        }
    }

    valueChanged(e) {
        console.log(e.target.type)
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({ group: { ...this.state.group, [nam]: val } });
        console.log(this.state.group)
        e.preventDefault();
    }

    handleSubmit(e) {
        fetch("http://localhost:3000/groups" + (this.props.editGroup ? "/" + this.props.editGroup.id : ""), {
            method: this.props.editGroup ? 'put' : 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.group)
        })
            .then(res => {
                this.props.groupAdded();
            });

        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-row mb-2">
                    <div className="col">
                        <input required type="text" name="name" onChange={this.valueChanged} value={this.state.group.name} className="form-control" placeholder="Name" />
                    </div>
                    <div className="col">
                        <input type="submit" className="btn btn-primary" value="Submit" />
                    </div>
                </div>

            </form>
        );
    }
}

export default AddGroup