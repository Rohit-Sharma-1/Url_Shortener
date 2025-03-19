import express from 'express';
import mongoose from 'mongoose';
import { shortUrl, redirectUrl } from './controllers/controllerurl.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.urlencoded({extended: true}));

  mongoose.connect(process.env.MONGO_URI,{
    dbName:"nodeJs1"})
    .then(()=>{console.log("Connected to Mongo database")})
    .catch((err)=>{console.log(err)});

  // rendering a ejs file
  app.get('/', (req,res) => {  
      res.render("index.ejs",{shortUrl:null});
  })

  // shortening the url
  app.post('/short',shortUrl)

  // redirecting to the original url using short code:- dynamic routing
  app.get('/:shortCode',redirectUrl)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
