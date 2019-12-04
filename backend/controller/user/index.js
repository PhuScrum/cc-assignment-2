const userModel = require('../../model/user')

const register = (req, res) =>{
    console.log(req.body)
    userModel.create(req.body, function(err, doc){
        if(!err){
            res.json('register success')
        } else{
            res.json('error')
        }
    })
}

const login = (req, res) =>{
    const {email} = req.body
    userModel.find({email: email}, function(err, doc){
        if(!err){
            res.json('registered user')
        } else{
            res.json('first time sign in user')
        }
    })
}


const redis = require('redis')
const redisClient = redis.createClient(process.env.PORT || 6379)

const fetchUserByEmail = (req, res) =>{
    const {userEmail} = req.body
    console.log('fetch user by email: ', userEmail)
    userModel.findOne({email: userEmail}, (err, doc)=>{
        if(!err){
            // set Data to redis
            redisClient.setex(userEmail, 60, doc)
            res.json(doc)
        }
        else
            console.log(err)
    })
}


module.exports ={
    register: register,
    login: login,
    fetchUserByEmail: fetchUserByEmail
}