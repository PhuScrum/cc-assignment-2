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

// connect database

function connectDB (){
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://admin:123@cluster0-ym27l.mongodb.net/cc-assignment?retryWrites=true";

    const client = new MongoClient(uri, { useNewUrlParser: true });
    mongoose.connect(uri, { useNewUrlParser: true })

    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;
}

connectDB()

// declare SChema

const Schema = mongoose.Schema;
const userSchema = new Schema({
 fName: {type: String},
 lName: {type: String},
 email: {type: String},
//  password: {type: String},
 gender: {type: String},
 type: {type: String},
 dateCreated: {type: Date, default: Date.now}

})

const locationSchema = new Schema({
 name: {type: String},
 address: {type: String},
 time: {type: String},
 input: {type: Object},
 member: {type: Array},
 dateCreated: {type: Date, default: Date.now}
})

const userModel = mongoose.model('user', userSchema)
const locationModel = mongoose.model('location', locationSchema)


app.route('/register')
    .post(function(req, res){
        const {email, fName, lName, age, gender} = req.body
        userModel.find({email: email}, function(err, doc){
            if(!err){
                res.json('user exists')
            }
        })
        
        userModel.create(req.body, function(err, doc){
            if(!err){
                res.json('register success')
            } else{
                res.json('error')
            }
        })
    })

app.route('/login')
    .post(function(req, res){
        const {email} = req.body
        userModel.find({email: email}, function(err, doc){
            if(!err){
                res.json('registered user')
            } else{
                res.json('first time sign in user')
            }
        })
    })



app.route('/location')
    .get(function(req, res){
        locationModel.find({}, function (err, doc){
            res.json(doc)
        })
    })
    .post(function(req, res){
        locationModel.create(req.body, function(err, doc){
            if(!err){
                res.json('location created')
            } else{
                res.json('error')
            }
        })
    })

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