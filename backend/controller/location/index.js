
const locationModel = require('../../model/location')
const getAll = (req, res) =>{
    locationModel.find({}, function (err, doc){
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
    const {locationId, name, address, description, lat, lng, time} = req.body
    locationModel.updateOne({_id: locationId}, {
        name: name,
        address: address,
        time: time, 
        description: description,
        lat: lat,
        lng: lng,
    }, (err, doc)=>{
        res.json(doc)
    })
}

const deleteLocation = (req, res) => {
    console.log(req.body)
    locationModel.findOneAndDelete({_id: req.body.locationId}, function(err, doc){
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
    locationModel.updateOne({_id: locationId}, {members: members}, (err, doc)=>{
        res.json(doc)
    })
}


module.exports = {
    getAll: getAll,
    createLocation: createLocation,
    editLocation: editLocation,
    deleteLocation: deleteLocation,
    locationDetails: locationDetails,
    joinLocation: joinLocation
}