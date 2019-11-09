const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const path = require('path')

app.route('/hello')
    .get(function(req, res){
        res.status(200).send('Hello world AWS Beanstalk deployment')
    })

var PORT = 3000
app.listen(PORT)
console.log("server starting at port" + PORT)