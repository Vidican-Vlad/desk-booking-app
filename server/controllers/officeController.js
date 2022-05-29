const Office = require("../models/Office");
const Floor = require("../models/Floor");
const Desk = require("../models/Desk");
const isStringInvalid = require("../middleware/isStringInvalid");
const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const moment = require("moment");
moment().format();




const createOffice = async (req, res) =>{
    try {
        
        const office = await Office.create({
            Address: req.body.Address.trim(),
            Name: req.body.Name.trim(),
            Telephone: req.body.Telephone.trim()
        })
        return res.status(200).json(office);
        
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

const assignDesk = async (req, res) => {
    try {
        
        const user = req.user;
        const desk = req.desk;
        if(user.desk == desk._id && desk.Owner == user._id)
            return res.status(400).json({msg: "desk was already assigned to this user"});
        user.desk = desk._id;
        desk.Owner = user._id;
        await Promise.all( [user.save(), desk.save()]);
        return res.status(200).json({msg: "desk was now assigned"});

    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

const unassignDesk = async (req, res) => {
    try{

        const desk = req.desk;
        if(desk.Owner == null)
           return res.status(400).json({msg: "desk was already empty"});
        desk.Owner = null;
        await desk.save();
        return res.status(200).json({msg: "assignemnet removed, desk is now free"});

    } catch (err){
        console.log(err);
        return res.status(400).json(err);
    }
}
const makeDeskAssignable = async (req, res) => {
    try {

        const desk = req.desk;
        if(!desk)
            return res.status(400).json({msg: "account was already assignable"})
        desk.Bookable = false;

        //to be implemented, remove all bookins for that desk
        await desk.save();
        return res.status(200).json({msg: "desk is now assignable!"});

        
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
}

const makeDeskBookable = async (req, res) => {
    try{
        
        const desk = req.desk;
        if(desk)
            return res.status(400).json({msg: "desk was already bookable"});
        
        desk.Bookable = true;
        await desk.save();
        return res.status(200).json({msg: "desk is now bookable!"});

    } catch(err) {
        console.log(err)
        res.status(400).json(err);
    }

}
const getAllOffices = async (req, res) => {
    try{

        const offices = await Office.find({});
        return res.status(200).json(offices);

    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }

}

const getSpecificOffice = async (req, res) =>{
    try{
        const floors = await Floor.find({OfficeID:req.office._id});
        const office = req.office.toObject();
        console.log(office);
        
        const result = { ...office, floors};
        res.status(200).json(result)

    }catch(err)
    {
        console.log(err);
        return res.status(400).json(err);
    }
}

const bookDesk = async (req, res) =>{
    try {
        const booking = await Booking.create({
            desk:req.desk._id,
            Owner:req.auth._id,
            Date: req.body.date
        })
        if(!Booking)
            res.status(400).json({msg:"There was a problem with booking this desk"});
        return res.status(200).json(booking);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }

}
const getFloor = async (req, res) =>{
    try {

        let desks = await Desk.find({FloorID: req.floor._id});
        desks = desks.map(el => {
           return {
               _id: el._id,
                name: el.Name,
                shape: "poly",
                preFillColor: "Green",
                fillColor: "Blue",
                Bookable: el.Bookable,
                Owner: el.Owner,
                coords: [
                    el.upLeft.x, el.upLeft.y,
                    el.downLeft.x, el.downLeft.y,
                    el.downRight.x, el.downRight.y,
                    el.upRight.x, el.upRight.y
                ]
            };
        })
        const result = { ...req.floor.toObject(), areas: desks};
        return res.status(200).json(result);
        
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }

}

const cancelBooking = async (req, res) =>{
    try {
  // console.log(!(req.auth.admin));
        console.log(req.auth)
        if(req.booking.Owner != req.auth._id && !(req.auth.admin))
            return res.status(400).json({msg: "you do not have the permission to cancel this booking"})
        await Booking.findByIdAndDelete(req.booking._id);
        return res.status(200).json({msg: "booking was cancelled successfully!"});

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
                downLeft: desk.downLeft,
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


module.exports = { createOffice, createFloor, getAllOffices, getSpecificOffice, assignDesk, makeDeskBookable, makeDeskAssignable, unassignDesk, bookDesk, getFloor, cancelBooking }