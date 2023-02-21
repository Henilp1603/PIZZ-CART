import express from 'express';
import mongoose from 'mongoose';
import { PORT,DB_URL } from './config';
import errorHandler from './middlewares/errorHandler';
import routes from './routes';
import path from 'path';


const app=express();

mongoose.connect(DB_URL,{useNewUrlParser:true, useUnifiedTopology:true});
const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('DB connected..');
});


global.appRoot = path.resolve(__dirname);


app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/uploads',express.static('uploads'));
app.use('/api',routes)


app.use(errorHandler);
const port=process.env.PORT || PORT
app.listen(port,()=>{
    console.log(`server listening on ${port}`)
});