const express=require('express');
const app=express();
const Book=require('./models/book');
const db=require('./config/mongoose');
const path=require('path');
const cors=require('cors');
// handles post requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//cors policy doesn't allow to send the data to another server
app.use(cors());
app.use('/api',require('./routes/book-routes'))
app.use(express.static(path.resolve((__dirname),"client","build")));
//middleware
app.get('/',(req,res,next)=>{
    res.sendFile(path.resolve((__dirname),"client","build","index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,(err)=>{
    if(err) {
        console.log(err);
        return}
    console.log("Listening at port :"+PORT);
})