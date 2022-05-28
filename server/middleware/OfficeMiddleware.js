const Floor = require("../models/Floor");
const Desk = require("../models/Desk");
const isStringInvalid = require("./isStringInvalid");
const Office = require("../models/Office");
const User = require("../models/User");


const validateOfficeCreation = (req, res, next) =>{
    try {
        
        const { Address, Name, Telephone } = req.body;
        if( isStringInvalid(Address) || isStringInvalid(Name) || isStringInvalid(Telephone) )
            return res.status(400).json({msg: "missing information from request body"});
        next();
        
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}
const addDeskToReq =  async (req, res, next) => {
    try {
        if (!req.params.deskID)
            return res.status(400).json({msg:"deskID missing from request"});
        const desk = await Desk.findById(req.params.deskID);
        if(!desk)
            return res.status(400).json({msg:"desk was not found in DB"});
        req.desk = desk;
        next();
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

const isDeskAssignable = async (req, res, next) =>{
    try {
        
        if(req.desk.Bookable)
            return res.status(400).json({msg: "this desk can't be permanently assigned"});
        if(req.desk.Owner != null)
            return res.status(400).json({msg: "this desk was already asigned to someone, pleasue unasign it"});
        next();

    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
}

const removeDeskFromUser = async (req, res, next) =>{
    try {
        if(req.desk.owner != null)
         {
            const user = await User.findById(desk.Owner);
            if(user)
            {
                user.Desk = null;
                await user.save();
            }
         }
         next();
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }
}

const validateFloorCreation = (req, res, next) =>{
    try {
        //image is sent as a based64 String
        const { Name, Image, Desks } = req.body;
        //console.log(typeof Desks);
        if( isStringInvalid(Name) || isStringInvalid(Image) || typeof Desks != "object" || Object.keys(Desks).length === 0)
            return res.status(400).json({msg: "missing information from request body"})
        next();
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

const addOfficeToRequest =  async (req, res, next) =>{
    try {
        if(!req.params.officeID)
            return res.status(400).json({msg:"office id  was missing from request"});
        const office = await Office.findById(req.params.officeID);
        if(!office)
            return res.status(400).json({msg: "office was not found in database"});
        req.office = office;
        next();

    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}


module.exports = { validateOfficeCreation, validateFloorCreation, addOfficeToRequest, addDeskToReq, isDeskAssignable, removeDeskFromUser  }