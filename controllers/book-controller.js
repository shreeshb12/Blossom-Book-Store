const Book=require('../models/book');

module.exports.getAllBooks=async (req,res)=>{
    let allBooks;
    try{
        allBooks=await Book.find();
        res.status(200).json({"count":allBooks.length,"Books": [...allBooks]});
    }
    catch(err){
       res.send(err);
    }
}

module.exports.addBook= async (req,res)=>{
    console.log(req.body);
    const {name,author,description,price,available,image} = req.body;
    let book=new Book({
        name,
        author,
        description,
        price,
        available,
        image
    });
    try{
        let resp= await book.save()
        res.status(201).json({
                "message":"Created",...resp._doc,
        });
    }
    catch(err){
        res.status(500).json({
            "message":"Internal Server Error",...err
        })
    }
}

module.exports.getById=async (req,res)=>{
    const id=req.params.bookId;
    try{
    let book=await Book.findOne({_id:id});
    res.status(200).json({
        ...book._doc
    })
    }
    catch(err)
    {
        res.status(500).json(...err);
    }
}

module.exports.update=async (req,res)=>{
    const id=req.params.bookId;
    const {name,author,description,price,available,image}=req.body;
    let book;
    try{
            book = await Book.findByIdAndUpdate(id,{
            name,
            author,
            description,
            price,
            available,
            image
        },{new:true})
        if(!book)
        {
            res.status(404).json({
                "message":"Book Not Found"
            })
        }
        else{
            res.status(200).json({
                "message":"Updated",...book._doc
            })
        }
        
    }
    catch(err){
        res.status(500).json({
            "message":"Intetnal server error",...book
        })
    }
}

module.exports.deleteBook=async(req,res)=>{
    const id=req.params.bookId;
    try{
        let book=await Book.findByIdAndDelete(id);
        if(book!=null)
            res.status(203).json({message:"Book Deleted"})
        res.status(404).json({message:"Book Not Found"});
    }
    catch(err)
    {
        res.status(500).json({message:"Internal Server Error"});
    }
}