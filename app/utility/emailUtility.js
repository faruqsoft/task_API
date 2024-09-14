import nodemailer from "nodemailer"
import { EMAIL_HOST, EMAIL_PASS, EMAIL_PORT, EMAIL_SECURITY, EMAIL_USER } from "../config/config.js"
import { text } from "express"

const sendEmail = async(emailTo,emailText,emailSubject)=>{

    let transporter = nodemailer.createTransport({

        host:EMAIL_HOST,
        port:EMAIL_PORT,
        secure:EMAIL_SECURITY,
        auth:{
            user:EMAIL_USER,
            pass:EMAIL_PASS
        },
        tls:{
                rejectUnauthorized:false
        }


    })

    let mailOption = {
        from:'Task maneger MERN <info@teamrabbil.com>',
        to:emailTo,
        subject:emailSubject,
        text:emailText
    }
    return await transporter.sendMail(mailOption)

}


export default sendEmail;
