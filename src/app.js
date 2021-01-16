const express = require('express')

const app = express();
const port = 7000;

const Recipescotroller = require('./controllers/index');

app.use(express.json());

app.use('/recipes',Recipescotroller);


app.listen(port,()=>{

    console.log("It´s Ok")
    
})