
const locationModel = require('../../model/location')
const redis = require('redis')
// const redisClient = redis.createClient(process.env.PORT || 6379)


const getAll = (req, res) =>{
    locationModel.find({}, function (err, doc){
        console.log('type of doc: ', typeof(doc))
        var docJsonValue = JSON.stringify(doc)
        // redisClient.setex('allLocation', 60, docJsonValue)
        res.json(doc)
    }) 
}

const createLocation = (req, res) =>{
    console.log(req.body)
    locationModel.create(req.body, function(err, doc){
        if(!err){
            res.json('location created')
        } else{
            res.json('error')
        }
    })
}

const editLocation = (req, res)=>{
    console.log('edit location: ', req.body)
    const {locationId, name, address, description, lat, lng, time, organiserName, 
        organiserLogo, organiserSlogan, organiserDescription, organiserEventPhoto,locationInternalOrExternal, startDate, endDate
    } = req.body
    locationModel.updateOne({_id: locationId}, {
        name: name,
        address: address,
        time: time, 
        description: description,
        lat: lat,
        lng: lng,
        organiserName: organiserName,
        organiserLogo: organiserLogo,
        organiserSlogan: organiserSlogan,
        organiserDescription: organiserDescription,
        organiserEventPhoto: organiserEventPhoto,
        locationInternalOrExternal: locationInternalOrExternal,

        startDate: startDate +'',
        endDate: endDate+''
    }, (err, doc)=>{
        res.json(doc)
    })
}

const payLocation = (req, res)=>{
    console.log('edit location: ', req.body)
    const {locationId, payStatus} = req.body
    locationModel.updateOne({_id: locationId}, {
        payStatus: payStatus
    }, (err, doc)=>{
        res.json(doc)
    })
}

const deleteLocation = (req, res) => {
    console.log('delete location', req.body)
    locationModel.findOneAndDelete({_id: req.params.locationId}, function(err, doc){
        console.log('item deleted')
        res.json(doc)
    })
}

const locationDetails = (req, res) =>{
    console.log(req.body)
    locationModel.findOne({_id: req.body.locationId}, function(err, doc){
        console.log('details')
        res.json(doc)
    })
}

const joinLocation = (req, res) =>{
    const {locationId, members}= req.body
    console.log('members joined: ' , members)
    locationModel.updateOne({_id: locationId}, {members: members}, (err, doc)=>{
        res.json(doc)
    })
}

const addInput = (req, res) =>{
    console.log(req.body)
    const {locationId, input} = req.body
    locationModel.updateOne({_id: locationId}, {input: input}, (err, doc)=>{
        res.json(doc)
    })
}




module.exports = {
    getAll: getAll,
    createLocation: createLocation,
    editLocation: editLocation,
    deleteLocation: deleteLocation,
    locationDetails: locationDetails,
    joinLocation: joinLocation,
    addInput: addInput,
    payLocation: payLocation
}