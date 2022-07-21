import React, { Component } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />
}

class EditExercise extends Component {
    constructor(props) {
        super(props) // all react component constructor should have a super(props) call

        // bind "this" to the method so the method can access this.state
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeDuration = this.onChangeDuration.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = { // initial state with object
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        // react lifecycle method that react will call at different points
        // componentDidMount will be called before anyting displays on page
        const {id} = this.props.params;
        axios.get(`http://localhost:5000/exercises/${id}`)
        .then(response => {
            this.setState({
                username: response.data.username,
                description: response.data.description,
                duration: response.data.duration,
                date: new Date(response.data.date)
            })
        })
        .catch(err => console.log('Error in retrieving exercise: ' + err))
        
        axios.get('http://localhost:5000/users/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    users: response.data.map(user => user.username)
                })
            }
        })
        .catch(err => {
            console.log('Error in retreiving user list: ' + err)
        })
        // this.setState({
        //     users: ['test user'],
        //     username: 'test user' // dropdown will select the first user from userlist
        // })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate(date) { // for other calender button?
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault() // this prevents default HTML form submit behaviour to be triggered

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise) // from here will submit info to DB
        axios.post(`http://localhost:5000/exercises/update/${this.props.params.id}`, exercise)
        .then(res => console.log('exercise data posted', res.data))

        window.location = '/' // go back to exercise list
    }

    render() {
        return (
            <div>
                <h3>Edit Exercise Log page</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        {/* dropdown */}
                        <select ref="userInput" required className="form-control" value={this.state.username} onChange={this.onChangeUsername}>
                            {
                                this.state.users.map((user) => {
                                    return (
                                        <option key={user} value={user}>
                                            {user}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text" className="form-control" value={this.state.description} onChange={this.onChangeDescription} />
                    </div>

                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text" className="form-control" value={this.state.duration} onChange={this.onChangeDuration} />
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <DatePicker selected={this.state.date} onChange={this.onChangeDate} />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Exercise" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
export default withParams(EditExercise)