const express = require('express');
const cors = require('cors');
const app = express()

app.use(cors())
app.use(express.json())
require('dotenv').config()

// jnQsvQ5T8Z13wOcM
// Resale


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
const e = require('cors');
const uri = `mongodb+srv://${process.env.USER_Name}:${process.env.USER_PASS}@cluster0.xuxoczf.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const catagoryCollction = client.db('Resale').collection('catagory')
const ProductsCollction = client.db('Resale').collection('Products')
const bookingCollction = client.db('Resale').collection('booking')
const usersCollction = client.db('Resale').collection('users')


async function run() {
  try {
    app.get('/catagory', async (req, res) => {
      const qurey = {}
      const result = await catagoryCollction.find(qurey).toArray()
      res.send(result)

    })
    app.get('/catagory/:id',async(req,res)=>{
      const id =req.params.id;
      const qurey={catagoryId:id}
      const result =await ProductsCollction.find(qurey).toArray()
      res.send(result)
    })
    app.post('/booking',async(req,res)=>{
      
      // const booking=req.body;
      // const qurey ={
      //   email:booking.email
      // }
      // const alreadybook =await bookingColltion.find(qurey).toArray()
      //       if(alreadybook.length){
      //           const meass ='you already have a booking'
      //           return res.send({acknowledged : false, meass})
      //       }
      const result=await bookingCollction.insertOne(booking)
      res.send(result)
    })
    app.get('/booking',async(req,res)=>{
      const email =req.query.email
      console.log(email)
      const query ={email:email}
      const result =await bookingCollction.find(query).toArray()
      res.send(result)
    })

    app.post('/users',async(req,res)=>{
      const users =req.body;
      const result =await usersCollction.insertOne(users)
      res.send(result)
    })



  }
  finally {

  }

}
run().catch(error => console.error(error))



const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('helo Word')
})
app.listen(port, () => {
  console.log('server is running')
})