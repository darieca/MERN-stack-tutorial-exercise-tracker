import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {
    constructor(props) {
        super(props) // all react component constructor should have a super(props) call

        // bind "this" to the method so the method can access this.state
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = { // initial state with object
            username: '',
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault() // this prevents default HTML form submit behaviour to be triggered

        const user = {
            username: this.state.username,
        }

        console.log(user) // from here will submit info to DB

        axios.post('http://localhost:5000/users/add', user)
        .then(res => console.log('user data posted', res.data))

        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Create new User page</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Username: </label>
                        <input required type='text' value={this.state.username} onChange={this.onChangeUsername} className='form-control' />
                    </div>
                    <div className='form-group'>
                        <input type='submit' className='btn btn-primary' value='Create' />
                    </div>
                </form>
            </div>
        )
    }
}
