const router=require("express").Router();
const File=require("../model/file");

router.get("/:uuid",async(req,res)=>{
    
       console.log(req.params.uuid);
        const file=await File.findOne({uuid:req.params.uuid});
        if(!file)
        {
            return res.render('download',{
                error:"error while downloading"
            });

        }
        console.log(file);
        const filepath=`${__dirname}/../${file.path}`;
        res.download(filepath);
   
    
});

module.exports=router;