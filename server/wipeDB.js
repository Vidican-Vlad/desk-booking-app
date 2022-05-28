require("dotenv").config();
require("./config/database.js").connect();

const User = require("./models/User");

wipeDB();

async function wipeDB()
{
    try {

         await User.remove({});
         console.log("all users were removed from db");
        
    } catch (error) {
        console.log(error);
    }
}
