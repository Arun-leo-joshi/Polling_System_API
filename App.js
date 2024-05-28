// importing necessary packages
import bodyParser from 'body-parser';
import express from 'express';

import { ConnectingToMongoose } from './src/Config/mongooseConfig.js';
import optionrouter from './src/routes/optionRoutes.js';
import questionrouter from './src/routes/questionsRoutes.js';


const port=8000;
const App=express();

//for parsing the data
App.use(bodyParser.json());

//  Handling Routes
App.use("/questions", questionrouter);
App.use("/options", optionrouter);

App.get("/", (req,res)=>{
    res.send("Welcome to Polling System");
})

App.listen(port, ()=>{
    console.log(`Server is listening on ${port}`);
    ConnectingToMongoose;
});