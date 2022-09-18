
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

var config = require('./config');

//This is the main index file for the backend which ties together the Routes and all 
//server actions and connections required to talk to the Mongo database.


//express instance
const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

//use the routes provided
app.use('/posts', postRoutes);
app.use("/user", userRouter);

app.get('/', (req,res) => {
  res.send('APP IS RUNNING');
});


//access port
const PORT = process.env.PORT|| 5000;
//connection URL to instances of the MongoDB atlas database
const CONNECTION_URL = config.CONNECTION_URL;


//connect to mongo using mongoose
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
