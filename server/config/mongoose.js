const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://Shreesh:shreesh%4018@bookwormdb.xfvuegk.mongodb.net/?retryWrites=true&w=majority");
const db=mongoose.connection;

db.on('error',(err)=>{
    console.log("Error when connecting to DB"+err);
})

db.once('open',()=>{
    console.log("Connected to DB");
})

module.exports=db;