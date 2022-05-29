const nodemailer = require("nodemailer");
require("dotenv").config();

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "89d2b94895d482",
      pass: "cbd1727e3c36c0"
    }
  });

  const sendWelcomeEmail = async (mail, firstName, password) =>{
     try {
        const html= `<div style="background-color:grey;text-align:center;padding:10px 10px 10px 10px;color:white;">
        <h3> Hello ${firstName} <h3>
         <p>your account was created by one of our administrators, the steps in order to connect and set up your account are</p>
         <p> connect with your email and this temporary password:  ${password} for the first time, after login you will be required to change your password for security reasons </p>
         <p> after requesting a password reset you should receive an email with  a secret key you will need in order to complete the password change process </p>
         <p>kind regards, the Desk Booking Staff</p>
    </div>`
        await transport.sendMail({
                from: `Desk Booking staff <smtp.mailtrap.io>`,
                to:mail,
                subject: "Credentials have arrived",
                text:"",
                html:html
        })
         
     } catch (err) {
         console.log(err);
     }
  }
  const sendResetToken = async (mail, firstName, token) =>{
    try {
       const html= `<div style="background-color:grey;text-align:center;padding:10px 10px 10px 10px;color:white;">
       <h3> Hello ${firstName} <h3>
        <p>here is your password reset token: ${token}, it will expire in a few minutes, so please complete the procedure now if you can, however, in case it expires feel free to request the password reset again</p>
        <p>kind regards, the Desk Booking Staff</p>
   </div>`
       await transport.sendMail({
               from: `Desk Booking staff <smtp.mailtrap.io>`,
               to:mail,
               subject: "reset token have arrived",
               text:"",
               html:html
       })
        
    } catch (err) {
        console.log(err);
    }
 }



module.exports = { sendWelcomeEmail, sendResetToken };