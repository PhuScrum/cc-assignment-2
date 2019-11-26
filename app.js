const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')

app.use(cors())
app.use(helmet())
app.use(express.static(path.join(__dirname, '/build')))
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

// connect database Mongodb
// ATLAS DB
function connectDB (){
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://admin:123@cluster0-ym27l.mongodb.net/cc-assignment?retryWrites=true";

    const client = new MongoClient(uri, {useUnifiedTopology: true, useNewUrlParser: true });
    mongoose.connect(uri, { useNewUrlParser: true })

    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;
}

connectDB()

// declare SChema


const user_API = require('./backend/controller/user')
const location_API = require('./backend/controller/location')

app.route('/register')
    .post(user_API.register)

app.route('/login')
    .post(user_API.login)



app.route('/location')
    .get(location_API.getAll)
    .post(location_API.createLocation)
    .put(location_API.editLocation)
    .delete(location_API.deleteLocation)
app.route('/location/:locationId')
    .delete(location_API.deleteLocation)

// fetching location details
app.route('/locationDetails')
    .post(location_API.locationDetails)


const userModel = require('./backend/model/user')
app.route('/fetchUserByEmail')
    .post(user_API.fetchUserByEmail)

// both join and unjoin can use this function.
app.route('/joinLocation')
    .post(location_API.joinLocation)

app.route('/input')
    .post(location_API.addInput)



app.route('/hello')
    .get((req, res) => {
        res.status(200).send('Hello world AWS Beanstalk deployment ES6')
    })


app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build/index.html'))
    })


var port = process.env.PORT || 8080
app.listen(port)
console.log("server starting at port" + port)