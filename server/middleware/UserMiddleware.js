const User = require("../models/User");
const bcrypt = require("bcrypt");
const isStringInvalid = require("./isStringInvalid");
var cron = require("node-cron");


const addOwnAccToReq =  async (req, res, next ) =>{
    try {

        const user = await User.findById(req.auth._id);
        if(!user)
            return res.status(400).json({msg: "user was not found"});
        req.auth = user;
        next();
        
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
    
}
const addUsertoReq = async ( req, res, next ) =>{
    try {

        if(!req.body.user)
            return res.status(400).json({msg:"missing user id from request"});

        const user = await User.findById(req.body.user)
        if(!user)
            return res.status(400).json({msg:"User was not found"});
        req.user = user;
        next();
        
        
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);   
    }
}

const checkIFEmailAlreadyUsed = async ( req, res, next ) =>{
    try {

        if(!req.body.email)
            return res.status(400).json({msg:"email missing from request"});
        const user = await User.findOne({email:req.body.email.trim().toLowerCase()});
        if(user)
           return res.status(400).json({msg: "User already exists"});
        next();

    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}
const checkIfAdmin = async ( req, res, next ) =>{
    try {
        
        if(!req.auth.admin)
            return res.status(400).json({msg: "missing rights"});
        next();

    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}
const checkIfInitialPass = async ( req, res, next ) =>{
    try {
        console.log.
        if(req.auth.initialPass)
            return res.status(400).json({msg: "account creation process not finished, initial password must be changed"});
        next();
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);   
    }
}

const validateRegisterReq =  async ( req, res, next ) =>{
    try {

        const { email, password, firstName, lastName } = req.body;
        if(isStringInvalid(email) || !(email.includes("@")) || isStringInvalid(password) || isStringInvalid(firstName) || isStringInvalid(lastName))
            return res.status(400).json({msg: "missing or invalid data in request body"});
        next();
        
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

function dateTimeToCronExp(date){
    if(date instanceof Date)
    {
        const minutes = date.getMinutes();
        const hours = date.getHours();
        const days = date.getDate();
        const months = date.getMonth() + 1;
        const dayOfWeek = date.getDay();

        console.log(`${minutes} ${hours} ${days} ${months} ${dayOfWeek}`);
    
        //return `${minutes} ${hours} ${days} ${months} ${dayOfWeek}`;
    }
    else
    {
        console.log("not a date");

    }
    return null;
   

}

const validateLogin = async ( req, res, next ) =>{
    try {
        
        const { email, password } = req.body;

        if( isStringInvalid(email) || isStringInvalid(password) )
            return res.status(400).json({msg: "missing or invalid data in request"});
        
        const user = await User.findOne({email: email.trim().toLowerCase()});

        if(!user)
            return res.status(400).json({msg: " user was not found "})

        if (!(await bcrypt.compare(password.trim(), user.password)))
            return res.status(400).json({msg: "invalid credentials pair"});
        
        req.user = user;
        next();

    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

const validatePasswordChange = async ( req, res, next ) =>{
    try {

        const { password , token } = req.body;
        if (isStringInvalid(password))
            return res.status(400).json({msg: "missing or invalid password"});
        if(token != req.auth.resetKey)
            return res.status(400).json({msg: "the reset token was incorrect"});
        next();
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }


}




module.exports = { validatePasswordChange, addOwnAccToReq, addUsertoReq, checkIfAdmin, checkIfInitialPass, checkIFEmailAlreadyUsed, validateRegisterReq, validateLogin };