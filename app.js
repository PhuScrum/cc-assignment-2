const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')

const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');


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
const uploads3 = require('./backend/controller/user/uploads3')

app.route('/register')
    .post(user_API.register)

app.route('/login')
    .post(user_API.login)


const redis = require('redis')
// const redisClient = redis.createClient(process.env.PORT || 6379)

// cache location details
function cacheLocation(req, res, next){
//     redisClient.get("allLocation", function(err, reply) {
//         if(err) console.log(err)
//         else if(reply){
//             // reply is null when the key is missing
//             console.log('Reply: ', reply);
//             console.log('Type of reply: ', typeof(reply));
//             var result = JSON.parse(reply)
//             res.json(result)
//         } else{
//             next()
//         }


// });
}
app.get('/location', location_API.getAll)
app.route('/location')
    .post(location_API.createLocation)
    .put(location_API.editLocation)
    .delete(location_API.deleteLocation)
app.route('/location/:locationId')
    .delete(location_API.deleteLocation)

    // Define POST route
app.post('/upload', (request, response) => {
    const form = new multiparty.Form();
      form.parse(request, async (error, fields, files) => {
        if (error) {
            console.lpg('error message upload');
            throw new Error(error);
        } 
        try {
          const path = files.file[0].path;
          const buffer = fs.readFileSync(path);
          const type = fileType(buffer);
          const timestamp = Date.now().toString();
          const fileName = `${timestamp}-lg`;
          const data = await uploads3.uploadFile(buffer, fileName, type);
          console.log(data);
          return response.status(200).send(data);
        } catch (error) {
          return response.status(400).send(error);
        }
      });
  });



// cache fetch user by email info.
function cache(req, res, next){
    const {userEmail} = req.body
    // console.log('userEmail of Cache: ',userEmail)
    redisClient.get(userEmail, (err, data)=>{
        if(err) throw err;
        if(data !== null){
            // console.log('data response of Cache: ', data)
            res.json(data)
        } else{
            next()
        }
    } )
}

// fetching location details
app.post('/locationDetails', location_API.locationDetails)

app.post('/fetchUserByEmail',user_API.fetchUserByEmail)

// both join and unjoin can use this function.
app.route('/joinLocation')
    .post(location_API.joinLocation)

app.route('/input')
    .post(location_API.addInput)

    

app.route('/hello')
    .get((req, res) => {
        res.status(200).send('Hello world AWS Beanstalk deployment ES6')
    })


// app.get('/*', (req, res) => {
//         res.sendFile(path.join(__dirname, 'build/index.html'))
//     })


var port = process.env.PORT || 8082
app.listen(port)
console.log("server starting at port" + port)