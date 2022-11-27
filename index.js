const express = require('express');
const cors = require('cors');
const app = express()
const jwt = require('jsonwebtoken');

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

function veryfyJwt (req,res,next){
  const authHeader=req.headers.authorization
  if(!authHeader){
      return res.status(401).send('unauthzied acces')
  }
  const token =authHeader.split(' ')[1]
  jwt.verify(token,process.env.ACCESS_TOKEN,function(err,decoded){
      if(err){
          return res.status.send({maeasss: 'forbeden access'} )
      }
      req.decoded=decoded
      next()
  })

}

const adminVeriy= async(req,res,next,)=>{
  const decodedEmail =req.decoded.email;
const qurey={email :decodedEmail}
const user =await usersColltion.findOne(qurey)
if(user?.role !== 'admin'){
  return res.status(403).send({maeasss:'forbedden access'})
}
  next()
}

async function run() {
  try {
    app.get('/catagory', async (req, res) => {
      const qurey = {}
      const result = await catagoryCollction.find(qurey).toArray()
      res.send(result)

    })
    app.post('/products',async(req,res)=>{
      const product =req.body;
      const result =await ProductsCollction.insertOne(product)
      res.send(result)
    })
    app.get('/products',async(req,res)=>{
      const email=req.query.email
      const qurey={sellerEmail:email}
      const result=await ProductsCollction.find(qurey).toArray()
      res.send(result)
    })
    
    app.get('/products/:id', async(req,res)=>{
      
      
      
      const id =req.params.id;
      const qurey={catagoryId:id}
      const result =await ProductsCollction.find(qurey).toArray()
      res.send(result)
    })
    app.post('/booking',async(req,res)=>{
      
      const booking=req.body;
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
    app.get('/booking',veryfyJwt,async(req,res)=>{
      const email =req.query.email
      const query ={email:email}
      const result =await bookingCollction.find(query).toArray()
      res.send(result)
    })

    app.post('/users',async(req,res)=>{
      const users =req.body;
      const result =await usersCollction.insertOne(users)
      res.send(result)
    })
    app.put('/users/admin/:id',async(req,res)=>{
      // const decodedEmail =req.decoded.email;
      // const qurey={email :decodedEmail}
      // const user =await usersColltion.findOne(qurey)
      // if(user?.role !== 'admin'){
      //     return res.status(403).send({maeasss:'forbedden access'})
      // }



      const id =req.params.id;
      const filter ={_id:ObjectId(id)}
      const option ={upsert: true}
      const updatedoc ={
          $set :{
              role: 'admin'

          }
      }
      const result =await usersCollction.updateOne(filter,updatedoc,option)
      res.send(result)

  })
  app.get('/users/admin/:email',async (req,res)=>{
    const email =req.params.email;
    const qurey={email}
    const user= await usersCollction.findOne(qurey)
    res.send({issadmin :user?.role === 'admin'})
})
  app.get('/users/user/:email',async (req,res)=>{
    const email =req.params.email;
    const qurey={email}
    const user= await usersCollction.findOne(qurey)
    res.send({isUser :user?.role === 'User'})
})
  app.get('/users/seller/:email',async (req,res)=>{
    const email =req.params.email;
    const qurey={email}
    const user= await usersCollction.findOne(qurey)
    res.send({isSellers :user?.role === 'Sellers'})
})

    app.get('/users',async(req,res)=>{
      const query={}
      const result =await usersCollction.find(query).toArray()
      res.send(result)
    })

     app.get('/jwt',async(req,res)=>{
            const email =req.query.email;
            const query ={email:email}
            const user =await usersCollction.findOne(query);
           
            if(user){
                const token =jwt.sign({email},process.env.ACCESS_TOKEN,{expiresIn: '3d'} )
                return res.send({accesToken :token})
            }
            console.log(user)
            res.status(403).send({accesToken: ''})
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