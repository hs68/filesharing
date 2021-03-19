const router=require("express").Router();
const multer=require("multer");
const path=require("path");
const File=require("../model/file");
const {v4:uuid4}= require('uuid');

let storage = multer.diskStorage({
    destination:(req,file,cb)=> cb(null,'uploads/'),
    filename:(req,file,cb)=>{
        const uniqueName=`${Date.now()}-${Math.round(Math.random()* 1E9)}${path.extname(file.originalname)}`;
        cb(null,uniqueName);
    }
})

let upload= multer({
    storage:storage,
    limit:{
        fileSize:1000000 * 100,
    },
}).single('myfile');


router.post("/",(req,res)=>{
    upload(req,res,async(err)=>{
        console.log("here");
        if(!req.file)
        return res.send({error:"all requried feilds d"});
        if(err)
        return res.status(500).send({error:err.message});

        const file =new File({
            filename:req.file.filename,
            uuid:uuid4(),
            path:req.file.path,
            size:req.file.size
        });
        const response=await file.save();
        return res.json({file:`${process.env.APP_BASE_URL}/files/${response.uuid}`});
    });

});
router.post("/send",async(req,res)=>{
    const {uuid,emailto,emailfrom}=req.body;
    if(!uuid || !emailto || !emailfrom)
    {
        return res.status(422).send({error:"All feild are required"});
    }
    const file= await File.findOne({uuid:uuid});
    
    if(file.sender)
    {
        return res.status(422).send({error:"emai already sent"});
    }

    file.sender=emailfrom;
    file.receiver=emailto;
    const response= await file.save();

    const sendMail=require("./services/email");
    sendMail({
        from:emailfrom,
        to:emailto,
        subject:"file sharing",
        text:`${emailfrom} shared a file`,
        html:require('./services/emailtemplate')({
            emailFrom:emailfrom,
            downloadLink:`${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size:parseInt(file.size/1000) +'KB',
            expires:'24 hours'
        })
    });
    return res.send({sucess:"true"})
})
module.exports=router;
