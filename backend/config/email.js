 import nodemailer from "nodemailer";
//import sgMail from "@sendgrid/mail";

export const sendEmail = async (to,sub,html)=>{
    try{

        const transporter = nodemailer.createTransport({
            service:"gmail",
            secure:false,
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }
        });

        const info = await transporter.sendMail({
            from:process.env.EMAIL_USER,
            to,
            subject:sub,
            html
        });

        console.log("Email sent:",info.response);

    }catch(err){
        console.log("Email sending failed:",err.message);
    }
};



