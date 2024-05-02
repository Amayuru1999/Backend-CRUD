const express=require('express')
const mongoose =require('mongoose')
const app=express()
const Product=require('./models/productModel')
require('dotenv').config();

app.use(express.json())

const mongoURL=process.env.MONGODB_URL;

mongoose.connect(mongoURL)
    .then(()=>{
        console.log("Connected to MongoDB")
    })
    .catch(err=>{
        console.error('Error connecting to MongoDB:',err.message)
    })

//routes
app.get('/',(req,res)=>{
    res.send('Hello NODE API')
})

app.get('/blog',(req,res)=>{
    res.send('Hello Blog,My name is Amayuru')
})

app.get('/product',async(req,res)=>{
    try{
        const products=await Product.find({});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message:error.message})
    }

})

app.get('/product/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const product=await Product.findById(id);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

app.post('/product',async(req,res)=>{
    try{
        const product=await Product.create(req.body)
        res.status(200).json(product);
    }catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.listen(4000,()=>{
    console.log(`Node API app is running on port 4000`)
})