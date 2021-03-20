const express=require("express");
const app=express();
const port=process.env.PORT || 8080;
const hbs=require("hbs");
require("./db/conn");
require("dotenv").config();

app.use(express.json());

app.set('view engine','hbs');
app.get("",(req,res)=>{
    res.send("hiii i am here");
});
app.use("/api/files",require("./route/files"))
app.use("api/files/send",require("./route/files"));
app.use("/files",require("./route/show"));
app.use("/files/download",require("./route/download"));

app.listen(port,()=>{
    console.log(port);
});
