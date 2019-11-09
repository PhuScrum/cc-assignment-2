const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')

app.use(cors())
app.use(helmet())
app.use(express.static(path.join(__dirname, '/build')))
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.route('/hello')
    .get((req, res) => {
        res.status(200).send('Hello world AWS Beanstalk deployment ES6')
    })


app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build/index.html'))
    })


var port = process.env.PORT || 3000
app.listen(port)
console.log("server starting at port" + port)