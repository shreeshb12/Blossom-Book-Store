const express=require('express');
const app=express();
const Book=require('./models/book');
const db=require('./config/mongoose');
const cors=require('cors');
// handles post requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//cors policy doesn't allow to send the data to another server
app.use(cors());
//middleware
app.use('/',require('./routes/book-routes'));
app.listen(5000,(err)=>{
    if(err) {
        console.log(err);
        return}
    console.log("Listening at port : 5000 ...");
})