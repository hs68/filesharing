const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/shared",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("s");
}).catch((err)=>{
    console.log("N");
});