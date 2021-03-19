const express=require("express");
const app=express();
const port=process.env.PORT || 3000;
const hbs=require("hbs");
require("./db/conn");
require("dotenv").config();
app.get("",(req,res)=>{

});
app.use(express.json());
app.set('view engine','hbs');
app.use("/api/files",require("./route/files"))
app.use("api/files/send",require("./route/files"));
app.use("/files",require("./route/show"));
app.use("/files/download",require("./route/download"));
app.listen(port,()=>{
    console.log(port);
});
