const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose') // for connection to mongodb atlas

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()) // middleware
app.use(express.json()) // allow parsing of json

// for mongoose
const uri = process.env.ATLAS_URI;
mongoose.connect(uri)
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection ESTABLISHED SUCCESSFULLY")
})

const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`SERVER IS NOW RUNNING ON PORT: ${port}`)
})
