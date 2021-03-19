const router=require("express").Router();
const File=require("../model/file");

router.get("/:uuid",async(req,res)=>{
    try{
        const file=await File.findOne({uuid:req.params.uuid});
        if(!file)
        {
            res.render('download',{error:"Something went wrong"});   
        }
        return res.render('download',{
            uuid:file.uuid,
            fileName:file.filename,
            filesize:file.size,
            download:`${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        });
    }catch(err){
        res.render('download',{error:"Something went wrong"});
    }
});

module.exports=router;