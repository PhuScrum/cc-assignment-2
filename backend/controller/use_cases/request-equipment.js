const locationModel = require('../../model/location')
const axios = require('axios')
const locationUrl = 'http://localhost:8080/locationDetails'
const requestEquipment = async (req, res) =>{
    const{locationId, userEmail, toolKit, Tshirt, fullSet} = req.body
    var response = await axios.post(locationUrl, {locationId: locationId})
    var reqTool = response.data.requestedTools
    console.log(req.body, response.data)
    var newToolRequest = {
        toolKit: toolKit,
        Tshirt: Tshirt, 
        fullSet: fullSet
    }
    console.log('reqTool:', reqTool)
    Object.assign(reqTool, {[userEmail]: newToolRequest});
    console.log(req.body, response.data, reqTool)
    locationModel.updateOne({_id: locationId},{
        requestedTools:  reqTool
    }, (err, doc)=>{
        if(!err){
            res.json(doc)
        }else{
            console.log('req equipment error: ', err)
        }
    })
}

module.exports = requestEquipment