const express = require('express');
const mongodb = require('mongodb');
const bodyparser = require('body-parser');
const dotenv = require('dotenv').config();
let cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyparser.json());
var randomstring = require("randomstring");
const dburl = process.env.db_url;

app.get('/',async(req,res)=>{
    res.status(200).json({msg:'connected'});
})
app.get('/tickets',async(req,res)=>{
    let connection;
    try{
         connection = await mongodb.MongoClient.connect(dburl);
        let db = connection.db('studentdb');
        let data=await db.collection('tickets').find().toArray();
        res.json(data);
        console.log(connection);
        await connection.close();
    }
    catch(error){
        console.log(connection);
        if(!connection){
          await connection.close();
         console.log(error);
        res.status(500).json(error);
        }
    }
})

app.post("/ticket",async(req,res)=>{
    let connection;
    try{
        
        connection=await mongodb.MongoClient.connect(dburl);
        let db = connection.db('studentdb');
        //await db.collection('mentors').insertOne(req.body);
        let id = randomstring.generate(7);
        await db.collection('tickets').insertOne({name:req.body.name,agent:req.body.agent,pnr:id,date:req.body.date});
        await connection.close();
        //console.log('hii'+' '+req.body.students);
        res.status(200).json({
            message:"data inserted"
        });
    }
    catch(err){
        res.status(500).json(err);
    }
})

app.get('/tickets/:agent',async(req,res)=>{
    let connection;
    try{
         connection = await mongodb.MongoClient.connect(dburl);
        let db = connection.db('studentdb');
        let data=await db.collection('tickets').findOne({agent:req.params.agent});
        res.json(data.agent);
        //console.log(connection);
        await connection.close();
    }
    catch(error){
        console.log(connection);
        if(!connection){
         // await mongodb.close();
         console.log(error);
        res.status(500).json(error);
        }
    }
})


app.listen(process.env.PORT || 5000,()=>{
    console.log(dburl);
});