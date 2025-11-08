const nodemailer = require("nodemailer");

module.exports = async(email, subject, htmlContent)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
        },
        })
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: subject,
            html: htmlContent,
        })
        console.log("Email sent Successfully",email);
    }catch(err){
        console.log("Email not send", err);
    }
}