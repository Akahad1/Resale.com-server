const express = require('express');
const cors = require('cors');
const app = express()

app.use(cors())
app.use(express.json())
require('dotenv').config()

// jnQsvQ5T8Z13wOcM
// Resale


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_Name}:${process.env.USER_PASS}@cluster0.xuxoczf.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const catagoryCollction = client.db('Resale').collection('catagory')


async function run() {
  try {
    app.get('/catagory', async (req, res) => {
      const qurey = {}
      const result = await catagoryCollction.find(qurey).toArray()
      res.send(result)

    })
    app.get('/catagory/:id',async(req,res)=>{
      const id =req.params.id;
      const qurey={_id :ObjectId(id)}
      const result =await catagoryCollction.findOne(qurey)
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