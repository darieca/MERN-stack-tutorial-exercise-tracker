import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// functional component
// does not have state and lifecycle method
// if just need to take in prop and return jsx, use functional component
const Exercise = (props) => {
    return (
        <tr>
            <td>
                {props.exercise.username}
            </td>
            <td>
                {props.exercise.description}
            </td>
            <td>
                {props.exercise.duration}
            </td>
            <td>
                {props.exercise.date.substring(0, 10)}
            </td>
            <td>
                <Link to={`/edit/${props.exercise._id}`}>edit</Link> |
                <a href="#" onClick={() => { props.deleteExercise(props.exercise._id)}}>delete</a>
            </td>
        </tr>
    )
}

// class component 
export default class ExercisesList extends Component {
    constructor(props) {
        super(props)

        this.deleteExercise = this.deleteExercise.bind(this)

        this.state = {
            exercises: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                // console.log(response.data)
                this.setState({
                    exercises: response.data
                })

            })
            .catch(err => {
                console.log('Error in retrieving ex log: ' + err)
            })
    }

    deleteExercise(id) {
        axios.delete(`http://localhost:5000/exercises/${id}`)
            .then(res => console.log(`Exercise ${id} deleted: ` + res.data))
            .catch(err => console.log('Error in deleting exercise: ' + err))

        // delete exercise displayed
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        return this.state.exercises.map((ex) => {
            return (<Exercise exercise={ex} deleteExercise={this.deleteExercise} key={ex._id} />)
        })
    }

    render() {
        return (
            <div>
                <h3>Exercise List</h3>

                <table className='table'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td>Username</td>
                            <td>Description</td>
                            <td>Duration</td>
                            <td>Date</td>
                            <td></td>
                        </tr> */}
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
