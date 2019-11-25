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

const Schema = mongoose.Schema;
const userSchema = new Schema({
 fName: {type: String},
 lName: {type: String},
 email: {type: String, unique: true},
 phoneNumber: {type: String},
 gender: {type: String},
 type: {type: String},
 dateCreated: {type: Date, default: Date.now}

})

const locationSchema = new Schema({
 lat:{type: Number},
 lng: {type: Number},
 name: {type: String},
 description: {type: String},
 address: {type: String},
 time: {type: String},
 input: {type: Object},
 members: {type: Array},
 locationOwner: {type: String},
 dateCreated: {type: Date, default: Date.now}
})

const userModel = mongoose.model('user', userSchema)
const locationModel = mongoose.model('location', locationSchema)


app.route('/register')
    .post(function(req, res){
        console.log(req.body)
        // userModel.find({email: email}, function(err, doc){
        //     if(!err){
        //         res.json('user exists')
        //     }
        // })
        
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
        console.log(req.body)
        locationModel.create(req.body, function(err, doc){
            if(!err){
                res.json('location created')
            } else{
                res.json('error')
            }
        })
    })

app.route('/locationDetails')
    .post(function(req, res){
        console.log(req.body)
        locationModel.findOne({_id: req.body.locationId}, function(err, doc){
            console.log('details')
            res.json(doc)
        })
    })

app.route('/delete')
    .post(function(req, res){
        console.log(req.body)
        locationModel.findOneAndDelete({_id: req.body.locationId}, function(err, doc){
            console.log('item deleted')
            res.json(doc)
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