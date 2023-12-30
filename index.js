import express from "express";
import { PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());

// till here nothing on localhost:5555 so build routes
// 404 means we don't have requested url, default route is /

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
// app.use(cors());
// Option 2: Allow Custom Origins
app.use(
  cors({
    origin: ['https://book-shop-mern.netlify.app','http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

//first http route, CALLback function handle this request
app.get('https://book-store-me.onrender.com',(request, response) =>{
    console.log(request);
    return response.status(234).send('Welcome To BOOKSTORE');
});

// Middleware for prasing request body
app.use('https://book-store-me.onrender.com/books',booksRoute);
  
// connect backend -> we shift get request to then condition 
// so only when database is connected then only we run server
mongoose 
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
