const nodemailer=require("nodemailer");

async function sendMail ({from,to,subject,text,html}){
    let transporte= nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        secure:false,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }


    });

    let info =await transporte.sendMail({
        from:from,
        to:to,
        subject:subject,
        text:text,
        html:html
    })
}

module.exports=sendMail;
