const Office = require("../models/Office");
const Floor = require("../models/Floor");
const Desk = require("../models/Desk");
const isStringInvalid = require("../middleware/isStringInvalid");



const createOffice = async (req, res) =>{
    try {
        
        const office = await Office.create({
            Address: req.body.Address.trim(),
            Name: req.body.Name.trim()
        })
        return res.status(200).json(office);
        
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

const createFloor = async (req, res) =>{
    try {
        promises = [];
        const floor = await Floor.create({
            Name: req.body.Name,
            Image: req.body.Image,
            OfficeID: req.office._id  
        })

        req.body.Desks.forEach(el => {
            let temp = createDeskPromise(el, req.office._id, floor._id);
            if(temp)
                {
                    //console.log(temp);
                    promises.push(temp);
                }
        })
        await Promise.all(promises);
        return res.status(200).json(floor);
        
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

async function createDeskPromise(desk, OfficeID, FloorID){
    if(validateDesk(desk))
        {
            //console.log("e ok");
            return Desk.create({
                Name:desk.name,
                OfficeID: OfficeID,
                FloorID: FloorID,
                Bookable: true,
                upLeft: desk.upLeft,
                upRight: desk.upRight,
                downLeft: desk.downRight,
                downRight: desk.downRight
            })
        }
        return null
}

function validateDesk(desk){
    //console.log(desk);
    //console.log(isStringInvalid(desk.name, 3));
    if(!desk || !desk.name || typeof desk != "object" || isStringInvalid(desk.name, 3))
            return false;
    if( !validatePoint(desk.upLeft) || !validatePoint(desk.upRight) || !validatePoint(desk.downLeft) || !validatePoint(desk.downRight) )
        return false;
    return true;
}   

function validatePoint(point)
{
    if(!point || typeof point != "object" || !point.x || !point.y)
        return false;
    return true;
}


module.exports = { createOffice, createFloor  }